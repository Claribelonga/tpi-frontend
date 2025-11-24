import React from "react";

export default function Formulario({ perfil, datos, errores, setDato, showModal, setShowModal, actualizarPerfil }) {

  if (!perfil) return <p>Cargando perfil...</p>;

  return (
    <div className="PaginaRegistro">
      <div className="ContenedorImagenH2">
        <h2 className="MiPerfilH2">Mi perfil</h2>
        <div className="ContenedorImagenPerfil">
          <img src="img/perfil.png" alt="usuario" className="perfil" />
        </div>
      </div>

      <div className="ContenedorForm">
        <div className="FormContenedorPerfil">
          <h3 className="MiPerfilH3">Datos personales</h3>

          <label>
            Nombre
            <input className="inputMitadPerfil" type="text" value={perfil.nombre || ""} readOnly />
          </label>
          <label>
            Apellido
            <input className="inputMitadPerfil" type="text" value={perfil.apellido || ""} readOnly />
          </label>
          <label>
            Email
            <input className="inputGenPerfil" type="text" value={perfil.email || ""} readOnly />
          </label>
          <label>
            DNI
            <input className="inputGenPerfil" type="text" value={perfil.dni || ""} readOnly />
          </label>
          <label>
            Teléfono
            <input className="inputGenPerfil" type="text" value={perfil.telefono || ""} readOnly />
          </label>
          <div className="filaInputs">
            <label>
              Calle
              <input className="inputGenPerfil" type="text" value={perfil.calle || ""} readOnly />
            </label>
            <label>
              Número
              <input className="inputGenPerfil" type="text" value={perfil.numero || ""} readOnly />
            </label>
          </div>
          <div className="filaInputs">
            <label>
              Piso
              <input className="inputGenPerfil" type="text" value={perfil.piso || "-"} readOnly />
            </label>
            <label>
              Departamento
              <input className="inputGenPerfil" type="text" value={perfil.departamento || "-"} readOnly />
            </label>
          </div>

          <h3 className="MiPerfilH3">Datos profesionales</h3>
          <label>
            Matrícula
            <input className="inputGenPerfil" type="text" value={perfil.matricula || ""} readOnly />
          </label>
          <label>
            Especialidad
            <input className="inputGenPerfil" type="text" value={perfil.nombre_especialidad || ""} readOnly />
          </label>

          <button className="btnEditarPerfil" onClick={() => setShowModal(true)}>Editar perfil</button>
        </div>
      </div>

      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalArriba">
              <button className="btnCloseModal" onClick={() => setShowModal(false)}>
                <img src="/img/equis.png" className="icono" />
              </button>
              <h3>Editar datos personales</h3>
            </div>

            {Object.keys(datos).map(campo => {
              if (campo === "matricula" || campo === "id_especialidad") return null;

              return (
                <label key={campo}>
                  {campo.charAt(0).toUpperCase() + campo.slice(1)}
                  <input
                    type="text"
                    value={datos[campo]}
                    onChange={e => setDato(campo, e.target.value)}
                    className={`inputGenPerfil ${errores[campo] ? "inputError" : ""}`}
                  />
                </label>
              );
            })}

            <div className="modalActions">
              <button className="btnGuardarPerfil" onClick={actualizarPerfil}>Actualizar datos</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// import { useState } from "react";
// import axios from "axios";
// import { Link } from "wouter";

// export default function Formulario({ perfil, setPerfil }) {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     nombre: perfil?.nombre || "",
//     apellido: perfil?.apellido || "",
//     email: perfil?.email || "",
//     dni: perfil?.dni || "",
//     telefono: perfil?.telefono || "",
//     calle: perfil?.calle || "",
//     numero: perfil?.numero || "",
//     piso: perfil?.piso || "",
//     departamento: perfil?.departamento || "",
//   });

//   const token = sessionStorage.getItem("token");

//   if (!perfil) {
//     return <p>Cargando perfil...</p>;
//   }

//   const {
//     nombre,
//     apellido,
//     email,
//     dni,
//     telefono,
//     calle,
//     numero,
//     piso,
//     departamento,
//     matricula,
//     nombre_especialidad,
//   } = perfil;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     // Validar que no haya campos vacíos
//     const camposVacios = Object.entries(formData).filter(
//       ([_, valor]) => String(valor || "").trim() === ""
//     );
//     if (camposVacios.length > 0) {
//       alert("Por favor completa todos los campos antes de guardar.");
//       return;
//     }

//     try {
//       const config = { headers: { Authorization: token } };
//       await axios.put("http://localhost:5000/api/veterinarios/perfil", formData, config);
//       const resp = await axios.get("http://localhost:5000/api/veterinarios/perfil", config);
//       setPerfil(resp.data.perfil || resp.data);
//       alert("Perfil actualizado correctamente");
//       setShowModal(false);
//     } catch (err) {
//       console.error("Error al actualizar perfil:", err);
//       alert("Ocurrió un error al actualizar el perfil");
//     }
//   };

//   return (
//     <div className="PaginaRegistro">
//       {/* Contenedor de la imagen y título */}
//       <div className="ContenedorImagenH2">
//         <h2 className="MiPerfilH2">Mi perfil</h2>
//         <div className="ContenedorImagenPerfil">
//           <img src="img/perfil.png" alt="usuario" className="perfil" />
//         </div>
//       </div>

//       <div className="ContenedorForm">
//         <div className="FormContenedorPerfil">
//           <h3 className="MiPerfilH3">Datos personales</h3>

//           <label>
//             Nombre
//             <input className="inputMitadPerfil" type="text" value={nombre || ""} readOnly />
//           </label>
//           <label>
//             Apellido
//             <input className="inputMitadPerfil" type="text" value={apellido || ""} readOnly />
//           </label>
//           <label>
//             Email
//             <input className="inputGenPerfil" type="text" value={email || ""} readOnly />
//           </label>
//           <label>
//             DNI
//             <input className="inputGenPerfil" type="text" value={dni || ""} readOnly />
//           </label>
//           <label>
//             Teléfono
//             <input className="inputGenPerfil" type="text" value={telefono || ""} readOnly />
//           </label>
//           <div className="filaInputs">
//             <label>
//               Calle
//               <input className="inputGenPerfil" type="text" value={calle || ""} readOnly />
//             </label>
//             <label>
//               Número
//               <input className="inputGenPerfil" type="text" value={numero || ""} readOnly />
//             </label>
//           </div>
//           <div className="filaInputs">
//             <label>
//               Piso
//               <input className="inputGenPerfil" type="text" value={piso || "-"} readOnly />
//             </label>
//             <label>
//               Departamento
//               <input className="inputGenPerfil" type="text" value={departamento || "-"} readOnly />
//             </label>
//           </div>

//           <h3 className="MiPerfilH3">Datos profesionales</h3>
//           <label>
//             Matrícula
//             <input className="inputGenPerfil" type="text" value={matricula || ""} readOnly />
//           </label>
//           <label>
//             Especialidad
//             <input className="inputGenPerfil" type="text" value={nombre_especialidad || ""} readOnly />
//           </label>

//           {/* Botón de editar */}
//           <button className="btnEditarPerfil" onClick={() => setShowModal(true)}>
//             Editar perfil
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modalOverlay">
//           <div className="modalContent">
//             <div className="modalArriba">
//               <button className="btnCloseModal" onClick={() => setShowModal(false)}><img src="/img/equis.png" className="icono" /></button>
//               <h3>Editar datos personales</h3>
//             </div>
//             <label>
//               Nombre
//               <input
//                 name="nombre"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.nombre ? "inputError" : ""}`}
//                 value={formData.nombre}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Apellido
//               <input
//                 name="apellido"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.apellido ? "inputError" : ""}`}
//                 value={formData.apellido}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Email
//               <input
//                 name="email"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.email ? "inputError" : ""}`}
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Contraseña
//               <input
//                 name="contraseña"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.contraseña ? "inputError" : ""}`}
//                 value={formData.contraseña}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               DNI
//               <input
//                 name="dni"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.dni ? "inputError" : ""}`}
//                 value={formData.dni}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Teléfono
//               <input
//                 name="telefono"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.telefono ? "inputError" : ""}`}
//                 value={formData.telefono}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Calle
//               <input
//                 name="calle"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.calle ? "inputError" : ""}`}
//                 value={formData.calle}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Número
//               <input
//                 name="numero"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.numero ? "inputError" : ""}`}
//                 value={formData.numero}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Piso
//               <input
//                 name="piso"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.piso ? "inputError" : ""}`}
//                 value={formData.piso}
//                 onChange={handleChange}
//               />
//             </label>
//             <label>
//               Departamento
//               <input
//                 name="departamento"
//                 type="text"
//                 className={`inputGenPerfil ${!formData.departamento ? "inputError" : ""}`}
//                 value={formData.departamento}
//                 onChange={handleChange}
//               />
//             </label>

//             <div className="modalActions">
//               <button onClick={handleSave} className="btnGuardarPerfil">Actualizar datos</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }