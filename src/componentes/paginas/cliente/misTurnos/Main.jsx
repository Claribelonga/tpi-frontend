import Listado from "./Listado";
import ProximoTurno from "../../../comun/ProxTurno";
import Filtro from "../../../comun/Filtro";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [turnos, setTurnos] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [filtroMascota, setFiltroMascota] = useState("");

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    obtenerMascotas();
    obtenerTurnos();
  }, []);

  useEffect(() => {
    obtenerTurnos();
  }, [filtroMascota]);

  const obtenerMascotas = () => {
    const url= "http://localhost:5000/api/mascotas/";
    axios.get(url, {
      headers: { Authorization: token }
    })
    .then((resp) => {
      setMascotas(resp.data.mascotas || []);
    })
    .catch((err) => console.error(err));
  };

  const obtenerTurnos = () => {
    const config = {
      headers: { Authorization: token },
      params: { id_mascota: filtroMascota }
    };
    const url= "http://localhost:5000/api/turnos/cliente";
    axios.get(url, config)
      .then((resp) => {
        setTurnos(resp.data.turnos || []);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <h2>Mis Turnos</h2>
      <div className="arriba-turno">
        <ProximoTurno/>
        <Filtro
        opciones={mascotas}
        onChange={(value) => setFiltroMascota(value)}
        textoDefault="Todas las mascotas"
        />
      </div>
      <Listado turnos={turnos} />
    </div>
  );
}