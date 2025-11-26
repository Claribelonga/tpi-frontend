export default function Listado({servicios, onEditar, onCambiarEstado}){
    return(
         <div className="listado-clientes-container">
            <span>Servicios Registrados</span>
            <div className="tabla">
                <table>
                    <thead className="thead">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.id_servicio}>
                                <td data-label="Nombre">{servicio.nombre}</td>
                                <td data-label="Precio">{servicio.precio}</td>
                                <td>
                                    <button onClick={() => onCambiarEstado(servicio.id_servicio, servicio.estado)} className={servicio.estado === 1 ? "btn-estado activo" : "btn-estado inactivo"}>
                                        {servicio.estado === 1 ? "Activo" : "Inactivo"}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => onEditar(servicio)}>Editar   <img src="/img/lapiz.png" alt="lapiz" className="icono"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}