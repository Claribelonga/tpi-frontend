import Formulario from "./Formulario"
import Listado from "./Listado"
import Buscador from "../../../comun/Buscador"
import Paginacion from "../../../comun/paginacion";
import Mensaje from "../../../comun/Mensaje";
import useMensaje from "../../../../hooks/useMensaje";
import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Main(){
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [clientes, setClientes] = useState([]);
  const [clienteEdit, setClienteEdit] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);
  const {
    textoMensaje,
    tipoMensaje,
    visible,
    mostrarMensaje
  } = useMensaje();

  const token = sessionStorage.getItem("token");
  console.log("token: ", token);

  //GET para obtener clientes
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
      mostrarMensaje("Error al obtener servicios", "error");
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
        setMostrarForm(false);
        mostrarMensaje("✅ Cliente actualizado con éxito", "exito");
        setClienteEdit(null); //limpia el formularioo
      })
      .catch((error) => {
        console.error(error)
        mostrarMensaje("❌ Error al registrar cliente", "error");
      })
    } else {
      //POST normal para crear cliente
      const url = "http://localhost:5000/api/clientes/crearcliente";
      axios.post(url, datos, config)
      .then((resp) => {
        console.log("cliente creado: ",resp.data)
        mostrarMensaje("✅ Cliente creado con éxito", "exito");
        obtenerClientes()
      })
      .catch ((error) => {
        console.error(error);
        mostrarMensaje("❌ Error al crear cliente", "error");
      })
    }
  }

  const restablecerContrasena = (id_usuario) => {
  const config = { headers: { Authorization: token } };
  const url = `http://localhost:5000/api/clientes/restablecer/${id_usuario}`;
  
  axios.put(url, {}, config)
    .then(resp => {
      mostrarMensaje("✅ Contraseña restablecida correctamente (DNI asignado)", "exito");
      console.log("Respuesta del backend:", resp.data);
    })
    .catch(err => {
      mostrarMensaje("❌ Error al restablecer contraseña", "error");
      console.error(err);
    });
};

  return(
    <div>
      <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
      <h2>Gestionar Clientes</h2>
      <Buscador
      onBuscar={obtenerClientes}
      titulo={"Buscar Cliente"}
      placeholder={"Ingrese Nombre y/o Apellido"}
      />
      {/* Botón Crear Cliente */}
      <button className="btn-violeta" onClick={() => {
          setClienteEdit(null);
          setMostrarForm(true);
        }}
      >
        Crear Cliente
      </button>
      <Listado
        clientes={clientes}
        onEditar={(cliente) => {
          setClienteEdit(cliente);
          setMostrarForm(true);
        }}
      />
      <Paginacion
      paginaActual={paginaActual}
      totalPaginas={totalPaginas}
      cambiarPagina={cambiarPagina}/>
      {/* Botón Crear Cliente */}
      {/* Formulario Modal */}
      {mostrarForm && (
        <Formulario
          clienteEdit={clienteEdit}
          cerrar={() => setMostrarForm(false)}
          guardarCliente={guardarCliente}
          restablecerContrasena={restablecerContrasena}
        />
      )}
    </div>
  )   
}