import { useState } from "react";

export default function useUsuario(){
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [piso, setPiso] = useState("");
    const [departamento, setDepartamento] = useState("");

    const setDato = (campo, valor) => {
    switch (campo) {
      case "nombre":
        setNombre(valor);
        break;
      case "apellido":
        setApellido(valor);
        break;
      case "contraseña":
        setContraseña(valor);
        break;
      case "email":
        setEmail(valor);
        break;
      case "dni":
        setDni(valor);
        break;
      case "telefono":
        setTelefono(valor);
        break;
      case "calle":
        setCalle(valor);
        break;
      case "numero":
        setNumero(valor);
        break;
      case "piso":
        setPiso(valor);
        break;
      case "departamento":
        setDepartamento(valor);
        break;
      default:
        break;
    }
  };
  const limpiarInputs = () => {
    setNombre("");
    setApellido("");
    setContraseña("");
    setEmail("");
    setDni("");
    setTelefono("");
    setCalle("");
    setNumero("");
    setPiso("");
    setDepartamento("");
  };
  return [ { nombre, apellido, contraseña, email, dni, telefono, calle, numero, piso, departamento },
    setDato, limpiarInputs ];
}