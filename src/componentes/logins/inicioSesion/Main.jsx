import Formulario from "./Formulario";
import { Link } from "wouter"
import { useLocation } from "wouter";
import axios from "axios";

export default function Main(){
    const [, navigate] = useLocation();

    const handleLogin = (datos) =>{
        const url = "http://localhost:5000/api/usuarios/login/";
        //enviamos los datos ingresados
        axios.post( url, {user: datos.user, pass: datos.pass}) 
        .then ((res) => {
            console.log("Respuesta del servidor:", res.data);
            
            if (res.data.status === "ok") {
                const token = res.data.token;
                sessionStorage.setItem("token", token); // Guardamos el token en sessionStorage
                const rol = res.data.rol;
                sessionStorage.setItem("rol", rol);
                window.dispatchEvent(new Event("sessionChange"));
                // Esperamos un tick para que React actualice antes de navegar
        setTimeout(() => {
          if (rol === 1) navigate("/inicio");
          else if (rol === 2) navigate("/veterinario");
          else if (rol === 3) navigate("/cliente");
        }, 100);
      } else {
        alert("Credenciales incorrectas");
      }
        })
        .catch((error) =>{
            console.error("error al iniciar sesion: ", error)
        })
    }
    return(
        <div className="PaginaLogin">
            <Formulario onLogin={handleLogin}/>
        </div>
        
    )
}