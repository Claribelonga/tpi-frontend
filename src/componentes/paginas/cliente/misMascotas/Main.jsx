
// import { useState, useEffect } from "react";
// import Listado from "./Listado";
// import Formulario from "./Formulario";
// import axios from "axios";

// export default function MisMascotas() {
//   const [mascotas, setMascotas] = useState([]);
//   const [mostrarForm, setMostrarForm] = useState(false);
//   const [mascotaEdit, setMascotaEdit] = useState(null);
//   const [cargando, setCargando] = useState(false); // Para control de carga/UX
//   const token = sessionStorage.getItem("token");
//   const [especies, setEspecies] = useState([])
//   const [razas, setRazas] = ([])

//   const urlEspecies = "http://localhost:5000/api/especies/";
//   const urlRazas = "http://localhost:5000/api/especies/razas";
//   // obtener especies
//   const obtenerEspecies = () => {
//     const config = {
//       headers: { Authorization: token }
//     };
//     axios.get(urlEspecies, config)
//       .then(resp => {
//         console.log("Especies:", resp.data);
//         setEspecies(resp.data)
//     })
//       .catch(err => console.log(err));
//   };
//   // obtener raza
//   const obtenerRazas = () => {
//     const config = {
//       headers: { Authorization: token }
//     };
//     axios.get(urlRazas, config)
//       .then(resp => {
//         console.log("Razas:", resp.data);
//         setRazas(resp.data)
//     })
//       .catch(err => console.log(err));
//   };

//   // 1. Función para Traer las Mascotas (GET)
//   const obtenerMascotas = () => {
//     // La autenticación (auth) se encarga de obtener el ID del dueño en el backend.
//     setCargando(true);
//     const url= `http://localhost:5000/api/mascotas/`;
//     const config = {
//       headers: { Authorization: token }
//     };
//     axios.get(url, config) // Ajustar URL si es necesario
//       .then((res) => {
//         console.log(res.data.mascotas)
//         setMascotas(res.data.mascotas || []);
//       })
//       .catch((err) => {
//         console.error("Error al obtener mascotas:", err);
//       })
//       .finally(() => {
//         setCargando(false);
//       });
//   };

//   useEffect(() => {
//     obtenerMascotas();
//     obtenerEspecies();
//     obtenerRazas();
//   }, []);

//   // 2. Función para Guardar/Editar la Mascota (POST/PUT)
//   const guardarMascota = (datos) => {
//     const isEdit = datos.idMascota; // Determinamos si existe el ID de la mascota
//     const headers = { 
//         'Authorization': token
//     };
//     const url = isEdit
//       ? `http://localhost:5000/api/mascotas/editarmascota/${datos.idMascota}`
//       : `http://localhost:5000/api/mascotas/nuevamascota`; // Usando la ruta que definiste
//     const metodo = isEdit ? "put" : "post";

//     setCargando(true);

//     axios({
//       method: metodo,
//       url: url,
//       data: datos,
//       headers: headers
//     })
//       .then((res) => {
//         alert(res.data); // Mostrar mensaje de éxito (ej. Mascota registrada correctamente)
//         obtenerMascotas(); // Recargar la lista completa
//         setMostrarForm(false); // Cerrar el formulario
//       })
//       .catch((err) => {
//         console.error("Error al guardar mascota:", err);
//         alert("Error al guardar mascota: " + (err.response?.data || "Conexión fallida"));
//       })
//       .finally(() => {
//         setCargando(false);
//       });
//   };

//   return (
//     <div>
//       <div className="misMascotas">
//         <div className="titulo-vista">
//         <img src="/img/pata.png" className="icono" alt="Pata de perro" />
//         <h2>Mis Mascotas</h2>
//         </div>
//         <button
//         className="btn-violeta"
//           onClick={() => {
//             setMascotaEdit(null);
//             setMostrarForm(true);
//           }}
//           disabled={cargando}
//         >
//           <span><img src="/img/boton-agregar.png" alt="mas" className="icono"/></span> Agregar Mascota
//         </button>
//       </div>

//       {cargando && <p>Cargando listado...</p>}
      
