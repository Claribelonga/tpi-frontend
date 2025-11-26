import Formulario from "./Formulario";
import Listado from "./Listado";
import Buscador from "../../../comun/Buscador";
import Paginacion from "../../../comun/paginacion";
import Mensaje from "../../../comun/Mensaje";
import useMensaje from "../../../../hooks/useMensaje";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Main(){
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [veterinarios, setVeterinarios] = useState([]);
    const [vetEdit, setVetEdit] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const {
          textoMensaje,
          tipoMensaje,
          visible,
          mostrarMensaje
        } = useMensaje();
    const token = sessionStorage.getItem("token");

    //GET especialidades para el select
    const obtenerEspecialidades = () => {
      const config = { headers: { Authorization: token } };
      return axios
        .get("http://localhost:5000/api/especialidades/select", config)
        .then((resp) => {
          // console.log(resp.data)
          setEspecialidades(resp.data)
          return resp.data; //devuelve la lista para usarla luego
        })
        .catch((error) => console.error(error));
    };
    //GET de veterinarios con busqueda y paginacion
    const obtenerVeterinarios = (busqueda = "", pagina = 1, esp = especialidades) => {
    const config = {
      headers: { Authorization: token },
    };
    const url = `http://localhost:5000/api/veterinarios?busqueda=${busqueda}&pagina=${pagina}`;

    axios
      .get(url, config)
      .then((resp) => {
        // Mapear veterinarios para aplanar la info
        const vets = resp.data.veterinarios.map((v) => ({
          ...v,
          matricula: v.veterinario.matricula,
          id_especialidad: v.veterinario.id_especialidad,
          especialidad: esp.find((e => e.id_especialidad === v.veterinario.id_especialidad)) || null,
        }));
        // console.log(resp.data.veterinarios)
        setVeterinarios(vets);
        setPaginaActual(resp.data.paginaActual);
        setTotalPaginas(resp.data.totalPaginas);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    obtenerEspecialidades().then((esp) => {
    obtenerVeterinarios("", paginaActual, esp);
    });
  }, []);
  

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    obtenerVeterinarios("", nuevaPagina);
  };

  //POST y PUT veterinario
  const guardarVeterinario = (datos) => {
    const config = { headers: { Authorization: token } };

    if (vetEdit) {
      // Editar veterinario
      const url = `http://localhost:5000/api/veterinarios/editarvete/${vetEdit.usuario.id_usuario}`;
      axios
        .put(url, datos, config)
        .then((resp) => {
          obtenerVeterinarios("", paginaActual);
          mostrarMensaje("✅ Veterinario actualizado con éxito", "exito");
          setMostrarForm(false);
          setVetEdit(null);
        })
        .catch((error) => {
          console.error(error);
          mostrarMensaje("❌ Error al actualizar veterinario", "error");
        });
    } else {
      // Crear veterinario
      const url = "http://localhost:5000/api/veterinarios/crearveterinario";
      axios
        .post(url, datos, config)
        .then((resp) => {
          obtenerVeterinarios("", paginaActual);
          mostrarMensaje("✅ Veterinario registrado con éxito", "exito");
          setMostrarForm(false);
        })
        .catch((error) => {
          console.error(error);
          mostrarMensaje("❌ Error al registrar veterinario", "error");
        });
    }
  };

  const restablecerContrasena = (id_usuario) => {
  const config = { headers: { Authorization: token } };
  const url = `http://localhost:5000/api/clientes/restablecer/${id_usuario}`;
  
  axios.put(url, {}, config)
    .then(resp => {
      mostrarMensaje("✅ Contraseña restablecida correctamente (DNI asignado)", "exito");
      // console.log("Respuesta del backend:", resp.data);
    })
    .catch(err => {
      mostrarMensaje("❌ Error al restablecer contraseña", "error");
      console.error(err);
    });
};
    return(
      <div>
          <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
            <h2>Gestionar Veterinarios</h2>
            <Buscador
            onBuscar={obtenerVeterinarios}
            titulo={"Buscar veterinario"}
            placeholder={"Ingrese Nombre y/o Apellido"}
            />
            {/* Botón Crear Cliente */}
            <button className="btn-violeta" onClick={() => {
              setVetEdit(null);
              setMostrarForm(true);
            }}
            >Crear Veterinario</button>
            <Listado
            veterinarios={veterinarios}
            onEditar={(vet) => {
              setVetEdit(vet)
              setMostrarForm(true);
            }}
            />
            <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            cambiarPagina={cambiarPagina}
            />
            {mostrarForm && (
              <Formulario
              vetEdit={vetEdit}
              cerrar={() => setMostrarForm(false)}
              guardarVeterinario={guardarVeterinario}
              especialidades={especialidades}
              restablecerContrasena={restablecerContrasena}
              />
            )}
      </div>
    )
}