import { useState, useEffect } from "react";

export default function Listado({ turnos = [], onSeleccionar }) {
  const [seleccionado, setSeleccionado] = useState(null);
  const [estados, setEstados] = useState({});

  // recalcular estados cada vez que cambie turnos
  useEffect(() => {
    const nuevosEstados = turnos.reduce((acc, t) => {
      acc[t.id_turno] = t.estado; // 
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
              {/* 👇 ahora solo muestra el estado, sin modificar */}
              <button className={`btn-estadoVeterinario ${estados[t.id_turno]}`} disabled>
                {estados[t.id_turno] === "pendiente" ? "Pendiente" : "Finalizado"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
