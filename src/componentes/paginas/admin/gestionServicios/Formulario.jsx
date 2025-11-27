import { useState, useEffect } from "react";
const REGEX_NOMBRE_SERVICIO = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
export default function Formulario({ onGuardar, servicioEdit, mostrarMensaje, cerrar }) {

  const [datos, setDatos] = useState({
    nombre: "",
    precio: ""
  });

  const [errores, setErrores] = useState({
    nombre: "",
    precio: ""
  });

  // Cargar datos cuando editas
  useEffect(() => {
    if (servicioEdit) {
      setDatos({
        nombre: servicioEdit.nombre,
        precio: servicioEdit.precio
      });
      setErrores({ nombre: "", precio: "" });
    } else {
      setDatos({ nombre: "", precio: "" });
      setErrores({ nombre: "", precio: "" });
    }
  }, [servicioEdit]);

  // Para actualizar un campo individual
  const setDato = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  // ===== VALIDACIONES =====
  const validarNombre = (valor) => {
    if (valor.trim().length < 3) {
      return "El nombre debe tener mínimo 3 caracteres.";
    }
    if (!REGEX_NOMBRE_SERVICIO.test(valor.trim())) {
      return "El nombre solo puede contener letras, espacios y guiones. Mínimo 3 caracteres.";
    }
    return "";
  };
  const validarPrecio = (valor) => {
    if (Number(valor) <= 0 || valor === "") {
      return "El precio debe ser mayor a 0.";
    }
    return "";
  };

  // Validar en tiempo real
  const manejarCambios = (campo, valor) => {
    setDato(campo, valor);
    let error = "";
    if (campo === "nombre") error = validarNombre(valor);
    if (campo === "precio") error = validarPrecio(valor);
    setErrores({ ...errores, [campo]: error });
  };

  // ===== ENVÍO =====
  const guardar = (e) => {
    e.preventDefault();

    const errNombre = validarNombre(datos.nombre);
    const errPrecio = validarPrecio(datos.precio);

    // si hay errores → no se envía
    if (errNombre || errPrecio) {
      setErrores({
        nombre: errNombre,
        precio: errPrecio
      });
      return;
    }

    onGuardar(datos);

    setDatos({ nombre: "", precio: "" });
    setErrores({ nombre: "", precio: "" });
  };

  return (
    <>
  <div className="modal-overlay">
    <div className="modalContent">
      <form className="formulario-mascota-modal" onSubmit={guardar}>

        {/* Parte superior del modal */}
        <div className="modalArriba">
          <span>{servicioEdit ? "Editar Servicio" : "Registrar Servicio"}</span>

          <button type="button" onClick={cerrar} className="btnCloseModal">
            <img src="/img/equis.png" className="icono" />
          </button>
        </div>

        {/* Nombre */}
        <div className="inputContainer">
          <label>Nombre:</label>
          <input
            className="inputGen"
            placeholder="Ingrese servicio"
            type="text"
            value={datos.nombre}
            onChange={(e) => manejarCambios("nombre", e.target.value)}
          />
          {errores.nombre && <p className="error">{errores.nombre}</p>}
        </div>

        {/* Precio */}
        <div className="inputContainer">
          <label>Precio:</label>
          <input
            className="inputGen"
            type="number"
            placeholder="Ingrese el precio"
            value={datos.precio}
            onChange={(e) => manejarCambios("precio", e.target.value)}
            onKeyDown={(e) =>
              ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
            }
          />
          {errores.precio && <p className="error">{errores.precio}</p>}
        </div>

        {/* Botón */}
        <div className="form-section form-button">
          <button className="btn-violeta" type="submit">
            {servicioEdit ? "Guardar Cambios" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  </div>
</>
  );
}