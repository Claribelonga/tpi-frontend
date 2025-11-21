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

  let menuItems;

  switch (rol) {
    case 1:
      menuItems = (
        <>
        <Link href="/inicio" className="menu-item">
            <img src="/img/casa.png" alt="home" className="icono" />
            Inicio
          </Link>
          <Link href="/gestionCliente" className="menu-item">
            <img src="/img/usuario.png" alt="clientes" className="icono" />
            Gestionar Clientes
          </Link>
          <Link href="/gestionVete" className="menu-item">
            <img src="/img/agenda.png" alt="veterinarios" className="icono" />
            Gestionar Veterinarios
          </Link>
          <Link href="/gestionServicios" className="menu-item">
            <img src="/img/mas.png" alt="servicios" className="icono" />
            Gestionar Servicios
          </Link>
        </>
      );
      break;
      case 2:
        menuItems = (
          <>
          <Link href="/inicio" className="menu-item">
            <img src="/img/casa.png" alt="home" className="icono" />
            Inicio
          </Link>
          <Link href="/miPerfil" className="menu-item">
            <img src="/img/usuario.png" alt="perfil" className="icono" />
            Mi Perfil
          </Link>
          <Link href="/agendaDeTurnos" className="menu-item">
            <img src="/img/agenda.png" alt="agenda" className="icono" />
            Ver Agenda de Turnos
          </Link>
          <Link href="/diagnosticos" className="menu-item">
            <img src="/img/pata.png" alt="diagnostico" className="icono" />
            Diagnósticos
          </Link>
        </>
        );
        break;
        case 3:
           menuItems = (
        <>
          <Link href="/inicio" className="menu-item">
            <img src="/img/casa.png" alt="home" className="icono" />
            Inicio
          </Link>
          <Link href="/miPerfil" className="menu-item">
            <img src="/img/usuario.png" alt="perfil" className="icono" />
            Mi Perfil
          </Link>
          <Link href="/misTurnos" className="menu-item">
            <img src="/img/agenda.png" alt="turnos" className="icono" />
            Mis Turnos
          </Link>
          <Link href="/sacarTurno" className="menu-item">
            <img src="/img/mas.png" alt="sacar" className="icono" />
            Sacar Turno
          </Link>
          <Link href="/misMascotas" className="menu-item">
            <img src="/img/pata.png" alt="mascotas" className="icono" />
            Mis Mascotas
          </Link>
        </>
        )
  }
  return (
    <div className="sidebar">
      <div className="Logo">
        <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
        <h5 className="vet">Vet</h5><h5 className="sur">Sur</h5>
      </div>

      <nav className="menu">
        <div className="superior">
          {menuItems}
        </div>
        <div className="inferior">
          <Link className="menu-item" onClick={handleLogout}>
             <img src="/img/salida.png" alt="home" className="icono"></img>
             Cerrar Sesión
          </Link>
        </div>
      </nav>
    </div>
  );
}
