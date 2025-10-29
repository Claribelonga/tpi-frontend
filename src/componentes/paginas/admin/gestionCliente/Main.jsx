import Formulario from "./Formulario"
import Listado from "./Listado"
import Menu from "../../../comun/Menu"
import React, { useState, useEffect } from 'react';
import axios from "axios";
export default function Main(){
    const [clientes, setClientes] = useState([]);
     //GET
    const obtenerClientes =() =>{
      const url = "http://localhost:5000/api/admin/ver";
      axios.get(url)
      .then((resp)=>{
        setClientes(resp.data.clientes);
        console.log(resp.data.clientes)
      })
      .catch((error) =>{
        console.error(error)
      })
    }
    useEffect(() => {
//   const obtenerClientes = () => {
//     const url = "";
//     axios.get(url)
//       .then((resp) => setAutores(resp.data.autores))
//       .catch((err) => console.error(err));
//   };
//   obtenerAutores();
}, []);
    useEffect(() => {
      obtenerClientes();
    },[])

     //POST
    const guardar = (datos)=>{
      const url = "http://localhost:5000/api/admin/crearcliente";
      // const config = {
      //   headers: {authorization: "123456"}
      // }  
      axios.post(url, datos)
      .then((resp)=>{
        console.log(resp.data)
        console.log("usuario guardado")
        alert("usuario registrado")
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
                <Formulario onGuardar={guardar}></Formulario>
                <Listado clientes={clientes}></Listado>
            </div>
        </div>
    )
}