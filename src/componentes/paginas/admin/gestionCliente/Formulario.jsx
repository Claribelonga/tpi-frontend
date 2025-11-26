import { useState,useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";

export default function Formulario({ guardarCliente, clienteEdit, restablecerContrasena, cerrar }) {
  const { datos, errores: erroresForm, setDato, validarTodo, limpiarInputs } = useUsuario();

  useEffect(() => {
    if (clienteEdit) {
      setDato("nombre", clienteEdit.nombre);
      setDato("apellido", clienteEdit.apellido);
      //setDato("contraseña", "");
      setDato("email", clienteEdit.usuario.email);
      setDato("dni", clienteEdit.dni);
      setDato("telefono", clienteEdit.telefono);
      setDato("calle", clienteEdit.direccion.calle);
      setDato("numero", clienteEdit.direccion.numero);
      setDato("piso", clienteEdit.direccion.piso);
      setDato("departamento", clienteEdit.direccion.departamento);
    } else {
      limpiarInputs();
    }
  }, [clienteEdit]);

  const guardar = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      console.log("Hay errores en el formulario");
      alert("Hay errores en el formulario");
      return;
    }
    console.log("Datos del usuario: ", datos);
    guardarCliente(datos);
    limpiarInputs();
    cerrar();
  };

  // Función interna para el botón de restablecer contraseña
  const handleRestablecer = () => {
    if (!clienteEdit) return;
    if (window.confirm("¿Seguro que querés restablecer la contraseña de este cliente?")) {
      restablecerContrasena(clienteEdit.usuario.id_usuario);
    }
  };

  return (
    <>
        <div className="modal-overlay">
          <div className="modalContent">
            <form className="formulario-mascota-modal" onSubmit={guardar}>
              <div className="modalArriba">
                <span>{clienteEdit ? "Editar Cliente" : "Crear Cliente"}</span>
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
                <label>Contraseña Inicial: DNI</label>
              </div>

              {/* Contactos */}
              <div className="inputContainer">
                <label>Email:</label>
                <input className="inputGen" type="email" value={datos.email} onChange={(e) => setDato("email", e.target.value)} required />
                {erroresForm.email && <span className="error">{erroresForm.email}</span>}
              </div>
              {/* <div className="inputContainer">
                <label>Contraseña (dejar vacío para mantener la actual)</label>
                <input
                  className="inputGen"
                  type="password"
                  value={datos.contraseña}
                  onChange={(e) => setDato("contraseña", e.target.value)}
                  required={!clienteEdit} // obligatorio solo si es crear
                />
                {erroresForm.contraseña && <span className="error">{erroresForm.contraseña}</span>}
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
                  {clienteEdit ? "Guardar Cambios" : "Registrar"}
                </button>

                {clienteEdit && (
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