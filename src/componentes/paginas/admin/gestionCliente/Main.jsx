import Formulario from "./Formulario"
import Listado from "./Listado"
import Menu from "../../../comun/Menu"
import Buscador from "./Buscador"
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Main(){
    const [clientes, setClientes] = useState([]);
    const [clienteEdit, setClienteEdit] = useState(null);

     //GET
    const obtenerClientes =() =>{
      const url = "http://localhost:5000/api/clientes/";
      axios.get(url)
      .then((resp)=>{
        setClientes(resp.data);
        console.log(resp.data)
      })
      .catch((error) =>{
        console.error(error)
      })
    }


    useEffect(() => {
      obtenerClientes();
    },[])


     //POST
     const guardarCliente = (datos) => {
        //hago un if si hay un editarcliente PUT sino un POST
        if (clienteEdit) {
            const url = `http://localhost:5000/api/clientes/editarcliente/${clienteEdit.usuario.id_usuario}`;
            axios.put (url, datos)
            .then((resp) => {
                console.log("cliente actualizado: ",resp.data);
                obtenerClientes();
                setClienteEdit(null); //limpia el formularioo
            })
            .catch((error) => console.error(error));
        }
        else {
            //POST normal para crear
            const url = "http://localhost:5000/api/clientes/crearcliente";
            axios.post(url, datos)
            .then((resp) => {
                console.log("cliente creado: ",resp.data)
                obtenerClientes()
            })
            .catch ((error) => {
                console.error(error);
            })
        }
     }






    // const guardarCliente = (datos)=>{
    //   const url = "http://localhost:5000/api/personas/crearcliente";
    //   axios.post(url, datos)
    //   .then((resp)=>{
    //     console.log(resp.data)
    //     console.log("usuario guardado")
    //     alert("usuario registrado")
    //     obtenerClientes();
    //   })
    //   .catch((error) =>{
    //     console.error(error)
    //     alert("usu no registrard")
    //   })
    // }


    return(
        <div className="Cont-Padre">
            <div className="menu-lateral">
                <Menu></Menu>
            </div>
            <div className="area-contenido">
                <Formulario 
                guardarCliente={guardarCliente}
                clienteEdit={clienteEdit}
                />
                <Buscador/>
                <Listado
                clientes={clientes}
                onEditar={(cliente) => setClienteEdit(cliente)}
                />
            </div>
        </div>
    )
}