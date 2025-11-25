export default function Diagnostico({ datos }) {
  return (
    <div className="panel-diagnostico">
      <h2 className="titulo-historial">Diagnóstico</h2>
      {!datos ? (
        <div className="sinTurnoSeleccionado"> <p>Este turno aún no tiene diagnóstico.</p></div>
      ) : (
        <div className="card-diagnostico">
          <p><strong>Diagnóstico:</strong> {datos.diagnostico}</p>
          <p><strong>Tratamiento:</strong> {datos.tratamiento}</p>
          {/* SOLO SI HAY ARCHIVO ADJUNTO */}
          {datos.id_archivo && (
            <p>
              <strong>Archivo:</strong> {datos.nombre}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
