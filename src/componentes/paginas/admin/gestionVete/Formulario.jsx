import { useState, useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";

export default function Formulario({guardarVeterinario, vetEdit, especialidades}){
    const {datos, errores, setDato, validarTodo, limpiarInputs} = useUsuario();
    // Cargar datos si estamos editando
  useEffect(() => {
    if (vetEdit) {
      setDato("nombre", vetEdit.nombre);
      setDato("apellido", vetEdit.apellido);
      setDato("contraseña", ""); // no se edita visible
      setDato("email", vetEdit.usuario.email);
      setDato("telefono", vetEdit.telefono);
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
  };
    return(
        <div className="cont-form">
      <h2>Gestionar Veterinarios</h2>
      <form className="formulario" onSubmit={guardar}>
        <div className="form-section">
          <span>Datos Personales</span>
          <div className="inputs-grid">
            <div>
              <input
                className="inputGen"
                type="text"
                placeholder="Nombre"
                value={datos.nombre}
                onChange={(e) => setDato("nombre", e.target.value)}
                required
              />
              {errores.nombre && <p className="error">{errores.nombre}</p>}
            </div>
            <div>
              <input
                className="inputGen"
                type="text"
                placeholder="Apellido"
                value={datos.apellido}
                onChange={(e) => setDato("apellido", e.target.value)}
                required
              />
              {errores.apellido && <p className="error">{errores.apellido}</p>}
            </div>
            <div>
              <input
                className="inputGen"
                type="text"
                placeholder="dni"
                value={datos.dni}
                onChange={(e) => setDato("dni", e.target.value)}
                required
              />
              {errores.dni && <p className="error">{errores.dni}</p>}
            </div>
            <div>
              <input
                className="inputGen"
                type="email"
                placeholder="Email"
                value={datos.email}
                onChange={(e) => setDato("email", e.target.value)}
                required
              />
              {errores.email && <p className="error">{errores.email}</p>}
            </div>
            <div>
              <input
                className="inputGen"
                type="password"
                placeholder="Contraseña"
                value={datos.contraseña}
                onChange={(e) => setDato("contraseña", e.target.value)}
                required={!vetEdit}
              />
              {errores.contraseña && <p className="error">{errores.contraseña}</p>}
            </div>
            <div>
              <input
                className="inputGen"
                type="text"
                placeholder="Teléfono"
                value={datos.telefono}
                onChange={(e) => setDato("telefono", e.target.value)}
                required
              />
              {errores.telefono && <p className="error">{errores.telefono}</p>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <span>Datos Profesionales</span>
          <div className="inputs-grid">
            <div>
              <input
                className="inputGen"
                type="text"
                placeholder="Matrícula"
                value={datos.matricula}
                onChange={(e) => setDato("matricula", e.target.value)}
                required
              />
              {errores.matricula && <p className="error">{errores.matricula}</p>}
            </div>
            <div>
              <select
                className="inputGen"
                value={datos.id_especialidad}
                onChange={(e) => setDato("id_especialidad", e.target.value)}
                required
              >
                <option value="">-- Seleccionar Especialidad --</option>
                {especialidades.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </select>
              {errores.id_especialidad && <p className="error">{errores.id_especialidad}</p>}
            </div>
          </div>
        </div>
        <div className="form-section">
            <span className="">Direccion</span>
            <div className="inputs-grid">
                <div>
                    <input className="inputGen" type="text" placeholder="calle" value={datos.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                    {errores.calle && <p className="error">{errores.calle}</p>}
                </div>
                <div>
                    <input className="inputGen" type="text" placeholder="numero" value={datos.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                    {errores.numero && <p className="error">{errores.numero}</p>}
                </div>
                <div>
                    <input className="inputGen" type="text" placeholder="piso" value={datos.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                    {errores.piso && <p className="error">{errores.piso}</p>}
                </div>
                <div>
                    <input className="inputGen" type="text" placeholder="departamento" value={datos.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                    {errores.departamento && <p className="error">{errores.departamento}</p>}
                </div>
            </div>
        </div>

        <div className="form-section form-button">
          <button className="btn-violeta" type="submit">
            {vetEdit ? "Guardar Cambios" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
    )
}