import { Link } from "wouter";

// Recibe el perfil (datos obtenidos por GET)
export default function Formulario({ perfil }) { 
    
    if (!perfil) {
        return <p>Cargando perfil...</p>;
    }

    // Desestructurar para simplificar el JSX
    const {
        nombre, apellido, email, dni, telefono,
        calle, numero, piso, departamento
    } = perfil;

    return (
        <div className="PaginaRegistro">
            {/* Contenedor de la imagen y título */}
            <div className="ContenedorImagenH2">
            <h2 className="MiPerfilH2">Mi perfil</h2>
            <div className="ContenedorImagenPerfil">
                <img src="img/perfil.png" alt="usuario" className="perfil" />
            </div>
            </div>
            <div className="ContenedorForm">
                {/* Nota: Usar <div> en lugar de <form> es mejor si no hay submit */}
                <div className="FormContenedorPerfil">
                    
                    <h3 className="MiPerfilH3">Datos personales</h3>
                    
                    {/* Nombre y Apellido: Usamos filaInputs para los inputMitad */}
                    <div className="filaInputs">
                        <input className="inputMitadPerfil" type="text" value={nombre || ''} readOnly />
                        <input className="inputMitadPerfil" type="text" value={apellido || ''} readOnly />
                    </div>
                    
                    <input className="inputGenPerfil" type="text" value={email || ''} readOnly />
                    <input className="inputGenPerfil" type="text" value={dni || ''} readOnly />
                    <input className="inputGenPerfil" type="text" value={telefono || ''} readOnly />
                    
                    
                    {/* Dirección: Agrupamos en filaInputs, aunque sean inputGen, para mantener la consistencia */}
                    <div className="filaInputs">
                        {/* Calle y Número combinados */}
                        <input className="inputGenPerfil" type="text" value={`${calle || ''} ${numero || ''}`} readOnly />
                          <input className="inputGenPerfil" type="text" value={piso || '-'} readOnly />
                          <input className="inputGenPerfil" type="text" value={departamento || '-'} readOnly />
                    </div>
                </div>
            </div>
        </div>
    );
}