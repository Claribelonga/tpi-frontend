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
    console.log("Validando campo:", campo, "valor:", valor);

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

  // Función para setear y validar un campo
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
    return Object.keys(nuevosErrores).length === 0;
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

// import { useState } from "react";

// export default function useUsuario(camposExtra = []) {

//   const [datos, setDatos] = useState({
//     nombre: "",
//     apellido: "",
//     contraseña: "",
//     email: "",
//     dni: "",
//     telefono: "",
//     calle: "",
//     numero: "",
//     piso: "",
//     departamento: "",
//     matricula: "",
//     id_especialidad: ""
//   });

//   const [errores, setErrores] = useState({});
//   const opcionales = ["piso", "departamento"];

//   // Expresiones regulares
//   const reglas = {
//     nombre: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
//     apellido: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
//     contraseña: /^.{6,}$/,
//     email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
//     dni: /^[0-9]{7,8}$/,
//     telefono: /^[0-9]{7,15}$/,
//     calle: /^.{3,}$/,
//     numero: /^[0-9]+$/,
//     piso: /^[A-Za-z0-9]*$/,
//     departamento: /^[A-Za-z0-9]*$/,
//     matricula: /^[A-Za-z0-9]{4,}$/,
//     id_especialidad: /^[0-9]+$/
//   };

//   // Validar un campo
//   const validarCampo = (campo, valor) => {
//     console.log("Validando campo:", campo, "valor:", valor);
//   if (!reglas[campo]) return ""; 

//   if (campo === "contraseña" && (!valor || valor.trim() === "")){
//     console.log("Contraseña vacía permitida");
//     return "";
//   }; // contraseña opcional al actualizar

//   if (opcionales.includes(campo) && valor.trim() === "") return ""; 

//   const texto = (valor ?? "").toString().trim();

//   if (texto === ""){
//     console.log("Campo obligatorio vacío:", campo);
//     return "Este campo es obligatorio";
//   }

//   if (!reglas[campo].test(texto)) {
//     // errores específicos según el campo
//     switch (campo) {
//       case "nombre":
//       case "apellido":
//         return "Solo se permiten letras y espacios";
//       case "email":
//         return "Debe ser un email válido";
//       case "dni":
//         return "Debe tener 7 u 8 números";
//       case "telefono":
//         return "Debe contener solo números (7-15 dígitos)";
//       case "calle":
//         return "Debe tener al menos 3 caracteres";
//       case "numero":
//         return "Debe contener solo números";
//       case "piso":
//       case "departamento":
//         return "Solo letras o números";
//       case "contraseña":
//         return "Debe tener al menos 6 caracteres";
//       default:
//         return "Formato inválido";
//     }
//   }

//   return "";
// };

//   // const validarCampo = (campo, valor) => {
//   //   if (!reglas[campo]) return "";
//   //   if (opcionales.includes(campo) && valor.trim() === "") return "";

//   //   const texto = (valor ?? "").toString().trim();

//   //   // Solo campos obligatorios (incluye camposExtra) se validan como requeridos
//   //   const esObligatorio = !opcionales.includes(campo) && (["nombre","apellido","contraseña","email","dni","telefono","calle","numero"].includes(campo) || camposExtra.includes(campo));

//   //   if (esObligatorio && texto === "") return "Este campo es obligatorio*";

//   //   if (texto && !reglas[campo].test(texto)) return "Formato inválido";

//   //   return "";
//   // };

//   // Setea y valida
//   const setDato = (campo, valor) => {
//     setDatos(prev => ({ ...prev, [campo]: valor }));
//     const error = validarCampo(campo, valor);
//     setErrores(prev => ({ ...prev, [campo]: error }));
//   };

//   // Validar todos
//   const validarTodo = () => {
//     const nuevosErrores = {};
//     for (const campo in datos) {
//       const error = validarCampo(campo, datos[campo]);
//       console.log("Campo:", campo, "Error:", error);
//       if (error) nuevosErrores[campo] = error;
//     }
//     setErrores(nuevosErrores);
//     return Object.keys(nuevosErrores).length === 0;
//   };

//   const limpiarInputs = () => {
//     const limpio = {};
//     for (const campo in datos) limpio[campo] = "";
//     setDatos(limpio);
//     setErrores({});
//   };

//   return { datos, errores, setDato, validarTodo, limpiarInputs };
// }