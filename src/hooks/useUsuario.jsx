import { useState } from "react";

export default function useUsuario(camposExtra = []) {
  // Estado de los datos del formulario
  const [datos, setDatos] = useState({
    nombre: "",
    apellido: "",
    contraseña: "",
    email: "",
    dni: "",
    telefono: "",
    calle: "",
    numero: "",
    piso: "",
    departamento: "",
    matricula: "",
    id_especialidad: ""
  });

  // Estado de errores
  const [errores, setErrores] = useState({});

  // Campos opcionales
  const opcionales = ["piso", "departamento"];

  // Expresiones regulares para validación
  const reglas = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    apellido: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    contraseña: /^.{6,}$/,
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    dni: /^[0-9]{7,8}$/,
    telefono: /^[0-9]{7,15}$/,
    calle: /^.{3,}$/,
    numero: /^[0-9]+$/,
    piso: /^[A-Za-z0-9]*$/,
    departamento: /^[A-Za-z0-9]*$/,
    matricula: /^[A-Za-z0-9]{4,}$/,
    id_especialidad: /^[0-9]+$/
  };

  // Función para validar un campo específico
  const validarCampo = (campo, valor) => {
    // console.log("Validando campo:", campo, "valor:", valor);

    // Si es un campo extra (veterinario) que no aplica para este usuario, lo ignoramos
    if ((campo === "matricula" || campo === "id_especialidad") && !camposExtra.includes(campo)) {
      return "";
    }

    if (!reglas[campo]) return "";

    // Contraseña vacía permitida
    if (campo === "contraseña" && (!valor || valor.trim() === "")) {
      return "";
    }

    // Campos opcionales vacíos permitidos
    if (opcionales.includes(campo) && (!valor || valor.trim() === "")) return "";

    const texto = (valor ?? "").toString().trim();

    if (texto === "") {
      return "Este campo es obligatorio";
    }

    if (!reglas[campo].test(texto)) {
      switch (campo) {
        case "nombre":
        case "apellido":
          return "Solo se permiten letras y espacios";
        case "email":
          return "Debe ser un email válido";
        case "dni":
          return "Debe tener 7 u 8 números";
        case "telefono":
          return "Debe contener solo números (7-15 dígitos)";
        case "calle":
          return "Debe tener al menos 3 caracteres";
        case "numero":
          return "Debe contener solo números";
        case "piso":
        case "departamento":
          return "Solo letras o números";
        case "contraseña":
          return "Debe tener al menos 6 caracteres";
        case "matricula":
          return "Debe tener al menos 4 caracteres alfanuméricos";
        case "id_especialidad":
          return "Debe seleccionar una especialidad válida";
        default:
          return "Formato inválido";
      }
    }

    return "";
  };

  // Función para setear y validar un campo setter
  const setDato = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));
    const error = validarCampo(campo, valor);
    setErrores(prev => ({ ...prev, [campo]: error }));
  };

  // Validar todos los campos antes de guardar
  const validarTodo = () => {
    const nuevosErrores = {};
    for (const campo in datos) {
      const error = validarCampo(campo, datos[campo]);
      if (error) nuevosErrores[campo] = error;
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0; //investigar 
  };

  // Limpiar todos los inputs
  const limpiarInputs = () => {
    const limpio = {};
    for (const campo in datos) limpio[campo] = "";
    setDatos(limpio);
    setErrores({});
  };

  return { datos, errores, setDato, validarTodo, limpiarInputs };
}
//investigar setter getter