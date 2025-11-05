import { Link, useLocation } from "wouter";
import { useState } from "react";


export default function Formulario({ onLogin}){
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    // const [, navigate] = useLocation();

    const enviarDatos = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        console.log('Intento de inicio de sesión con:', { user, pass });
        onLogin({user, pass}) //llama a la funcion que viene del Main y le pasa el email y la contraseña
        // alert(`Intentando iniciar sesión con Email: ${email}`);
        //  navigate("/inicio");
    };

    return(
         <div className="Formulario">
            <form className="FormContenedor" onSubmit={enviarDatos}>
                <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
                <span className="titulo">Ingresa a tu cuenta VetSur</span>
                <input className="inputLogin" placeholder="email" type="email" value={user} onChange={(e) => setUser(e.target.value)} required/>
                <input className="inputLogin" placeholder="contraseña" type="password" value={pass} onChange={(e) => setPass(e.target.value)} required/>
                <button className="btn-violeta" type="submit">Iniciar Sesión</button>
                <p className="pNegrita">¿No tenes cuenta? {""} 
                    <Link href="/registrarse"> Registrate aquí</Link>
                </p>
                <img src="/img/gatitos.jpg" alt="gatos" className="gatitos"/>
            </form>
        </div>
    )
}

//sessionStorage.setItem("token", valor) esto guarda
//sessionStorage.getItem("token") obtiene lo guardado
//sessionStorage.removeItemque elimina el token y el clear() borra todo lo guardado en el cache