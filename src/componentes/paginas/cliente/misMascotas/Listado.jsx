// MisMascotas/Listado.jsx
export default function Listado({ mascotas, onEditar }) {
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
              <td>{m.nombre}</td>
              <td>{m.nombre_especie}</td>
              <td>{m.nombre_raza}</td>
              <td>{m.sexo}</td>
              <td>{m.fecha_nacimiento}</td>
              <td>{m.altura}</td>
              <td>{m.peso}</td>

              <td>
                <button onClick={() => onEditar(m)} className="btn-edit" >
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
