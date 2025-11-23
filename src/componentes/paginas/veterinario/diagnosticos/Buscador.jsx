// import { useState } from "react";
// import axios from "axios";

// export default function Buscador() {
//   const [dni, setDni] = useState("");
//   const [mascotas, setMascotas] = useState([]);
//   const [selectedMascota, setSelectedMascota] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = sessionStorage.getItem("token");

//   const buscarMascotas = async () => {
//     if (!dni) {
//       alert("Ingresa un DNI");
//       return;
//     }

//     setLoading(true);
//     try {
//       const config = { headers: { Authorization: token } };
//       const resp = await axios.get(
//         `http://localhost:5000/api/mascotas/select?dni=${dni}`,
//         config
//       );
//       setMascotas(resp.data.mascotas || []);
//       setSelectedMascota(null); // limpiar selección al buscar
//     } catch (err) {
//       console.error("Error al buscar mascotas:", err);
//       alert("No se pudieron obtener las mascotas");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="buscadorMascotas">
//       {/* 👉 Input y botón en fila */}
//       <div className="buscadorForm">
//         <input
//           type="text"
//           placeholder="Ingrese DNI del dueño"
//           value={dni}
//           onChange={(e) => setDni(e.target.value)}
//           className="inputDni"
//         />
//         <button onClick={buscarMascotas} className="btnBuscar">
//           Buscar
//         </button>
//       </div>

//       {/* 👉 Select de mascotas */}
//       <div className="listaMascotas">
//         {loading && <p>Cargando...</p>}
//         {!loading && mascotas.length === 0 && <p>No se encontraron mascotas</p>}
//         {!loading && mascotas.length > 0 && (
//           <select
//             className="selectMascotas"
//             value={selectedMascota || ""}
//             onChange={(e) => setSelectedMascota(e.target.value)}
//           >
//             <option value="">Seleccione una mascota</option>
//             {mascotas.map((m) => (
//               <option key={m.id_mascota} value={m.id_mascota}>
//                 {m.nombre}
//               </option>
//             ))}
//           </select>
//         )}
//       </div>
//     </div>
//   );
// }
