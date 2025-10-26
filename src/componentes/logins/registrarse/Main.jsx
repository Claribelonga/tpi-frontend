import Formulario from "./Formulario";
import axios from "axios";
import { useLocation } from "wouter";

export default function Registrarse(){

    const [, navigate] = useLocation();

    const guardar = (datos)=>{
      const url = "";
    //   const config = {
    //     headers: {authorization: "46809863"}
    //   }  
      axios.post(url, datos)
      .then((resp)=>{
        console.log("usuario guardado: ",resp.data)
        navigate('/login'); //si el posst es exitoso redirige automaticamente al inicio de la pagina
      })
      .catch((error) =>{
        console.error("error al guardar: ",error)
        alert("no se guardo el registro")
      })
    }


    return(
        <Formulario onGuardar={guardar}></Formulario>
    )
}