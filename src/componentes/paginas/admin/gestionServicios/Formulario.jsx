import { useState, useEffect } from "react"

export default function Formulario({onGuardar, servicioEdit}){
    const [nombre,setNombre] = useState("");
    const [precio, setPrecio] = useState("");

    useEffect(() => {
        if (servicioEdit) {
            setNombre(servicioEdit.nombre);
            setPrecio(servicioEdit.precio);
        } else {
            setNombre("");
            setPrecio("");
        }
    }, [servicioEdit]);


    const guardar = (e) => {
        const nuevoServicio = { nombre, precio };
        console.log("datos servicio: ", nuevoServicio);
        onGuardar(nuevoServicio);
        setNombre("")
        setPrecio("");
    }

    return(
        <div className="cont-form">
            <h2>Gestionar Clientes</h2>
            <form className="formulario" onSubmit={guardar}>
                <div className="form-section">
                    <div className="inputs-grid">
                        <input className="inputGen" type="text" placeholder="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                        <input className="inputGen" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required/>
                    </div>
                </div>
                <div className="form-section form-button">
                    <button className="btn-violeta" type="submit">{servicioEdit ? "Guardar Cambios" : "Registrar"}</button>
                </div>
            </form>
           
        </div>
    )
}