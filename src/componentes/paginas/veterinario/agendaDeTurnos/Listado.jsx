import { useState, useEffect } from "react";
import axios from "axios";

export default function Listado({ turnos = [], onSeleccionar }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [estados, setEstados] = useState({});
  const token = sessionStorage.getItem("token");

  // recalcular estados cada vez que cambie turnos
  useEffect(() => {
    const nuevosEstados = turnos.reduce((acc, t) => {
      // la BD ya devuelve "pendiente" o "finalizado"
      acc[t.id_turno] = t.estado;
      return acc;
    }, {});
    setEstados(nuevosEstados);
  }, [turnos]);

  if (!turnos.length) {
    return <p>No hay turnos disponibles</p>;
  }

  const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  };

  const formatearHora = (horaStr) => (horaStr ? horaStr.slice(0, 5) : "");

  // Alternar estado con backend
  const toggleEstado = async (id) => {
    const nuevoEstado = estados[id] === "pendiente" ? "finalizado" : "pendiente";

    try {
      const config = { headers: { Authorization: token } };
      await axios.put(
        "http://localhost:5000/api/turnos/modificarestado",
        { id_turno: id, estado: nuevoEstado },
        config
      );

      // si se actualizó bien en backend, reflejamos en frontend
      setEstados((prev) => ({
        ...prev,
        [id]: nuevoEstado,
      }));
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      alert("No se pudo actualizar el estado del turno");
    }
  };

  return (
    <div className="listadoTurnoVete">
      {turnos.map((t) => (
        <div
          key={t.id_turno}
          className={`tarjetaTurnoVete ${seleccionado === t.id_turno ? "seleccionada" : ""}`}
          onClick={() => {
            setSeleccionado(t.id_turno);
            onSeleccionar(t);
          }}
        >
          <p className="tarjetaServicioVete">{t.nombre_servicio}</p>

          <div className="tarjetaInfoVete">
            <span>Mascota: {t.nombre_mascota}</span>
            <span>Fecha: {formatearFecha(t.fecha)}</span>
          </div>

          <div className="tarjetaHoraEstadoVete">
            <p className="tarjetaHoraVete">Hora: {formatearHora(t.hora)}</p>
            <div className="tarjetaEstadoVete">
              <button
                className={`btn-estado ${estados[t.id_turno]}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEstado(t.id_turno);
                }}
              >
                {estados[t.id_turno] === "pendiente" ? "Pendiente" : "Finalizado"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
