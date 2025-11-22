import { useEffect, useState } from "react";
import Formulario from "./Formulario";
import axios from "axios";
import { useLocation } from "wouter";

export default function Main() {

  // navegación
  const [, setLocation] = useLocation();

  // token
  const token = sessionStorage.getItem("token");

  // -------------------------
  // ESTADOS
  // -------------------------
  const [mascotas, setMascotas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);

  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    estado: "Pendiente",
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

  // -------------------------
  // PETICIONES
  // -------------------------
  const urlMascotas = "http://localhost:5000/api/mascotas";
  const urlServicios = "http://localhost:5000/api/servicios/select";
  const urlVets = "http://localhost:5000/api/publico/veterinarios";
  const urlSacarTurno = "http://localhost:5000/api/turnos/sacarturno";

  const config = {
    headers: { Authorization: token }
  };

  // obtener mascotas del cliente logueado
  const obtenerMascotas = () => {
    axios.get(urlMascotas, config)
      .then(resp => {
        console.log(resp.data)
        setMascotas(resp.data.mascotas || []);
      })
      .catch(err => console.log(err));
  };

  // obtener servicios
  const obtenerServicios = () => {
    axios.get(urlServicios, config)
      .then(resp => {
        console.log("SERVICIOS:", resp.data);
        setServicios(resp.data)
    })
      .catch(err => console.log(err));
  };

  // obtener veterinarios
  const obtenerVeterinarios = () => {
    axios.get(urlVets, config)
      .then(resp => {
        console.log(resp.data.veterinarios)
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
      .then(() => {
        alert("Turno registrado correctamente");
        setLocation("/misTurnos");
      })
      .catch(error => {
        console.log(error);
        alert("Error al registrar turno");
      });
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="contenedor-turno">

      <Formulario
        turno={turno}
        onChangeDato={onChangeDato}
        mascotas={mascotas}
        servicios={servicios}
        veterinarios={veterinarios}
      />

      {/* Vista previa */}
      <div className="preview">
        <p>🐾 Mascota: {turno.id_mascota}</p>
        <p>🛠 Servicio: {turno.id_servicio}</p>
        <p>📅 Fecha: {turno.fecha}</p>
        <p>⏰ Hora: {turno.hora}</p>
        <p>👨‍⚕️ Veterinario: {turno.id_veterinario}</p>
      </div>

      <button className="btn-violeta" onClick={registrarTurno}>
        Confirmar Turno
      </button>
    </div>
  );
}
