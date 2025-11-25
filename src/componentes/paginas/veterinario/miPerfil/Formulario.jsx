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
            <form onSubmit={actualizarPerfil}>
            <div className="modalArriba">
              <button type="button" className="btnCloseModal" onClick={() => setShowModal(false)}>
                <img src="/img/equis.png" className="icono" />
              </button>
              <h3>Editar datos personales</h3>
            </div>

            {Object.keys(datos).map(campo => {
              if (campo === "matricula" || campo === "id_especialidad") return null;
              // Campo ESPECIAL para contraseña
              if (campo === "contraseña") {
                return (
                  <label key={campo}>
                    Contraseña (dejar vacío para mantener la actual)
                    <input
                      type="password"
                      className="inputGen"
                      value={datos[campo]}
                      onChange={(e) => setDato(campo, e.target.value)}
                    />
                    {errores[campo] && (
                      <p className="error" style={{ color: "red" }}>
                        {errores[campo]}
                      </p>
                    )}
                  </label>
                );
              }
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
              <button className="btnGuardarPerfil" type="submit">Actualizar datos</button>
            </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}