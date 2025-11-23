import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";

export default function ProximoTurno() {
  const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear(); // ← si querés año completo
  return `${dia}/${mes}/${anio}`;
};

  const [turno, setTurno] = useState(null);
  const [cargando, setCargando] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    obtenerProximoTurno();
  }, []);

  const obtenerProximoTurno = () => {
    const config = {
      headers: { Authorization: token }
    };

    axios.get("http://localhost:5000/api/turnos/proximo", config)
      .then((resp) => {
        console.log("Proximo turno:", resp.data);
        setTurno(resp.data.turno);
      })
      .catch((error) => {
        console.error(error);

        // Si es 404, significa que el cliente NO tiene turnos futuros
        if (error.response && error.response.status === 404) {
          setTurno(null);
        }
      })
      .finally(() => setCargando(false));
  };

  if (cargando) return <p>Cargando...</p>;  // opcional

  // 👉 No hay turnos
  if (!turno) {
    return (
      <div className="sin-turno">
        <p>No tenés turnos próximos agendados</p>
        <Link href="sacarTurno">
          <button className="btn-violeta">Sacar Turno</button>
        </Link>
      </div>
    );
  }

  // 👉 Hay turno
  return (
    <div className="contenedor-turno">
      <div className="card-turno">
        <div className="info-turno">
          <p className="titulo-turno">Próximo turno</p>

          {/* <p className="texto-turno">{turno.fecha}</p> */}
          <p>Fecha: {formatearFecha(turno.fecha)}</p>
          <p className="texto-turno">{turno.hora}</p>
          <p className="texto-turno">Mascota: {turno.nombre_mascota}</p>
        </div>

        <button className="btn-violeta">
          Cancelar
        </button>
      </div>

      <Link href="/misTurno">
        <button className="btn-violeta grande">Ver Todos Mis Turnos</button>
      </Link>
    </div>
  );
}
