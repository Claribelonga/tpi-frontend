// Recibe la lista de clientes como prop
export default function Listado({ clientes, onEditar }){ 
    return(
        <div className="listado-clientes-container">
            <span>Clientes Registrados</span>
            {clientes.length > 0 ? (
                <table className="tabla">
                    <thead className="thead">
                        <tr>
                            <th>Nombre</th>
                            <th>Apelllido</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Direcciones</th>
                            <th>Teléfono</th>
                            <th>Mascotas</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id_persona}>
                                <td data-label="Nombre">{cliente.nombre}</td>
                                <td data-label="Apellido">{cliente.apellido}</td>
                                <td data-label="dni">{cliente.dni}</td>
                                <td data-label="Email">{cliente.usuario?.email}</td>
                                <td data-label="Dirección">{cliente.direccion.calle} {cliente.direccion.numero}
                                    {cliente.direccion.piso ? `, Piso ${cliente.direccion.piso}` : ""}
                                    {cliente.direccion.departamento ? `, Dto ${cliente.direccion.departamento}` : ""}</td>
                                <td data-label="Teléfono">{cliente.telefono}</td>
                                <td data-label="Mascotas"> {cliente.mascotas.length > 0
                                        ? cliente.mascotas.map(m => m.nombre).join(", ")
                                        : "Sin mascotas"}</td>
                                <td>
                                    <button onClick={() => onEditar(cliente)}><img src="/img/lapiz.png" alt="lapiz" className="icono"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay clientes registrados.</p>
            )}
            </div>
    )
}