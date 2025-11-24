import React from "react";

export default function Formulario({ perfil, datos, setDato, showModal, setShowModal, actualizarPerfil, errores }) {

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
                    className="inputGen"
                    
                    // className={`inputGenPerfil ${errores[campo] ? "inputError" : ""}`}
                    />
                    {errores[campo] && <p className="error" style={{ color: "red" }}>{errores[campo]}</p>}
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


// import { Link } from "wouter";

// // Recibe el perfil (datos obtenidos por GET)
// export default function Formulario({ perfil }) { 
    
//     if (!perfil) {
//         return <p>Cargando perfil...</p>;
//     }

//     // Desestructurar para simplificar el JSX
//     const {
//         nombre, apellido, email, dni, telefono,
//         calle, numero, piso, departamento
//     } = perfil;

//     return (
//         <div className="PaginaRegistro">
//             {/* Contenedor de la imagen y título */}
//             <div className="ContenedorImagenH2">
//             <h2 className="MiPerfilH2">Mi perfil</h2>
//             <div className="ContenedorImagenPerfil">
//                 <img src="img/perfil.png" alt="usuario" className="perfil" />
//             </div>
//             </div>
//             <div className="ContenedorForm">
//                 {/* Nota: Usar <div> en lugar de <form> es mejor si no hay submit */}
//                 <div className="FormContenedorPerfil">
                    
//                     <h3 className="MiPerfilH3">Datos personales</h3>
                    
//                     {/* Nombre y Apellido: Usamos filaInputs para los inputMitad */}
//                     <div className="filaInputs">
//                         <input className="inputMitadPerfil" type="text" value={nombre || ''} readOnly />
//                         <input className="inputMitadPerfil" type="text" value={apellido || ''} readOnly />
//                     </div>
                    
//                     <input className="inputGenPerfil" type="text" value={email || ''} readOnly />
//                     <input className="inputGenPerfil" type="text" value={dni || ''} readOnly />
//                     <input className="inputGenPerfil" type="text" value={telefono || ''} readOnly />
                    
                    
//                     {/* Dirección: Agrupamos en filaInputs, aunque sean inputGen, para mantener la consistencia */}
//                     <div className="filaInputs">
//                         {/* Calle y Número combinados */}
//                         <input className="inputGenPerfil" type="text" value={`${calle || ''} ${numero || ''}`} readOnly />
//                           <input className="inputGenPerfil" type="text" value={piso || '-'} readOnly />
//                           <input className="inputGenPerfil" type="text" value={departamento || '-'} readOnly />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }