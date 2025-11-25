import { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./Formulario";
import useUsuario from "../../../../hooks/useUsuario";
import Mensaje from "../../../comun/Mensaje";
import useMensaje from "../../../../hooks/useMensaje";

export default function Main() {
  const { datos, setDato, limpiarInputs, errores, validarTodo } = useUsuario();
  const [perfil, setPerfil] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const {
    textoMensaje,
    tipoMensaje,
    visible,
    mostrarMensaje
  } = useMensaje();
  const token = sessionStorage.getItem("token");
  const URL_PERFIL = "http://localhost:5000/api/veterinarios/perfil";
  const URL_EDITAR = "http://localhost:5000/api/veterinarios/editarperfil";

  // Obtener perfil veterinario
  const obtenerPerfil = () => {
    const config = { headers: { Authorization: token } };

    axios.get(URL_PERFIL, config)
      .then(resp => {
        setPerfil(resp.data);
        // Inicializar useUsuario con los datos obtenidos
        for (const campo in datos) {
          if (resp.data[campo] !== undefined) {
            setDato(campo, resp.data[campo]);
          }
        }
      })
      .catch(err => console.error("Error al obtener perfil:", err));
  };

  // Actualizar perfil veterinario
  const actualizarPerfil = (e) => {
    e.preventDefault()
    if (!validarTodo()) {
      alert("Por favor corrige los errores antes de guardar");
      return;
    }

    const config = { headers: { Authorization: token } };
    axios.put(URL_EDITAR, datos, config)
      .then(() => {
        mostrarMensaje("Perfil actualizado correctamente", "exito");
        setShowModal(false);
        obtenerPerfil();
      })
      .catch(err => {
        console.error("Error al actualizar perfil:", err);
        mostrarMensaje("Ocurrió un error al actualizar el perfil","error");
      });
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  if (!perfil) return <p>Cargando perfil del veterinario...</p>;

  return (
    <div>
      <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
      <Formulario
        perfil={perfil}
        datos={datos}
        errores={errores}
        setDato={setDato}
        showModal={showModal}
        setShowModal={setShowModal}
        actualizarPerfil={actualizarPerfil}
      />
    </div>
  );
}