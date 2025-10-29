
import useUsuario from "../../../logins/registrarse/useUsuario"

export default function Formulario({onGuardar}){
    const [usuario, setDato, limpiarInputs] = useUsuario();
     const guardar = (e) =>{
        e.preventDefault();
        console.log("datos del usuario: ", usuario);
        onGuardar(usuario);
    }

    return(
        <div className="ContenedorForm">
            <form className="FormContenedor" onSubmit={guardar}>
                        <input className="inputMitad" type="text" placeholder="nombre" value={usuario.nombre} onChange={(e) => setDato("nombre",e.target.value)} required/>
                        <input className="inputMitad" type="text" placeholder="apellido" value={usuario.apellido} onChange={(e) => setDato("apellido",e.target.value)} required/>
                        <input className="inputGen" type="password" placeholder="contraseña" value={usuario.contraseña} onChange={(e) => setDato("contraseña",e.target.value)} required/>
                        <input className="inputGen" type="email" placeholder="email" value={usuario.email} onChange={(e) => setDato("email",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="dni" value={usuario.dni} onChange={(e) => setDato("dni",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="teléfono" value={usuario.telefono} onChange={(e) => setDato("telefono",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="calle" value={usuario.calle} onChange={(e) => setDato("calle",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="numero" value={usuario.numero} onChange={(e) => setDato("numero",e.target.value)} required/>
                        <input className="inputGen" type="text" placeholder="piso" value={usuario.piso} onChange={(e) => setDato("piso",e.target.value)}/>
                        <input className="inputGen" type="text" placeholder="departamento" value={usuario.departamento} onChange={(e) => setDato("departamento",e.target.value)}/>
                        <button className="btn-violeta" type="submit">Guardar</button>
            </form>
                        
        </div>
    )
}