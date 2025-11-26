// MisMascotas/Listado.jsx
export default function Listado({ mascotas, onEditar }) {
  const formatearFecha = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear(); // ← si querés año completo
  return `${dia}/${mes}/${anio}`;
};
  return (
    <div className="listado-clientes-container">
      <table className="tabla">
        <thead className="thead">
          <tr>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Sexo</th>
            <th>Fecha de Nacimiento</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Editar</th> 
          </tr>
        </thead>

        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id_mascota}>
              <td data-label="Nombre">{m.nombre}</td>
              <td data-label="Especie">{m.nombre_especie}</td>
              <td data-label="Raza">{m.nombre_raza}</td>
              <td data-label="Sexo">{m.sexo}</td>
              <td data-label="Fec.Nacimiento">{formatearFecha(m.fecha_nacimiento)}</td>
              <td data-label="Altura">{m.altura} cm</td>
              <td data-label="Peso">{m.peso} kg</td>

              <td>
                <button onClick={() => onEditar(m)} >
                  <img src="/img/lapiz.png" alt="lapiz" className="icono"/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
