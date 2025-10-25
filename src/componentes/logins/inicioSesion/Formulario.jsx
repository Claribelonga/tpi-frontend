import { useState } from "react";

export default function Formulario(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const enviarDatos = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // Aquí iría la lógica para enviar Email y Contraseña a la API (axios)
        console.log('Intento de inicio de sesión con:', { email, password });
        alert(`Intentando iniciar sesión con Email: ${email}`);
    };

    return(
         <div className="Formulario">
            <form className="FormContenedor" onSubmit={enviarDatos}>
                <span className="titulo">Ingresa a tu cuenta VetSur</span>
                <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input placeholder="contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Iniciar Sesión</button>
                <p>¿No tenes cuenta? <a href="#">Regístrate aquí</a></p>
            </form>
        </div>
    )
}