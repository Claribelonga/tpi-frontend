import Formulario from "./Formulario";
import axios from "axios";
import { useLocation } from "wouter";
import useMensaje from "../../../hooks/useMensaje";
import Mensaje from "../../comun/Mensaje";

export default function Registrarse(){
  const{textoMensaje,tipoMensaje,visible,mostrarMensaje}=useMensaje();
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
        if (error.response?.data?.errores) {
      // Recorrer todos los errores del backend
      error.response.data.errores.forEach(err => {
        mostrarMensaje("" + err, "error");
      });
    } else if (error.response?.data) {
      // Si recibís un string viejo
      mostrarMensaje("" + error.response.data, "error");
    }
      })
    }
    return(
      <>
    <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
    <Formulario onGuardar={guardar}></Formulario>
      </>
    )
}