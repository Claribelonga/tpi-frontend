import Formulario from "./Formulario"
import Listado from "./Listado"
import Buscador from "../../../comun/Buscador"
import Paginacion from "../../../comun/paginacion";
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Main(){
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // "exito" o "error"

  const token = sessionStorage.getItem("token");
  console.log("token: ", token);

  //GET
  const obtenerClientes = (busqueda = "", pagina = 1) =>{
    console.log("Buscando: ", busqueda);
    const config = {
      headers: {
        Authorization: token,
      },
    }
    const url = `http://localhost:5000/api/clientes?busqueda=${busqueda}&pagina=${pagina}`;
    axios.get(url, config)
    .then((resp) =>{
      setClientes(resp.data.personas);
      console.log(resp.data);
      //guardar paginacion
      setPaginaActual(resp.data.paginaActual);
      setTotalPaginas(resp.data.totalPaginas);
    })
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    obtenerClientes("", paginaActual);
  }, [])

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    obtenerClientes("", nuevaPagina)
  }
  //POST
  const guardarCliente = (datos)=> {
    const config = {
      headers: {
        Authorization: token,
      },
    }
    //hago un if si hay un editarcliente Put sino un POST
    if(clienteEdit) {
      const url = `http://localhost:5000/api/clientes/editarcliente/${clienteEdit.usuario.id_usuario}`;
      axios.put(url, datos, config)
      .then((resp) => {
        console.log("cliente actualizado: ", resp.data);
        obtenerClientes();
        setMensaje("✅ Cliente registrado con éxito");
        setTipoMensaje("exito");
        setClienteEdit(null); //limpia el formularioo
        setTimeout(() => setMensaje(""), 4000);
      })
      .catch((error) => {
        console.error(error)
        setMensaje("❌ Error al registrar cliente");
        setTipoMensaje("error");
        setTimeout(() => setMensaje(""), 4000);
      })
    } else {
      //POST normal para crear cliente
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
        console,error(error);
        setMensaje("❌ Error al registrar cliente");
        setTipoMensaje("error");
        setTimeout(() => setMensaje(""), 4000);
      })
    }
  }

  return(
    <div>
      {mensaje && (
        <div className={`mensaje-bienvenida${tipoMensaje}`}>
          {mensaje}
        </div>
      )}
      <Formulario
      guardarCliente={guardarCliente}
      clienteEdit={clienteEdit}
      />
      <Buscador
      onBuscar={obtenerClientes}
      titulo={"Buscar Cliente"}
      placeholder={"Ingrese Nombre y/o Apellido"}
      />
      <Listado
      clientes={clientes}
      onEditar={(cliente) => setClienteEdit(cliente)}
      />
      <Paginacion
      paginaActual={paginaActual}
      totalPaginas={totalPaginas}
      cambiarPagina={cambiarPagina}/>
    </div>
  )   
}