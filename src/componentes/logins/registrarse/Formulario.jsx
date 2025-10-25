import { useState } from "react";
import { Link } from "wouter";
import useUsuario from "./useUsuario";

export default function Formulario(){
    const [usuario, setDato] = useUsuario();

    const guardar = (e) =>{
        e.preventDefault();
        const tarea = {
            nombre,
            prioridad,
            categoria, 
            estado
        }
        guardarTarea(tarea);
        console.log(tarea);
    }

    return(
        <div>
            <form className="FormContenedor" onSubmit={guardar}>
                <input type="text" placeholder="nombre" value={usuario.nombre} onChange={(e) => setDato("nombre",e.target.value)}/>
                <input type="text" placeholder="apellido" value={usuario.apellido} onChange={(e) => setDato("apellido",e.target.value)}/>
                <input type="text" placeholder="contraseña" value={usuario.password} onChange={(e) => setDato("password",e.target.value)}/>
                <input type="text" placeholder="email" value={usuario.email} onChange={(e) => setDato("email",e.target.value)}/>
                <input type="text" placeholder="dni" value={usuario.dni} onChange={(e) => setDato("dni",e.target.value)}/>
                <input type="text" placeholder="teléfono" value={usuario.telefono} onChange={(e) => setDato("telefono",e.target.value)}/>
                <input type="text" placeholder="calle" value={usuario.calle} onChange={(e) => setDato("calle",e.target.value)}/>
                <input type="text" placeholder="numero" value={usuario.numero} onChange={(e) => setDato("numero",e.target.value)}/>
                <input type="text" placeholder="piso" value={usuario.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                <input type="text" placeholder="departamento" value={usuario.depto} onChange={(e) => setDato("depto",e.target.value)}/>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}