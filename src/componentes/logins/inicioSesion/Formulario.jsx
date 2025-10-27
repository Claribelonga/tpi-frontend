import { Link, useLocation } from "wouter";
import { useState } from "react";


export default function Formulario(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [, navigate] = useLocation();

    const enviarDatos = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // Aquí iría la lógica para enviar Email y Contraseña a la API (axios)
        console.log('Intento de inicio de sesión con:', { email, password });
        alert(`Intentando iniciar sesión con Email: ${email}`);
         navigate("/inicio");
    };

    return(
         <div className="Formulario">
            <form className="FormContenedor" onSubmit={enviarDatos}>
                <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
                <span className="titulo">Ingresa a tu cuenta VetSur</span>
                <input className="inputLogin" placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input className="inputLogin" placeholder="contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className="btn-violeta" type="submit">Iniciar Sesión</button>
                <p className="pNegrita">¿No tenes cuenta? {""} 
                    <Link href="/registrarse"> Registrate aquí</Link>
                </p>
                <img src="/img/gatitos.jpg" alt="gatos" className="gatitos"/>
            </form>
        </div>
    )
}