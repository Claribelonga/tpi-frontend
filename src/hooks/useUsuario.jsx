import { useState } from "react";

export default function useUsuario() {

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

  const [errores, setErrores] = useState({});
  const opcionales = ["piso", "departamento"];

  // Expresiones regulares para cada campo
  const reglas = {
    nombre: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    apellido: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
    contraseña: /^.{6,}$/,
    email: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    dni: /^[0-9]{7,8}$/,
    telefono: /^[0-9]{7,15}$/,
    calle: /^.{3,}$/,
    numero: /^[0-9]+$/,
    piso: /^[A-Za-z0-9]*$/, //opcional
    departamento: /^[A-Za-z0-9]*$/, //opcional
    matricula: /^[A-Za-z0-9]{4,}$/,
    id_especialidad: /^[0-9]+$/
  };

  // Valida un campo específico
  const validarCampo = (campo, valor) => {
    if (!reglas[campo]) return ""; // si no tiene regla, no se valida

    if (opcionales.includes(campo) && valor.trim() === "") return ""; //si es opcional y esta vacio, no marca error
    // Convertir SIEMPRE a string seguro
    const texto = (valor ?? "").toString().trim();

    if (texto === "") return "Este campo es obligatorio*";

    if (!reglas[campo].test(texto)) return "Formato inválido";

    return ""; // sin errores
  };

  // Setea y valida automáticamente
  const setDato = (campo, valor) => {
    setDatos(prev => ({ ...prev, [campo]: valor }));

    const error = validarCampo(campo, valor);
    setErrores(prev => ({ ...prev, [campo]: error }));
  };

  // Valida todos los campos antes de guardar
  const validarTodo = () => {
    const nuevosErrores = {};

    for (const campo in datos) {
      const error = validarCampo(campo, datos[campo]);
      console.log(campo)
      console.log(error)
      if (error) nuevosErrores[campo] = error;
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0; // true si todo OK
  };

  const limpiarInputs = () => {
    const limpio = {};
    for (const campo in datos) limpio[campo] = "";
    setDatos(limpio);
    setErrores({});
  };

  return { datos, errores, setDato, validarTodo, limpiarInputs };
}