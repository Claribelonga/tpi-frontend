import { useState, useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";

export default function Formulario({guardarVeterinario, vetEdit, especialidades, restablecerContrasena, cerrar, errores}){
    const {datos, errores: erroresForm, setDato, validarTodo, limpiarInputs} = useUsuario(["matricula","id_especialidad"]);

    // Cargar datos si estamos editando
  useEffect(() => {
    if (vetEdit) {
      setDato("nombre", vetEdit.nombre);
      setDato("apellido", vetEdit.apellido);
      // setDato("contraseña", "");
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

  console.log("especialidades en formulario:", especialidades);

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
                {erroresForm.nombre && <span className="error">{erroresForm.nombre}</span>}
              </div>
              <div className="inputContainer">
                <label>Apellido:</label>
                <input className="inputGen" value={datos.apellido} onChange={(e) => setDato("apellido", e.target.value)} required />
                {erroresForm.apellido && <span className="error">{erroresForm.apellido}</span>}
              </div>
              <div className="inputContainer">
                <label>DNI:</label>
                <input className="inputGen" value={datos.dni} onChange={(e) => setDato("dni", e.target.value)} required />
                {erroresForm.dni && <span className="error">{erroresForm.dni}</span>}
              </div>
              <div className="inputContainer">
                <label>Matricula:</label>
                <input className="inputGen" value={datos.matricula} onChange={(e) => setDato("matricula", e.target.value)} />
                {erroresForm.matricula && <span className="error">{erroresForm.matricula}</span>}
              </div>
              <div className="inputContainer">
                
              </div>
              {/* especialidades */}
      <div className="inputContainer">
      <label>Especialidades:</label>
      <select className="inputGen" 
        value={datos.especialidad || ""}
        onChange={(e) => setDato("id_especialidad", e.target.value)}
      >
        <option value="">Selecciones una Especialidad</option>
        {especialidades.map(esp => (
          <option key={esp.id_especialidad} value={esp.id_especialidad}>
            {esp.nombre}
          </option>
        ))}
      </select>
      </div>

              {/* Contactos */}
              <div className="inputContainer">
                <label>Email:</label>
                <input className="inputGen" type="email" value={datos.email} onChange={(e) => setDato("email", e.target.value)} required />
                {erroresForm.email && <span className="error">{erroresForm.email}</span>}
              </div>
              {/* <div className="inputContainer">
                <label>Contraseña  (dejar vacío para mantener la actual)</label>
                <input
                  className="inputGen"
                  type="password"
                  value={datos.contraseña}
                  onChange={(e) => setDato("contraseña", e.target.value)}
                  required={!vetEdit} // obligatorio solo si es crear
                />
              </div> */}
              <div className="inputContainer">
                <label>Teléfono:</label>
                <input className="inputGen" value={datos.telefono} onChange={(e) => setDato("telefono", e.target.value)} required />
                {erroresForm.telefono && <span className="error">{erroresForm.telefono}</span>}
              </div>

              {/* Dirección */}
              <div className="inputContainer">
                <label>Calle:</label>
                <input className="inputGen" value={datos.calle} onChange={(e) => setDato("calle", e.target.value)} required />
                {erroresForm.calle && <span className="error">{erroresForm.calle}</span>}
              </div>
              <div className="inputContainer">
                <label>Número:</label>
                <input className="inputGen" value={datos.numero} onChange={(e) => setDato("numero", e.target.value)} required />
                {erroresForm.numero && <span className="error">{erroresForm.numero}</span>}
              </div>
              <div className="inputContainer">
                <label>Piso:</label>
                <input className="inputGen" value={datos.piso} onChange={(e) => setDato("piso", e.target.value)} />
                {erroresForm.piso && <span className="error">{erroresForm.piso}</span>}
              </div>
              <div className="inputContainer">
                <label>Departamento:</label>
                <input className="inputGen" value={datos.departamento} onChange={(e) => setDato("departamento", e.target.value)} />
                {erroresForm.departamento && <span className="error">{erroresForm.departamento}</span>}
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
}