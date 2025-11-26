export default function Listado({ veterinarios, onEditar }) {
  return (
    <div className="listado-clientes-container">
      <span>Listado de Veterinarios</span>
      {veterinarios.length === 0 ? (
        <p>No hay veterinarios registrados</p>
      ) : (
        <table className="tabla">
          <thead className="thead">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Email</th>
              <th>Direccion</th>
              <th>Teléfono</th>
              <th>Matrícula</th>
              <th>Especialidad</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {veterinarios.map((v) => (
              <tr key={v.usuario.id_usuario}>
                <td data-label="Nombre">{v.nombre}</td>
                <td data-label="Apellido">{v.apellido}</td>
                <td data-label="dni">{v.dni}</td>
                <td data-label="Email">{v.usuario.email}</td>
                <td data-label="Direccion">{v.direccion.calle} {v.direccion.numero}
                    {v.direccion.piso ? `, Piso ${v.direccion.piso}` : ""}
                    {v.direccion.departamento ? `, Dto ${v.direccion.departamento}` : ""}</td>
                <td data-label="Teléfono">{v.telefono}</td>
                <td data-label="Matrícula">{v.matricula}</td>
                <td data-label="Especialidad">{v.especialidad?.nombre || "-"}</td>
                <td>
                  <button onClick={() => onEditar(v)} >
                    <img src="/img/lapiz.png" alt="lapiz" className="icono"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
// export default function Listado({ veterinarios, onEditar }) {
//   return (
//     <div>
//       <span>Listado de Veterinarios</span>
//       {veterinarios.length === 0 ? (
//         <p>No hay veterinarios registrados</p>
//       ) : (
//         <div className="cards-container">
//           {veterinarios.map((v) => (
//             <div className="card" key={v.usuario.id_usuario}>
//               <div className="card-info">
//                 <p><strong>Nombre:</strong> {v.nombre}</p>
//                 <p><strong>Apellido:</strong> {v.apellido}</p>
//                 <p><strong>Documento:</strong> {v.dni}</p>
//                 <p><strong>Email:</strong> {v.usuario.email}</p>
//                 <p><strong>Dirección:</strong>{v.direccion.calle} {v.direccion.numero}
//                 {v.direccion.piso ? `, Piso ${v.direccion.piso}` : ""}
//                 {v.direccion.departamento ? `, Dto ${v.direccion.departamento}` : ""} </p>
//                 <p><strong>Teléfono:</strong> {v.telefono}</p>
//                 <p><strong>Matrícula:</strong> {v.matricula}</p>
//                 <p><strong>Especialidad:</strong> {v.especialidad?.nombre || "-"}</p>
//               </div>
//               <div className="card-actions">
//                 <button className="btn-edit" onClick={() => onEditar(v)}>
//                   <img src="/img/lapiz.png" alt="lapiz" className="icono"/>
//                   Editar
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
