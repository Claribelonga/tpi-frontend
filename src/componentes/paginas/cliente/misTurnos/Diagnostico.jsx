export default function Diagnostico({ datos }) {
  return (
    <div className="panel-diagnostico">
      <h2 className="titulo-historial">Diagnóstico</h2>
      {!datos ? (
        <p className="sin-diagnostico">Este turno aún no tiene diagnóstico.</p>
      ) : (
        <div className="card-diagnostico">
          <p><strong>Diagnóstico:</strong> {datos.diagnostico}</p>
          <p><strong>Tratamiento:</strong> {datos.tratamiento}</p>
          <p><strong>Observaciones:</strong> {datos.observaciones}</p>
          <p><strong>Veterinario:</strong> {datos.veterinario}</p>
        </div>
      )}
    </div>
  );
}
