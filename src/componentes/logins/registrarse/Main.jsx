import Formulario from "./Formulario";
import axios from "axios";
import { useLocation } from "wouter";

export default function Registrarse(){
    const [, navigate] = useLocation();
     //POST
    const guardar = (datos)=>{
      const url = "http://localhost:5000/api/usuarios/registro";
      axios.post(url, datos)
      .then((resp)=>{
        console.log(resp.data)
        navigate("/login");
        console.log("usuario guardado")
        alert("usuario registrado")
      })
      .catch((error) =>{
        console.error(error)
        alert("usuario no registrard")
      })
    }
    return(
        <Formulario onGuardar={guardar}></Formulario>
    )
}