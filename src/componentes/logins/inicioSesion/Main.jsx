import Formulario from "./Formulario";
import { Link } from "wouter"
import { useLocation } from "wouter";
import axios from "axios";
import { useState } from "react";

export default function Main(){
    const [, navigate] = useLocation();
    const [error, setError] = useState("");

    const onLogin = (datos) =>{
        const url = "http://localhost:5000/api/usuarios/login/";
        //enviamos los datos ingresados
        axios.post( url, {user: datos.user, pass: datos.pass}) 
        .then ((res) => {
            // console.log("Respuesta del servidor:", res.data);
            
            if (res.data.status === "ok") {
              setError(""); // Limpiar error
                const token = res.data.token;
                sessionStorage.setItem("token", token); // Guardamos el token en sessionStorage
                const rol = res.data.rol;
                sessionStorage.setItem("rol", rol);
                window.dispatchEvent(new Event("sessionChange"));
                // Esperamos un tick para que React actualice antes de navegar
        setTimeout(() => {
          if (rol === 1) navigate("/inicio");
          else if (rol === 2) navigate("/inicio");
          else if (rol === 3) navigate("/inicio");
        }, 100);
      } else {
        // alert("Credenciales incorrectas");
        setError("Usuario o contraseña incorrectos");
      }
        })
        .catch((err) =>{
            console.error("error al iniciar sesion: ", err)
            setError("Usuario o contraseña incorrectos");
            alert("Credenciales incorrectas")
        })
    }
    return(
        <div className="PaginaLogin">
            <Formulario onLogin={onLogin} error={error}/>
        </div>
    )
}