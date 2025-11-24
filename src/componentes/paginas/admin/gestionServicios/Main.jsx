import Formulario from "./Formulario";
import Listado from "./Listado";
import Paginacion from "../../../comun/paginacion";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Main() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [servicios, setServicios] = useState([]);
  const [servicioEdit, setServicioEdit] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const token = sessionStorage.getItem("token");

  // GET con paginacion
  const obtenerServicios = (pagina=1) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `http://localhost:5000/api/servicios?pagina=${pagina}`;

    axios.get(url, config)
      .then((resp) => {
        console.log("Respuesta GET:", resp.data);
        setServicios(resp.data.data);
        setPaginaActual(resp.data.paginaActual);
        setTotalPaginas(resp.data.totalPaginas);
      })
      .catch((error) => {
        console.error(error);
        alert("Error al obtener servicios", "error");
      });
  };
  useEffect(() => {
      obtenerServicios(1);
    }, [])
  
    const cambiarPagina = (nuevaPagina) => {
      if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
      obtenerServicios(nuevaPagina)
    }
  // PUT (solo estado)
  const cambiarEstado = (id_servicio, estadoActual) => {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const url = `http://localhost:5000/api/servicios/modificarestado/${id_servicio}`;
    const nuevoEstado = estadoActual === 1 ? 0 : 1;
    axios.put(url, { estado: nuevoEstado }, config)
      .then(() => {
        alert("Estado actualizado correctamente", "exito");
        obtenerServicios()
      })
      .catch((error) => {
        console.error(error)
        alert("Error al cambiar el estado", "error");
      });
  };

  // PUT servicio completo
  const actualizarServicio = (id, datos) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const url = `http://localhost:5000/api/servicios/modificarservicio/${id}`;
    axios.put(url, datos, config)
      .then(() => {
        alert("Servicio actualizado ✔️", "exito");
        obtenerServicios();
        setServicioEdit(null);
        setMostrarForm(false);
      })
      .catch((error) => {
        alert("Error al actualizar servicio", "error");
        console.error(error)
      });
  };

  // POST (crear servicio nuevo)
  const guardarServicio = (servicio) => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const url = "http://localhost:5000/api/servicios/crearservicio";
    // si hay servicioEdit → EDITA
    if (servicioEdit) {
      actualizarServicio(servicioEdit.id_servicio, servicio);
      return;
    }
    axios.post(url, servicio, config)
      .then(() => {
        alert("Servicio creado correctamente", "exito");
        obtenerServicios()
        setMostrarForm(false);
      })
      .catch((error) => {
        alert("Error al crear servicio", "error");
        console.error(error)
      });
  };

  return (
    <div>
      <h2>Gestionar Servicios</h2>
      {/* Botón Crear Cliente */}
            <button className="btn-violeta" onClick={() => {
              setServicioEdit(null);
              setMostrarForm(true);
            }}
            >Crear Servicio</button>
      <Listado
        servicios={servicios}
        onEditar={(servicio) => {
          setServicioEdit(servicio)
          setMostrarForm(true);
        }} 
        onCambiarEstado={cambiarEstado}
      />
      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cambiarPagina={cambiarPagina}
      />
      {mostrarForm && (
        <Formulario
        servicioEdit={servicioEdit}
        cerrar={() => setMostrarForm(false)}
        onGuardar={guardarServicio}
        />
      )}
    </div>
  );
}
