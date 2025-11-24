import Formulario from "./Formulario";
import Listado from "./Listado";
import Buscador from "../../../comun/Buscador";
import Paginacion from "../../../comun/paginacion";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Main(){
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [veterinarios, setVeterinarios] = useState([]);
    const [vetEdit, setVetEdit] = useState(null);
    const [especialidades, setEspecialidades] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [mostrarForm, setMostrarForm] = useState(false);
     // Estados para mensajes
      const [textoMensaje, setTextoMensaje] = useState("");
    const token = sessionStorage.getItem("token");
    // Función reutilizable para mostrar mensajes (se autohide)
  const mostrarMensaje = (texto, tipo = "info", duracionMs = 3000) => {
    setTextoMensaje(texto);
    setTipoMensaje(tipo);
    if (duracionMs > 0) {
      setTimeout(() => {
        setTextoMensaje("");
      }, duracionMs);
    }
  };
    //GET especialidades para el select
    const obtenerEspecialidades = () => {
      const config = { headers: { Authorization: token } };
      return axios
        .get("http://localhost:5000/api/especialidades/select", config)
        .then((resp) => {
          console.log(resp.data)
          setEspecialidades(resp.data)
          return resp.data; //devuelve la lista para usarla luego
        })
        .catch((error) => console.error(error));
    };
    //GET de veterinarios con busqueda y paginacion
    const obtenerVeterinarios = (busqueda = "", pagina = 1, esp = []) => {
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
        console.log(resp.data.veterinarios)
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
  
//   useEffect(() => {
//     obtenerEspecialidades().then((esp) => {
//       obtenerVeterinarios("", paginaActual, esp);
//     });
//   }, []);
//   useEffect(() => {
//     obtenerVeterinarios("", paginaActual);
//     obtenerEspecialidades();
//   }, []);
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    obtenerVeterinarios("", nuevaPagina);
  };

  //POST y PUT veterinario
  const guardarVeterinario = (datos) => {
    const config = { headers: { Authorization: token } };

    if (vetEdit) {
      // Editar veterinario
      const url = `http://localhost:5000/api/veterinarios/${vetEdit.usuario.id_usuario}`;
      axios
        .put(url, datos, config)
        .then((resp) => {
          obtenerVeterinarios();
          setMensaje("✅ Veterinario actualizado con éxito");
          setMostrarForm(false);
          setTipoMensaje("exito");
          setVetEdit(null);
          setTimeout(() => setMensaje(""), 4000);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("❌ Error al actualizar veterinario");
          setTipoMensaje("error");
          setTimeout(() => setMensaje(""), 4000);
        });
    } else {
      // Crear veterinario
      const url = "http://localhost:5000/api/veterinarios";
      axios
        .post(url, datos, config)
        .then((resp) => {
          obtenerVeterinarios();
          setMensaje("✅ Veterinario registrado con éxito");
          setTipoMensaje("exito");
          setMostrarForm(false);
          setTimeout(() => setMensaje(""), 4000);
        })
        .catch((error) => {
          console.error(error);
          setMensaje("❌ Error al registrar veterinario");
          setTipoMensaje("error");
          setTimeout(() => setMensaje(""), 4000);
        });
    }
  };

  const restablecerContrasena = (id_usuario) => {
  const config = { headers: { Authorization: token } };
  const url = `http://localhost:5000/api/clientes/restablecer/${id_usuario}`;
  
  axios.put(url, {}, config)
    .then(resp => {
      mostrarMensaje("✅ Contraseña restablecida correctamente (DNI como nueva contraseña)", "exito");
      console.log("Respuesta del backend:", resp.data);
    })
    .catch(err => {
      mostrarMensaje("❌ Error al restablecer contraseña", "error");
      console.error(err);
    });
};
    return(
        <div>
            {mensaje && (
                <div className={`mensaje-bienvenida ${tipoMensaje}`}>{mensaje}</div>
            )}
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
            >Crear Cliente</button>
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
            {/* <Formulario
            guardarVeterinario={guardarVeterinario}
            vetEdit={vetEdit}
            especialidades={especialidades} //lo paso al form para el select
            /> */}
        </div>
    )
}