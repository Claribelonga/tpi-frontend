import { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./Formulario";
import Filtros from "./Filtros";
import Listado from "./Listado";

export default function Main() {
  const [turnos, setTurnos] = useState([]);
  const [filtros, setFiltros] = useState({ servicio: "", fecha: "" });
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null); // turno activo
  const token = sessionStorage.getItem("token");

  const obtenerTurnos = () => {
    const config = { headers: { Authorization: token } };
    const url = `http://localhost:5000/api/turnos/veterinario?servicio=${filtros.servicio}&fecha=${filtros.fecha}`;
    axios
      .get(url, config)
      .then((resp) => setTurnos(resp.data.turnos))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    obtenerTurnos();
  }, [filtros, token]);

  return (
    <>
      <Filtros onChange={setFiltros} />
      <Listado
        turnos={turnos}
        onSeleccionar={(turno) => setTurnoSeleccionado(turno)} // pasamos callback
      />
      {turnoSeleccionado && (
        <Formulario
          idMascota={turnoSeleccionado.id_mascota}
          idTurno={turnoSeleccionado.id_turno}
        />
      )}
    </>
  );
}
