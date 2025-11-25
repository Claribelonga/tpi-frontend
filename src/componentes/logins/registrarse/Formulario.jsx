import { useState } from "react";
import { Link } from "wouter";
import useUsuario from "../../../hooks/useUsuario"

export default function Formulario({onGuardar}){
    const { datos, errores: erroresForm, setDato, validarTodo, limpiarInputs } = useUsuario();
 const guardar = (e) => {
    e.preventDefault();
    if (!validarTodo()) {
      console.log("Hay errores en el formulario");
      alert("Hay errores en el formulario");
      return;
    }
    console.log("Datos del usuario: ", datos);
    onGuardar(datos);
    limpiarInputs();
  };

    return(
        <div className="PaginaRegistro">
            <div className="ContenedorForm">
                <form className="FormContenedor" onSubmit={guardar}>
                {/* <img src="img/logoVetSur.png" alt="logoVioleta" className="logo"></img> */}
                <span className="titulo">Crea tu cuenta</span>

                <div className="filaInputs">
                    <div className="inputContainer">
                        <label>Nombre:</label>
                        <input className="inputMitad" type="text" placeholder="nombre" value={datos.nombre} onChange={(e) => setDato("nombre",e.target.value)} required/>
                        {erroresForm.nombre && <span className="error">{erroresForm.nombre}</span>}
                    </div>
                    <div className="inputContainer">
                        <label>Apellido:</label>
                        <input className="inputMitad" type="text" placeholder="apellido" value={datos.apellido} onChange={(e) => setDato("apellido",e.target.value)} required/>
                        {erroresForm.apellido && <span className="error">{erroresForm.apellido}</span>}
                    </div>
                </div>
                <div className="inputContainer">
                    <label>Contraseña:</label>
                    <input className="inputGen" type="password" placeholder="contraseña" value={datos.contraseña} onChange={(e) => setDato("contraseña",e.target.value)} required/>
                    {erroresForm.contraseña && <span className="error">{erroresForm.contraseña}</span>}
                </div>
                <div className="inputContainer">
                    <label>Email:</label>
                    <input className="inputGen" type="email" placeholder="email" value={datos.email} onChange={(e) => setDato("email",e.target.value)} required/>
                    {erroresForm.email && <span className="error">{erroresForm.email}</span>}
                </div>
                <div className="filaInputs">
                <div className="inputContainer">
                    <label>DNI:</label>
                    <input className="inputMitad" type="text" placeholder="dni" value={datos.dni} onChange={(e) => setDato("dni",e.target.value)} required/>
                    {erroresForm.dni && <span className="error">{erroresForm.dni}</span>}
                </div>
                <div className="inputContainer">
                    <label>Teléfono:</label>
                    <input className="inputMitad" type="text" placeholder="teléfono" value={datos.telefono} onChange={(e) => setDato("telefono",e.target.value)} required/>
                    {erroresForm.telefono && <span className="error">{erroresForm.telefono}</span>}
                </div>
                </div>
                <div className="filaInputs">
                <div className="inputContainer">
                    <label>Calle:</label>
                    <input className="inputMitad" type="text" placeholder="calle" value={datos.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                    {erroresForm.calle && <span className="error">{erroresForm.calle}</span>}
                </div>
                <div className="inputContainer">
                    <label>Número:</label>
                    <input className="inputMitad" type="text" placeholder="numero" value={datos.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                    {erroresForm.numero && <span className="error">{erroresForm.numero}</span>}
                </div>
                </div>
                <div className="filaInputs">
                <div className="inputContainer">
                    <label>Piso:</label>
                    <input className="inputMitad" type="text" placeholder="piso" value={datos.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                    {erroresForm.piso && <span className="error">{erroresForm.piso}</span>}
                </div>
                <div className="inputContainer">
                    <label>Departamento:</label>
                    <input className="inputMitad" type="text" placeholder="departamento" value={datos.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                    {erroresForm.departamento && <span className="error">{erroresForm.departamento}</span>}
                </div>
                </div>
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