import { useEffect } from "react";
import useUsuario from "../../../../hooks/useUsuario";

export default function Formulario({guardarCliente, clienteEdit}){
    const { datos, errores, setDato, validarTodo, limpiarInputs } = useUsuario();
    useEffect(() => {
        if (clienteEdit) {
            setDato("nombre", clienteEdit.nombre);
            setDato("apellido", clienteEdit.apellido);
            setDato("contraseña", clienteEdit,""); //no se edita visible
            setDato("email", clienteEdit.usuario.email);
            setDato("dni", clienteEdit.dni);
            setDato("telefono", clienteEdit.telefono);
            setDato("calle", clienteEdit.direccion.calle);
            setDato("numero", clienteEdit.direccion.numero);
            setDato("piso", clienteEdit.direccion.piso);
            setDato("departamento", clienteEdit.direccion.departamento);
        } else {
            limpiarInputs();
        }
    }, [clienteEdit]);

    const guardar = (e) =>{
        e.preventDefault();
        // Validación global ANTES de enviar
        if (!validarTodo()) {
            console.log("Hay errores en el formulario");
            alert("Hay errores en el formulario")
            return;
        }
        console.log("datos del usuario: ", datos);
        guardarCliente(datos);
        limpiarInputs();
    }
    return(
        <div className="cont-form">
            <h2>Gestionar Clientes</h2>
            <form className="formulario" onSubmit={guardar}>
                <div className="form-section">
                    <span className="">Datos Personales</span>
                    <div className="inputs-grid">
                        <div>
                        <input className="inputGen" type="text" placeholder="nombre" value={datos.nombre} onChange={(e) => setDato("nombre",e.target.value)} required/>
                         {errores.nombre && <p className="error">{errores.nombre}</p>}
                        </div>
                        <div>
                        <input className="inputGen" type="text" placeholder="apellido" value={datos.apellido} onChange={(e) => setDato("apellido",e.target.value)} required/>
                         {errores.apellido && <p className="error">{errores.apellido}</p>}
                        </div>
                        <div>
                        <input className="inputGen" type="text" placeholder="dni" value={datos.dni} onChange={(e) => setDato("dni",e.target.value)} required/>
                         {errores.dni && <p className="error">{errores.dni}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <span className="">Direccion</span>
                    <div className="inputs-grid">
                        <div>
                            <input className="inputGen" type="text" placeholder="calle" value={datos.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                            {errores.calle && <p className="error">{errores.calle}</p>}
                        </div>
                        <div>
                            <input className="inputGen" type="text" placeholder="numero" value={datos.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                            {errores.numero && <p className="error">{errores.numero}</p>}
                        </div>
                        <div>
                            <input className="inputGen" type="text" placeholder="piso" value={datos.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                            {errores.piso && <p className="error">{errores.piso}</p>}
                        </div>
                        <div>
                            <input className="inputGen" type="text" placeholder="departamento" value={datos.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                            {errores.departamento && <p className="error">{errores.departamento}</p>}
                        </div>
                    </div>
                </div>

                <div className="form-section">
                    <span className="">Contactos</span>
                    <div className="inputs-grid">
                        <div>
                            <input className="inputGen" type="email" placeholder="email" value={datos.email} onChange={(e) => setDato("email",e.target.value)} required/>
                            {errores.email && <p className="error">{errores.email}</p>}
                        </div>
                        <div>
                            <input className="inputGen" type="password" placeholder="contraseña" value={datos.contraseña} onChange={(e) => setDato("contraseña",e.target.value)} required={!clienteEdit}/>
                            {errores.contraseña && <p className="error">{errores.contraseña}</p>}
                        </div>
                        <div>
                            <input className="inputGen" type="text" placeholder="teléfono" value={datos.telefono} onChange={(e) => setDato("telefono",e.target.value)} required/>
                            {errores.telefono && <p className="error">{errores.telefono}</p>}
                        </div>
                    </div>
                </div>
                <div className="form-section form-button">
                    <button className="btn-violeta" type="submit">{clienteEdit ? "Guardar Cambios" : "Registrar"}</button>
                </div>
            </form>
        </div>
    )
}