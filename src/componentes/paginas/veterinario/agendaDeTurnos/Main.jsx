import { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./Formulario";
import Filtros from "./Filtros";
import Listado from "./Listado";

export default function Main() {
  const [turnos, setTurnos] = useState([]);
  const [filtros, setFiltros] = useState({ servicio: "", fecha: "" });
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const token = sessionStorage.getItem("token");

  const obtenerTurnos = () => {
    const config = { headers: { Authorization: token } };
    const url = `http://localhost:5000/api/turnos/veterinario?servicio=${filtros.servicio}&fecha=${filtros.fecha}`;
    axios
      .get(url, config)
      .then((resp) => setTurnos(resp.data.turnos))
      .catch((err) => console.error(err));
  };

  // 👉 primera carga + refresco cada 10 segundos
  useEffect(() => {
    obtenerTurnos();

    const interval = setInterval(() => {
      obtenerTurnos();
    }, 10000); // refresca cada 10 segundos

    return () => clearInterval(interval); // limpiar al desmontar
  }, [filtros, token]);

  return (
    <div className="containerAgendaDeTurnos">
      <div className="leftColumna">
        <Filtros onChange={setFiltros} />
        <Listado
          turnos={turnos}
          onSeleccionar={(turno) => setTurnoSeleccionado(turno)}
        />
      </div>
      <div className="rightColumna">
          {turnoSeleccionado ? (
            <Formulario
              idMascota={turnoSeleccionado.id_mascota}
              idTurno={turnoSeleccionado.id_turno}
            />
          ) : (
            <p>Selecciona una tarjeta para ver la ficha de datos</p>
          )}
        </div>
    </div>
  );
}