//       <Listado
//         mascotas={mascotas}
//         onEditar={(mascota) => {
//           setMascotaEdit(mascota);
//           setMostrarForm(true);
//         }}
//       />

//       {mostrarForm && (
//         <Formulario
//           mascota={mascotaEdit}
//           especies={especies}
//           razas={razas}
//           cerrar={() => setMostrarForm(false)}
//           onGuardar={guardarMascota} // Pasamos la función Axios del Main al Formulario
//         />
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Listado from "./Listado";
import Formulario from "./Formulario";
import axios from "axios";

export default function Main() {

  const token = sessionStorage.getItem("token");

  // Estados
  const [mascotas, setMascotas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mascotaEdit, setMascotaEdit] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [especies, setEspecies] = useState([]);
  const [razas, setRazas] = useState([]);

  // URLs en constantes
  const URL_ESPECIES = "http://localhost:5000/api/especies/";
  const URL_RAZAS = "http://localhost:5000/api/especies/razas";
  const URL_MASCOTAS = "http://localhost:5000/api/mascotas/";

  // CONFIG general (solo headers)
  const config = {
    headers: { Authorization: token }
  };

  // ===============================
  // Obtener especies
  // ===============================
  const obtenerEspecies = () => {
    axios.get(URL_ESPECIES, config)
      .then(res => {
        console.log("✔ ESPECIES", res.data);
        setEspecies(res.data);
      })
      .catch(err => console.log("❌ Error especies:", err));
  };

  // ===============================
  // Obtener razas según especie
  // ===============================
  const obtenerRazas = (idEspecie) => {
    axios.get(`${URL_RAZAS}?id_especie=${idEspecie}`, config)
      .then(res => {
        console.log("✔ RAZAS", res.data);
        setRazas(res.data);
      })
      .catch(err => console.log("❌ Error razas:", err));
  };

  // ===============================
  // Obtener mascotas del usuario
  // ===============================
  const obtenerMascotas = () => {
    setCargando(true);

    axios.get(URL_MASCOTAS, config)
      .then(res => {
        console.log("✔ MASCOTAS", res.data.mascotas);
        setMascotas(res.data.mascotas || []);
      })
      .catch(err => console.log("❌ Error mascotas:", err))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    obtenerMascotas();
    obtenerEspecies();
  }, []);

  // ===============================
  // Guardar o editar mascota
  // ===============================
  const guardarMascota = (datos) => {
    console.log("📤 Enviando datos:", datos);

    const isEdit = !!datos.idMascota;

    const url = isEdit
      ? `${URL_MASCOTAS}editarmascota/${datos.idMascota}`
      : `${URL_MASCOTAS}nuevamascota`;

    const metodo = isEdit ? "put" : "post";

    setCargando(true);

    axios({ method: metodo, url, data: datos, headers: config.headers })
      .then(res => {
        alert(res.data);
        obtenerMascotas();
        setMostrarForm(false);
      })
      .catch(err => {
        console.log("❌ Error guardar:", err);
        alert("Error al guardar: " + (err.response?.data || "Error desconocido"));
      })
      .finally(() => setCargando(false));
  };

  return (
    <div>
      <div className="misMascotas">
        <div className="titulo-vista">
          <img src="/img/pata.png" className="icono" alt="" />
          <h2>Mis Mascotas</h2>
        </div>

        <button
          className="btn-violeta"
          disabled={cargando}
          onClick={() => {
            setMascotaEdit(null);
            setMostrarForm(true);
          }}
        >
          <img src="/img/boton-agregar.png" className="icono" alt="" /> Agregar Mascota
        </button>
      </div>

      {cargando && <p>Cargando...</p>}

      <Listado mascotas={mascotas} onEditar={(m) => {
        setMascotaEdit(m);
        setMostrarForm(true);
      }} />

      {mostrarForm && (
        <Formulario
          mascota={mascotaEdit}
          especies={especies}
          razas={razas}
          obtenerRazas={obtenerRazas}
          cerrar={() => setMostrarForm(false)}
          onGuardar={guardarMascota}
        />
      )}
    </div>
  );
}
