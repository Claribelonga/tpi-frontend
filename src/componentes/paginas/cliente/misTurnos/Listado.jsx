export default function Listado({ turnos }) {
  return (
    <div className="listado-turnos">
      {turnos.map(t => (
        <div className="card-historial" key={t.id_turno}>
          <p><b>🐾 {t.nombre_mascota}</b></p>
          <p>{t.servicio}</p>
          <p>Vet.: {t.veterinario}</p>
          <p>Fecha: {t.fecha} | {t.hora}</p>
        </div>
      ))}
    </div>
  );
}
