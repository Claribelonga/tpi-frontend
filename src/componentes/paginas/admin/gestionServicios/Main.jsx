import Formulario from "./Formulario"
import Listado from "./Listado"
import Menu from "../../../comun/Menu"
import { useState, useEffect } from "react"
import axios from "axios"

export default function Main(){
    const [servicios, setServicios] = useState([]);
    const [servicioEdit, setServicioEdit] = useState();
    const token = sessionStorage.getItem("token");
     //GET
    const obtenerServicios =() =>{
        const config = {
        headers: {
          Authorization: token,
        },
      }
      const url = "http://localhost:5000/api/servicios/";
      axios.get(url, config)
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
         const config = {
        headers: {
          Authorization: token,
        },
      }
        const url = `http://localhost:5000/api/servicios/modificarestado/${id_servicio}`
        const nuevoEstado = estadoActual === 1 ? 0 : 1; // si está activo, lo inactiva; si está inactivo, lo activa
        axios.put(url, {estado: nuevoEstado}, config)
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
         const config = {
        headers: {
          Authorization: token,
        },
      }
        const url = `http://localhost:5000/api/servicios/crearservicio`
        axios.post(url, servicio, config)
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
            <div>
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
    )
}