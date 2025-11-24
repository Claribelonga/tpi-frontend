import { useState, useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";

export default function Formulario({guardarVeterinario, vetEdit, especialidades, restablecerContrasena, cerrar}){
    const {datos, errores, setDato, validarTodo, limpiarInputs} = useUsuario(["matricula","id_especialidad"]);

    // Cargar datos si estamos editando
  useEffect(() => {
    if (vetEdit) {
      setDato("nombre", vetEdit.nombre);
      setDato("apellido", vetEdit.apellido);
      setDato("contraseña", ""); // no se edita visible
      setDato("email", vetEdit.usuario.email);
      setDato("dni", vetEdit.dni);
      setDato("telefono", vetEdit.telefono);
      setDato("calle", vetEdit.direccion.calle);
      setDato("numero", vetEdit.direccion.numero);
      setDato("piso", vetEdit.direccion.piso);
      setDato("departamento", vetEdit.direccion.departamento);
      setDato("matricula", vetEdit.matricula);
      setDato("id_especialidad", vetEdit.id_especialidad);
    } else {
      limpiarInputs();
    }
  }, [vetEdit]);
  const guardar = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      alert("Hay errores en el formulario");
      return;
    }
    guardarVeterinario(datos);
    limpiarInputs();
    cerrar();
  };
  // Función interna para el botón de restablecer contraseña
  const handleRestablecer = () => {
    if (!vetEdit) return;
    if (window.confirm("¿Seguro que querés restablecer la contraseña de este cliente?")) {
      restablecerContrasena(vetEdit.usuario.id_usuario);
    }
  };

  return(
    <>
        <div className="modal-overlay">
          <div className="modalContent">
            <form className="formulario-mascota-modal" onSubmit={guardar}>
              <div className="modalArriba">
                <span>{vetEdit ? "Editar Veterinario" : "Crear Veterinario"}</span>
                <button type="button" onClick={cerrar} className="btnCloseModal">
                  <img src="/img/equis.png" className="icono" />
                </button>
              </div>

              {/* Datos Personales */}
              <div className="inputContainer">
                <label>Nombre:</label>
                <input className="inputGen" value={datos.nombre} onChange={(e) => setDato("nombre", e.target.value)} required />
              </div>
              <div className="inputContainer">
                <label>Apellido:</label>
                <input className="inputGen" value={datos.apellido} onChange={(e) => setDato("apellido", e.target.value)} required />
              </div>
              <div className="inputContainer">
                <label>DNI:</label>
                <input className="inputGen" value={datos.dni} onChange={(e) => setDato("dni", e.target.value)} required />
              </div>

              {/* Contactos */}
              <div className="inputContainer">
                <label>Email:</label>
                <input className="inputGen" type="email" value={datos.email} onChange={(e) => setDato("email", e.target.value)} required />
              </div>
              <div className="inputContainer">
                <label>Contraseña:</label>
                <input
                  className="inputGen"
                  type="password"
                  value={datos.contraseña}
                  onChange={(e) => setDato("contraseña", e.target.value)}
                  required={!vetEdit} // obligatorio solo si es crear
                />
              </div>
              <div className="inputContainer">
                <label>Teléfono:</label>
                <input className="inputGen" value={datos.telefono} onChange={(e) => setDato("telefono", e.target.value)} required />
              </div>

              {/* Dirección */}
              <div className="inputContainer">
                <label>Calle:</label>
                <input className="inputGen" value={datos.calle} onChange={(e) => setDato("calle", e.target.value)} required />
              </div>
              <div className="inputContainer">
                <label>Número:</label>
                <input className="inputGen" value={datos.numero} onChange={(e) => setDato("numero", e.target.value)} required />
              </div>
              <div className="inputContainer">
                <label>Piso:</label>
                <input className="inputGen" value={datos.piso} onChange={(e) => setDato("piso", e.target.value)} />
              </div>
              <div className="inputContainer">
                <label>Departamento:</label>
                <input className="inputGen" value={datos.departamento} onChange={(e) => setDato("departamento", e.target.value)} />
              </div>

              {/* Botones */}
              <div className="form-section form-button">
                <button className="btn-violeta" type="submit">
                  {vetEdit ? "Guardar Cambios" : "Registrar"}
                </button>

                {vetEdit && (
                  <button type="button" className="btn-violeta" style={{ marginLeft: "10px" }} onClick={handleRestablecer}>
                    Restablecer contraseña
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
    </>
  )
    //     <div className="cont-form">
    //   <h3> {vetEdit ? "Guardar Cambios" : "Registrar Veterinario"}</h3>
    //   <form className="formulario" onSubmit={guardar}>
    //     <div className="form-section">
    //       <span>Datos Personales</span>
    //       <div className="inputs-grid">
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="text"
    //             placeholder="Nombre"
    //             value={datos.nombre}
    //             onChange={(e) => setDato("nombre", e.target.value)}
    //             required
    //           />
    //           {errores.nombre && <p className="error">{errores.nombre}</p>}
    //         </div>
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="text"
    //             placeholder="Apellido"
    //             value={datos.apellido}
    //             onChange={(e) => setDato("apellido", e.target.value)}
    //             required
    //           />
    //           {errores.apellido && <p className="error">{errores.apellido}</p>}
    //         </div>
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="text"
    //             placeholder="dni"
    //             value={datos.dni}
    //             onChange={(e) => setDato("dni", e.target.value)}
    //             required
    //           />
    //           {errores.dni && <p className="error">{errores.dni}</p>}
    //         </div>
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="email"
    //             placeholder="Email"
    //             value={datos.email}
    //             onChange={(e) => setDato("email", e.target.value)}
    //             required
    //           />
    //           {errores.email && <p className="error">{errores.email}</p>}
    //         </div>
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="password"
    //             placeholder="Contraseña"
    //             value={datos.contraseña}
    //             onChange={(e) => setDato("contraseña", e.target.value)}
    //             required={!vetEdit}
    //           />
    //           {errores.contraseña && <p className="error">{errores.contraseña}</p>}
    //         </div>
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="text"
    //             placeholder="Teléfono"
    //             value={datos.telefono}
    //             onChange={(e) => setDato("telefono", e.target.value)}
    //             required
    //           />
    //           {errores.telefono && <p className="error">{errores.telefono}</p>}
    //         </div>
    //       </div>
    //     </div>

    //     <div className="form-section">
    //       <span>Datos Profesionales</span>
    //       <div className="inputs-grid">
    //         <div>
    //           <input
    //             className="inputGen"
    //             type="text"
    //             placeholder="Matrícula"
    //             value={datos.matricula}
    //             onChange={(e) => setDato("matricula", e.target.value)}
    //             required
    //           />
    //           {errores.matricula && <p className="error">{errores.matricula}</p>}
    //         </div>
    //         <div>
    //           <select
    //             className="inputGen"
    //             value={datos.id_especialidad}
    //             onChange={(e) => setDato("id_especialidad", e.target.value)}
    //             required
    //           >
    //             <option value="">-- Seleccionar Especialidad --</option>
    //             {especialidades.map((e) => (
    //               <option key={e.id} value={e.id}>
    //                 {e.nombre}
    //               </option>
    //             ))}
    //           </select>
    //           {errores.id_especialidad && <p className="error">{errores.id_especialidad}</p>}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="form-section">
    //         <span className="">Direccion</span>
    //         <div className="inputs-grid">
    //             <div>
    //                 <input className="inputGen" type="text" placeholder="calle" value={datos.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
    //                 {errores.calle && <p className="error">{errores.calle}</p>}
    //             </div>
    //             <div>
    //                 <input className="inputGen" type="text" placeholder="numero" value={datos.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
    //                 {errores.numero && <p className="error">{errores.numero}</p>}
    //             </div>
    //             <div>
    //                 <input className="inputGen" type="text" placeholder="piso" value={datos.piso} onChange={(e) => setDato("piso",e.target.value)}/>
    //                 {errores.piso && <p className="error">{errores.piso}</p>}
    //             </div>
    //             <div>
    //                 <input className="inputGen" type="text" placeholder="departamento" value={datos.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
    //                 {errores.departamento && <p className="error">{errores.departamento}</p>}
    //             </div>
    //         </div>
    //     </div>

    //     <div className="form-section form-button">
    //       <button className="btn-violeta" type="submit">
    //         {vetEdit ? "Guardar Cambios" : "Registrar"}
    //       </button>
    //     </div>
    //   </form>
    // </div>
}