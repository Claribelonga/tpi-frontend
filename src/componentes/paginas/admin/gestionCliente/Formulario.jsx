import { useEffect } from "react";
import useUsuario from "../../../logins/registrarse/useUsuario"
export default function Formulario({guardarCliente, clienteEdit}){
    const [usuario, setDato, limpiarInputs] = useUsuario();

    useEffect(() => {
        if (clienteEdit) {
            setDato("nombre", clienteEdit.nombre);
            setDato("apellido", clienteEdit.apellido);
            setDato("contraseña", ""); //no se edita visible
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
        console.log("datos del usuario: ", usuario);
        guardarCliente(usuario);
        limpiarInputs();
    }
    return(
        <div className="cont-form">
            <h2>Gestionar Clientes</h2>
            <form className="formulario" onSubmit={guardar}>
                <div className="form-section">
                    <span className="">Datos Personales</span>
                    <div className="inputs-grid">
                        <input className="inputGen" type="text" placeholder="nombre" value={usuario.nombre} onChange={(e) => setDato("nombre",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="apellido" value={usuario.apellido} onChange={(e) => setDato("apellido",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="dni" value={usuario.dni} onChange={(e) => setDato("dni",e.target.value)} required/>
                    </div>
                </div>

                <div className="form-section">
                    <span className="">Direccion</span>
                    <div className="inputs-grid">
                        <input className="inputGen" type="text" placeholder="calle" value={usuario.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="numero" value={usuario.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="piso" value={usuario.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                        <input className="inputGen" type="text" placeholder="departamento" value={usuario.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                    </div>
                </div>

                <div className="form-section">
                    <span className="">Contactos</span>
                    <div className="inputs-grid">
                        <input className="inputGen" type="email" placeholder="email" value={usuario.email} onChange={(e) => setDato("email",e.target.value)} required/>
                        <input className="inputGen" type="password" placeholder="contraseña" value={usuario.contraseña} onChange={(e) => setDato("contraseña",e.target.value)} required={!clienteEdit}/>
                        <input className="inputGen" type="text" placeholder="teléfono" value={usuario.telefono} onChange={(e) => setDato("telefono",e.target.value)} required/>
                    </div>
                </div>
                <div className="form-section form-button">
                    <button className="btn-violeta" type="submit">{clienteEdit ? "Guardar Cambios" : "Registrar"}</button>
                </div>
            </form>
           
        </div>
    )
}