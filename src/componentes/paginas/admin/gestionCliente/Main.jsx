import Formulario from "./Formulario"
import Listado from "./Listado"
// import Menu from "../../../comun/Menu"
import Buscador from "./Buscador"
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Main(){
    const [clientes, setClientes] = useState([]);
    const [clienteEdit, setClienteEdit] = useState(null);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState(""); // "exito" o "error"


    const token = sessionStorage.getItem("token");
    console.log("TOKEN: ", token);

     //GET
    const obtenerClientes = (busqueda = "") =>{
      console.log("Buscando:", busqueda);
      const config = {
        headers: {
          Authorization: token,
        },
      }
      const url = `http://localhost:5000/api/clientes?busqueda=${busqueda}`;
      axios.get(url, config)
      .then((resp)=>{
        setClientes(resp.data.personas);
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
      const config = {
        headers: {
          Authorization: token,
        },
      }
        //hago un if si hay un editarcliente PUT sino un POST
        if (clienteEdit) {
            const url = `http://localhost:5000/api/clientes/editarcliente/${clienteEdit.usuario.id_usuario}`;
            axios.put (url, datos, config)
            .then((resp) => {
                console.log("cliente actualizado: ",resp.data);
                obtenerClientes();
                setMensaje("✅ Cliente registrado con éxito");
                setTipoMensaje("exito");
                setClienteEdit(null); //limpia el formularioo
                setTimeout(() => setMensaje(""), 4000);
            })
            .catch((error) => {
              console.error(error);
              setMensaje("❌ Error al registrar cliente");
              setTipoMensaje("error");
              setTimeout(() => setMensaje(""), 4000);
            });
        }
        else {
            //POST normal para crear
            const url = "http://localhost:5000/api/clientes/crearcliente";
            axios.post(url, datos, config)
            .then((resp) => {
                console.log("cliente creado: ",resp.data)
                setMensaje("✅ Cliente registrado con éxito");
                setTipoMensaje("exito");
                obtenerClientes()
                setTimeout(() => setMensaje(""), 4000);
            })
            .catch ((error) => {
                console.error(error);
                setMensaje("❌ Error al registrar cliente");
                setTipoMensaje("error");
                setTimeout(() => setMensaje(""), 4000);
            })
        }
     }

    return(
        <div>
          {mensaje && (
            <div className={`mensaje-bienvenida ${tipoMensaje}`}>
              {mensaje}
            </div>
          )}
          <Formulario
          guardarCliente={guardarCliente}
          clienteEdit={clienteEdit}
          />
          <Buscador
          onBuscar={obtenerClientes}/>
          <Listado
          clientes={clientes}
          onEditar={(cliente) => setClienteEdit(cliente)}
          />
        </div>
    )
}