
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";
import Mensaje from "./Mensaje";
import useMensaje from "../../hooks/useMensaje";

export default function ProximoTurno() {
  const {
    textoMensaje,
    tipoMensaje,
    visible,
    mostrarMensaje
    } = useMensaje();

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  const formatearHora = (horaStr) => (horaStr ? horaStr.slice(0, 5) : "");
  const [turno, setTurno] = useState(null);
  const [cargando, setCargando] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    obtenerProximoTurno();
  }, []);

  const obtenerProximoTurno = () => {
    const config = { headers: { Authorization: token } };
    const URL_PROXIMO= "http://localhost:5000/api/turnos/proximo";
    axios.get(URL_PROXIMO, config)
      .then((resp) => {
        setTurno(resp.data.turno);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setTurno(null);
        }
      })
      .finally(() => setCargando(false));
  };

  // funcion para cancelar turno
  const cancelarTurno = (id_turno) => {
    if (!window.confirm("¿Seguro que querés cancelar este turno?")) return;
    const URL_CANCELAR = "http://localhost:5000/api/turnos/modificarestado";
    const config = { headers: { Authorization: token } };
    const body = { 
      id_turno: id_turno,
      estado: "cancelado"
    };
    axios.put(URL_CANCELAR, body, config)
      .then(() => {
        mostrarMensaje("El turno fue cancelado correctamente","exito");
        obtenerProximoTurno();
      })
      .catch((err) => {
        console.error("Error al cancelar turno:", err);
        mostrarMensaje("No se pudo cancelar el turno", "error");
      });
  };

  if (cargando) return <p>Cargando...</p>;

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

  return (
    <div className="contenedor-turno">
      <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
      <div className="card-turno">
        <div className="info-turno">
          <p className="titulo-turno">Próximo turno</p>

          <p>Fecha: {formatearFecha(turno.fecha)}</p>
          <p className="texto-turno">{formatearHora(turno.hora)}</p>
          <p className="texto-turno">Mascota: {turno.nombre_mascota}</p>
        </div>

        <button
          className="btn-violeta"
          onClick={() => cancelarTurno(turno.id_turno)}
        >
          Cancelar
        </button>
      </div>

      <Link href="/misTurnos">
        <button className="btn-violeta grande">Ver Todos Mis Turnos</button>
      </Link>
    </div>
  );
}
