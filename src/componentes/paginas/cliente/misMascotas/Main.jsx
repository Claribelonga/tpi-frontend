
import { useState, useEffect } from "react";
import Listado from "./Listado";
import Formulario from "./Formulario";
import Mensaje from "../../../comun/Mensaje";
import useMensaje from "../../../../hooks/useMensaje";
import axios from "axios";

export default function Main() {
  const {
    textoMensaje,
    tipoMensaje,
    visible,
    mostrarMensaje
    } = useMensaje();
  const token = sessionStorage.getItem("token");

  // Estados
  const [mascotas, setMascotas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [mascotaEdit, setMascotaEdit] = useState(null);
  const [cargando, setCargando] = useState(false);

  const [especies, setEspecies] = useState([]);
  const [razas, setRazas] = useState([]);

  // URLs en constantes
  const URL_ESPECIES = "http://localhost:5000/api/especies/";
  const URL_RAZAS = "http://localhost:5000/api/especies/razas";
  const URL_MASCOTAS = "http://localhost:5000/api/mascotas/";

  // CONFIG general (solo headers)
  const config = {
    headers: { Authorization: token }
  };

  // ===============================
  // Obtener especies
  // ===============================
  const obtenerEspecies = () => {
    axios.get(URL_ESPECIES, config)
      .then(res => {
        console.log("ESPECIES", res.data);
        setEspecies(res.data);
      })
      .catch(err => console.log("Error especies:", err));
  };

  // ===============================
  // Obtener razas según especie
  // ===============================
  const obtenerRazas = (idEspecie) => {
    axios.get(`${URL_RAZAS}?id_especie=${idEspecie}`, config)
      .then(res => {
        console.log("RAZAS", res.data);
        setRazas(res.data);
      })
      .catch(err => console.log("Error razas:", err));
  };

  // ===============================
  // Obtener mascotas del usuario
  // ===============================
  const obtenerMascotas = () => {
    setCargando(true);

    axios.get(URL_MASCOTAS, config)
      .then(res => {
        console.log(" MASCOTAS", res.data.mascotas);
        setMascotas(res.data.mascotas || []);
      })
      .catch(err => console.log("Error mascotas:", err))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    obtenerMascotas();
    obtenerEspecies();
  }, []);

  // ===============================
  // Guardar o editar mascota
  // ===============================
  const guardarMascota = (datos) => {
    console.log("📤 Enviando datos:", datos);

    const isEdit = !!datos.idMascota;

    const url = isEdit
      ? `${URL_MASCOTAS}editarmascota/${datos.idMascota}`
      : `${URL_MASCOTAS}nuevamascota`;

    const metodo = isEdit ? "put" : "post";

    setCargando(true);

    axios({ method: metodo, url, data: datos, headers: config.headers })
      .then(res => {
        mostrarMensaje(res.data, "exito");
        obtenerMascotas();
        setMostrarForm(false);
      })
      .catch(err => {
        console.log("error guardar:", err);
        mostrarMensaje("Error al guardar: " + (err.response?.data, "error"));
      })
      .finally(() => setCargando(false));
  };

  return (
    <div>
      <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
      <div className="misMascotas">
        <h2>Mis Mascotas</h2>

        <button
          className="btn-violeta"
          disabled={cargando}
          onClick={() => {
            setMascotaEdit(null);
            setMostrarForm(true);
          }}
        >
          <img src="/img/boton-agregar.png" className="icono" alt="" /> Agregar Mascota
        </button>
      </div>

      {cargando && <p>Cargando...</p>}

      <Listado mascotas={mascotas} onEditar={(m) => {
        setMascotaEdit(m);
        setMostrarForm(true);
      }} />

      {mostrarForm && (
        <Formulario
          mascota={mascotaEdit}
          especies={especies}
          razas={razas}
          obtenerRazas={obtenerRazas}
          cerrar={() => setMostrarForm(false)}
          onGuardar={guardarMascota}
        />
      )}
    </div>
  );
}
