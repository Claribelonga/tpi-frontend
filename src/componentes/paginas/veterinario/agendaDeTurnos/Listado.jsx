import { useState } from "react";

export default function Listado({ turnos = [], onSeleccionar }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [estados, setEstados] = useState(
    turnos.reduce((acc, t) => {
      acc[t.id_turno] = t.estado === 1 ? "pendiente" : "finalizado";
      return acc;
    }, {})
  );

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

  // Alternar estado
  const toggleEstado = (id) => {
    setEstados((prev) => ({
      ...prev,
      [id]: prev[id] === "pendiente" ? "finalizado" : "pendiente",
    }));
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
                  e.stopPropagation(); // evita que seleccione la tarjeta al clickear el botón
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
