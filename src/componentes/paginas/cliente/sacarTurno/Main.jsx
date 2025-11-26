import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import Mensaje from "../../../comun/Mensaje";
import useMensaje from "../../../../hooks/useMensaje";
import axios from "axios";
// import { useLocation } from "wouter";

export default function Main() {
  // navegación
  // const [, setLocation] = useLocation();
  // token
  const token = sessionStorage.getItem("token");
  // estados
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const {
    textoMensaje,
    tipoMensaje,
    visible,
    mostrarMensaje
    } = useMensaje();
  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    estado: "pendiente",
    id_servicio: "",
    id_mascota: "",
    id_veterinario: ""
  });

  // Manejo del objeto turno
  const onChangeDato = (clave, valor) => {
    setTurno(prev => ({
      ...prev,
      [clave]: valor
    }));
  };

  // urls
  const urlMascotas = "http://localhost:5000/api/mascotas";
  const urlServicios = "http://localhost:5000/api/servicios/select";
  const urlVets = "http://localhost:5000/api/veterinarios/select";
  const urlSacarTurno = "http://localhost:5000/api/turnos/sacarturno";

  const config = {
    headers: { Authorization: token }
  };

  // obtener mascotas del cliente logueado
  const obtenerMascotas = () => {
    axios.get(urlMascotas, config)
      .then(resp => {
        // console.log(resp.data)
        setMascotas(resp.data.mascotas || []);
      })
      .catch(err => console.log(err));
  };

  // obtener servicios
  const obtenerServicios = () => {
    axios.get(urlServicios, config)
      .then(resp => {
        // console.log("SERVICIOS:", resp.data);
        setServicios(resp.data)
    })
      .catch(err => console.log(err));
  };

  // obtener veterinarios
  const obtenerVeterinarios = () => {
    axios.get(urlVets, config)
      .then(resp => {
        // console.log(resp.data.veterinarios)
        setVeterinarios(resp.data.veterinarios)
    })
      .catch(err => console.log(err));
  };

  // cargar info al entrar
  useEffect(() => {
    obtenerMascotas();
    obtenerServicios();
    obtenerVeterinarios();
  }, []);

  // -------------------------
  // CONFIRMAR TURNO
  // -------------------------
  const registrarTurno = () => {

    axios.post(urlSacarTurno, turno, config)
      .then((resp) => {
        mostrarMensaje("Turno registrado correctamente", "exito");
        // setTurno(resp.data.turno)
        // console.log("turno enviado:", resp.data)
        // setLocation("/misTurnos");
      })
      .catch(error => {
        console.log(error);
        mostrarMensaje("Error al registrar turno, complete el formulario", "error");
      });
  };

  return (
    <div className="contenedor-turno">
      <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
      <h2>Sacar Turno</h2>
      <Formulario
        turno={turno}
        onChangeDato={onChangeDato}
        mascotas={mascotas}
        servicios={servicios}
        veterinarios={veterinarios}
      />

      {/* Vista previa */}
      <div className="preview">
        <p>🐾 Mascota: {mascotas.find(m => m.id_mascota == turno.id_mascota)?.nombre || "—"}</p>
        <p>🛠 Servicio: {servicios.find(s => s.id_servicio == turno.id_servicio)?.nombre || "—"}</p>
        <p>📅 Fecha: {turno.fecha}</p>
        <p>⏰ Hora: {turno.hora}</p>
        <p>👨‍⚕️ Veterinario: {
      veterinarios.find(v => v.id_veterinario == turno.id_veterinario)
        ? `${veterinarios.find(v => v.id_veterinario == turno.id_veterinario).nombre_veterinario}
           ${veterinarios.find(v => v.id_veterinario == turno.id_veterinario).apellido_veterinario}`
        : "—"
    }</p>
      </div>
      <button className="btn-violeta" onClick={registrarTurno}>
        Confirmar Turno
      </button>
    </div>
  );
}
