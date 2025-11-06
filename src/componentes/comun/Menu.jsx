import { Link} from "wouter"
import { useLocation } from "wouter";
//estructura del menu compartida, un switch/ ifelse con 
export default function Menu({rol}) {

  const [, navigate] = useLocation();

  const handleLogout = () => {
    // 1️⃣ Borrar los datos del usuario
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    window.dispatchEvent(new Event("sessionChange"));
    // 2️⃣ Redirigir al login
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="Logo">
        <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
        <h5 className="vet">Vet</h5><h5 className="sur">Sur</h5>
      </div>

      <nav className="menu">
        <div className="superior">
            <Link href="/Inicio" className="menu-item">
            <img src="/img/casa.png" alt="home" className="icono"></img>
            Inicio</Link>
            <Link href="/gestionCliente" className="menu-item">
            <img src="/img/usuario.png" alt="home" className="icono"></img>
            Gestionar Clientes</Link>
            <Link href="/gestionVete" className="menu-item">
            <img src="/img/agenda.png" alt="home" className="icono"></img>
            Gestionar Veterinarios</Link>
            <Link href="/gestionServicios" className="menu-item">
            <img src="/img/mas.png" alt="home" className="icono"></img>
            Gestionar Servicios</Link>
            <Link href="/gestionEspe" className="menu-item">
            <img src="/img/pata.png" alt="patita" className="icono"></img>
            Gestionar Especilidades</Link>
        </div>
        <div className="inferior">
          <a className="menu-item salir" onClick={handleLogout}>
             <img src="/img/salida.png" alt="home" className="icono"></img>
             Cerrar Sesión
          </a>
        </div>
        
        
      </nav>
    </div>
  );
}

            // <Link href="/login" className="menu-item salir">
            // <img src="/img/salida.png" alt="home" className="icono"></img>
            // Salir</Link>
