import { Link} from "wouter"
import { useLocation } from "wouter";
import { useState } from "react";
//estructura del menu compartida, un switch/ ifelse con 
export default function Menu({rol, toggleMenu}) {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false); 
  const onLogout = () => {
    //  Borrar los datos del usuario
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("rol");
    window.dispatchEvent(new Event("sessionChange"));
    //  Redirigir al login
    navigate("/inicio");
  };

  let menuItems;

  switch (rol) {
    case 1:
      menuItems = (
        <>
        <Link href="/inicio" className="menu-item" onClick={toggleMenu}>
            <img src="/img/casa.png" alt="home" className="icono" />Inicio
          </Link>
          <Link href="/gestionCliente" className="menu-item" onClick={toggleMenu}>
            <img src="/img/usuario.png" alt="clientes" className="icono" />
            Gestionar Clientes
          </Link>
          <Link href="/gestionVete" className="menu-item" onClick={toggleMenu}>
            <img src="/img/agenda.png" alt="veterinarios" className="icono" />
            Gestionar Veterinarios
          </Link>
          <Link href="/gestionServicios" className="menu-item" onClick={toggleMenu}>
            <img src="/img/mas.png" alt="servicios" className="icono" />
            Gestionar Servicios
          </Link>
        </>
      );
      break;
      case 2:
        menuItems = (
          <>
          <Link href="/inicio" className="menu-item" onClick={toggleMenu}>
            <img src="/img/casa.png" alt="home" className="icono" />
            Inicio
          </Link>
          <Link href="/miPerfil" className="menu-item" onClick={toggleMenu}>
            <img src="/img/usuario.png" alt="perfil" className="icono" />
            Mi Perfil
          </Link>
          <Link href="/agendaDeTurnos" className="menu-item" onClick={toggleMenu}>
            <img src="/img/agenda.png" alt="agenda" className="icono" />
            Ver Agenda de Turnos
          </Link>
          <Link href="/diagnosticos" className="menu-item" onClick={toggleMenu}>
            <img src="/img/pata.png" alt="diagnostico" className="icono" />
            Diagnósticos
          </Link>
        </>
        );
        break;
        case 3:
           menuItems = (
        <>
          <Link href="/inicio" className="menu-item" onClick={toggleMenu}>
            <img src="/img/casa.png" alt="home" className="icono" />
            Inicio
          </Link>
          <Link href="/miPerfil" className="menu-item" onClick={toggleMenu}>
            <img src="/img/usuario.png" alt="perfil" className="icono" />
            Mi Perfil
          </Link>
          <Link href="/misMascotas" className="menu-item" onClick={toggleMenu}>
            <img src="/img/pata.png" alt="mascotas" className="icono" />
            Mis Mascotas
          </Link>
          <Link href="/sacarTurno" className="menu-item" onClick={toggleMenu}>
            <img src="/img/mas.png" alt="sacar" className="icono" />
            Sacar Turno
          </Link>
          <Link href="/misTurnos" className="menu-item" onClick={toggleMenu}>
            <img src="/img/agenda.png" alt="turnos" className="icono" />
            Mis Turnos
          </Link>
        </>
        )
  }
  return (
    <div className="sidebar">
      <div className="Logo" onClick={() => navigate("/inicio")}>
        <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
        <h5 className="vet">Vet</h5><h5 className="sur">Sur</h5>
      </div>

      <nav className="menu">
        <div className="superior">
          {menuItems}
        </div>
        <div className="inferior">
          <Link className="menu-item" onClick={onLogout}>
             <img src="/img/salida.png" alt="home" className="icono"></img>
             Cerrar Sesión
          </Link>
        </div>
      </nav>
    </div>
  );
}