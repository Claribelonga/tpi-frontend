import { useState } from "react";
import { Link } from "wouter";
import useUsuario from "./useUsuario";

export default function Formulario({onGuardar}){
    const [usuario, setDato, limpiarInputs] = useUsuario();

    const validarDatos = (datos) => {
  const errores = [];

  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!soloLetras.test(datos.nombre)) errores.push("El nombre solo puede contener letras");
  if (!soloLetras.test(datos.apellido)) errores.push("El apellido solo puede contener letras");

  // 8 nros para el dni
  if (!/^\d{8}$/.test(datos.dni)) errores.push("El DNI debe tener 8 números");

  // telefono 10 dígitos (sin espacios)
  if (!/^\d{10}$/.test(datos.telefono)) errores.push("El teléfono debe tener 10 dígitos");

  // Número de calle: solo números
  if (!/^\d+$/.test(datos.numero)) errores.push("El número de calle debe ser numérico");

  // Email: aunque HTML lo valida, lo reforzamos
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) errores.push("El email no es válido");

  // Contraseña mínima 6 caracteres
  if (datos.contraseña.length < 6) errores.push("La contraseña debe tener al menos 6 caracteres");

  return errores;
};

    const guardar = (e) =>{
        e.preventDefault();
        const errores = validarDatos(usuario);
        if(errores.length>0){
            alert ("errorres encontrados: " + errores.join("\n-"))
            return;
        }
        console.log("datos del usuario: ", usuario);
        onGuardar(usuario);
    }

    return(
        <div className="PaginaRegistro">
            <div className="ContenedorForm">
                <form className="FormContenedor" onSubmit={guardar}>
                <img src="img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
                <span className="titulo">Crea tu cuenta</span>

                <div className="filaInputs">
                    <input className="inputMitad" type="text" placeholder="nombre" value={usuario.nombre} onChange={(e) => setDato("nombre",e.target.value)} required/>
                    <input className="inputMitad" type="text" placeholder="apellido" value={usuario.apellido} onChange={(e) => setDato("apellido",e.target.value)} required/>
                </div>
                <input className="inputGen" type="password" placeholder="contraseña" value={usuario.contraseña} onChange={(e) => setDato("contraseña",e.target.value)} required/>
                <input className="inputGen" type="email" placeholder="email" value={usuario.email} onChange={(e) => setDato("email",e.target.value)} required/>
                <input className="inputGen" type="text" placeholder="dni" value={usuario.dni} onChange={(e) => setDato("dni",e.target.value)} required/>
                <input className="inputGen" type="text" placeholder="teléfono" value={usuario.telefono} onChange={(e) => setDato("telefono",e.target.value)} required/>
                <input className="inputGen" type="text" placeholder="calle" value={usuario.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                <input className="inputGen" type="text" placeholder="numero" value={usuario.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                <input className="inputGen" type="text" placeholder="piso" value={usuario.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                <input className="inputGen" type="text" placeholder="departamento" value={usuario.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                <button className="btn-violeta" type="submit">Registrarse</button>
                <p className="pNegrita">¿Ya tenes cuenta? {""} 
                    <Link href="/login"> Inicia Sesión</Link>
                </p>
            </form>
                
            </div>

            <div className="ContenedorImagen">
                <img src="img/perro.jpg" alt="perro" className="perro" />
            </div>
        </div>
    )
}