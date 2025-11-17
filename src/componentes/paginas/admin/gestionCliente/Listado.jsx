// Recibe la lista de clientes como prop
export default function Listado({ clientes, onEditar }){ 
    return(
        <div className="listado-clientes-container">
            <span>Clientes Registrados</span>
            <div className="tabla">
            {clientes.length > 0 ? (
                <table className="tabla">
                    <thead className="thead">
                        <tr>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Direcciones</th>
                            <th>Teléfono</th>
                            <th>Mascotas</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id_persona}>
                                <td data-label="Nombre">{cliente.nombre} {cliente.apellido}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.usuario?.email}</td>
                                <td>{cliente.direccion.calle} {cliente.direccion.numero}
                                    {cliente.direccion.piso ? `, Piso ${cliente.direccion.piso}` : ""}
                                    {cliente.direccion.departamento ? `, Dto ${cliente.direccion.departamento}` : ""}</td>
                                <td>{cliente.telefono}</td>
                                <td> {cliente.mascotas.length > 0
                                        ? cliente.mascotas.map(m => m.nombre).join(", ")
                                        : "Sin mascotas"}</td>
                                <td>
                                    <button className="btn-edit" onClick={() => onEditar(cliente)}>Editar   <img src="/img/lapiz.png" alt="lapiz" className="icono"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay clientes registrados.</p>
            )}
            </div>
        </div>
    )
}