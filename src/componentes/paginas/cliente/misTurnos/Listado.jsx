import { useState } from "react";
export default function Listado({ turnos, onSeleccionar }) {
  const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear(); // ← si querés año completo
  return `${dia}/${mes}/${anio}`;
};
const formatearHora = (horaStr) => (horaStr ? horaStr.slice(0, 5) : "");

  const [seleccionado, setSeleccionado] = useState(null); 
  return (
    <div className="listadoTurnoVete">
      {turnos.map(t => (
        <div className={`tarjetaTurnoVete ${seleccionado === t.id_turno ? "seleccionada" : ""}`} key={t.id_turno} 
        onClick={() => {
          onSeleccionar(t.id_turno) 
          setSeleccionado(t.id_turno)}}>
          <p><b>🐾 {t.nombre_mascota}</b></p>
          <p>Vet.: {t.nombre_veterinario} {t.apellido_veterinario}</p>
          <p>Fecha: {formatearFecha(t.fecha)} | {formatearHora(t.hora)}</p>
          <p>Servicio: {t.nombre_servicio}</p>
        </div>
      ))}
    </div>
  );
}
