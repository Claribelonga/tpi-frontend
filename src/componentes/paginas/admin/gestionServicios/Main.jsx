import Formulario from "./Formulario"
import Listado from "./Listado"
import Menu from "../../../comun/Menu"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Main(){
    const [servicios, setServicios] = useState([]);
    const [servicioEdit, setServicioEdit] = useState();
     //GET
    const obtenerServicios =() =>{
      const url = "http://localhost:5000/api/servicios/";
      axios.get(url)
      .then((resp)=>{
        setServicios(resp.data);
        console.log(resp.data)
      })
      .catch((error) =>{
        console.error(error)
      })
    }
    useEffect(() => {
        obtenerServicios();
    }, []);

    //PUT ESTADO
    const cambiarEstado = (id_servicio, estadoActual) => {
        const url = `http://localhost:5000/api/servicios/modificarestado/${id_servicio}`
        const nuevoEstado = estadoActual === 1 ? 0 : 1; // si está activo, lo inactiva; si está inactivo, lo activa
        axios.put(url, {estado: nuevoEstado})
        .then((resp) => {
            console.log("Estado actualizado");
            obtenerServicios();
        })
        .catch((error) => {
            console.error(error)
        });
    }

    //POST
    const guardarServicio = (servicio) => {
        const url = `http://localhost:5000/api/servicios/crearservicio`
        axios.post(url, servicio)
        .then((resp)=>{
            console.log("servicio creado: ",resp.data)
            obtenerServicios();
        })
        .catch((error) =>{
            console.error(error)
            alert("usu no registrard")
        })
    }
    return(
        <div className="Cont-Padre">
            <div className="menu-lateral">
                <Menu></Menu>
            </div>
            <div className="area-contenido">
                <Formulario
                onGuardar={guardarServicio}
                // servicioEdit={servicioEdit}
                />
                <Listado
                servicios={servicios}
                onEditar={(servicio) => setServicioEdit(servicio)}
                onCambiarEstado={cambiarEstado}
                />
            </div>
        </div>
    )
}