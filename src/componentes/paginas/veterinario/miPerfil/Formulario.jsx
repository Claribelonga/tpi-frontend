import { Link } from "wouter";

// Recibe el perfil (datos obtenidos por GET)
export default function Formulario({ perfil }) { 
    
    if (!perfil) {
        return <p>Cargando perfil...</p>;
    }

    // Desestructurar para simplificar el JSX
    const {
        nombre, apellido, email, dni, telefono,
        calle, numero, piso, departamento,
        matricula, nombre_especialidad
    } = perfil;

    return (
        <div className="PaginaRegistro">
            {/* Contenedor de la imagen y título */}
            <div className="ContenedorImagen">
                <p>Mi perfil</p>
                <img src="img/perro.jpg" alt="perro" className="perro" />
            </div>

            <div className="ContenedorForm">
                {/* Nota: Usar <div> en lugar de <form> es mejor si no hay submit */}
                <div className="FormContenedor">
                    
                    <h3>Datos personales</h3>
                    
                    {/* Nombre y Apellido: Usamos filaInputs para los inputMitad */}
                    <div className="filaInputs">
                        <input className="inputMitad" type="text" value={nombre || ''} readOnly />
                        <input className="inputMitad" type="text" value={apellido || ''} readOnly />
                    </div>
                    
                    <input className="inputGen" type="text" value={email || ''} readOnly />
                    <input className="inputGen" type="text" value={dni || ''} readOnly />
                    <input className="inputGen" type="text" value={telefono || ''} readOnly />
                    
                    <h3>Dirección</h3>
                    
                    {/* Dirección: Agrupamos en filaInputs, aunque sean inputGen, para mantener la consistencia */}
                    <div className="filaInputs">
                        {/* Calle y Número combinados */}
                        <input className="inputGen" type="text" value={`${calle || ''} ${numero || ''}`} readOnly />
                    </div>
                    
                    {/* Piso y Departamento (pueden ir en inputGen normal o agrupados si quieres usar inputMitad) */}
                    <input className="inputGen" type="text" value={piso || '-'} readOnly />
                    <input className="inputGen" type="text" value={departamento || '-'} readOnly />

                    <h3>Datos profesionales</h3>
                    
                    <input className="inputGen" type="text" value={matricula || ''} readOnly />
                    <input className="inputGen" type="text" value={nombre_especialidad || ''} readOnly />
                    
                </div>
            </div>
        </div>
    );
}