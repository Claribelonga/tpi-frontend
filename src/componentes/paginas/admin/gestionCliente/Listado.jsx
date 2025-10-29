// src/componentes/paginas/admin/gestionCliente/Listado.jsx

// Recibe la lista de clientes como prop
export default function Listado({ clientes }){ 
    return(
        <div className="listado-clientes-container">
            <h3>Clientes Registrados ({clientes.length})</h3>
            
            {/* 🚨 CLAVE: Mapear y mostrar la lista */}
            {clientes.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}> {/* Asegúrate de usar un ID único */}
                                <td>{cliente.id}</td>
                                <td>{cliente.nombre} {cliente.apellido}</td>
                                <td>{cliente.dni}</td>
                                <td>{cliente.email}</td>
                                <td><button>Editar</button> <button>Eliminar</button></td>
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