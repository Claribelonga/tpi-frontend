import { useState } from "react";

export default function useUsuario(){
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [telefono, setTelefono] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [piso, setPiso] = useState("");
    const [depto, setDepto] = useState("");

    const setDato = (campo, valor) => {
    switch (campo) {
      case "nombre":
        setNombre(valor);
        break;
      case "apellido":
        setApellido(valor);
        break;
      case "password":
        setPassword(valor);
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
      case "depto":
        setDepto(valor);
        break;
      default:
        break;
    }
  };
  return [ { nombre, apellido, password, email, dni, telefono, calle, numero, piso, depto },
    setDato ];
}