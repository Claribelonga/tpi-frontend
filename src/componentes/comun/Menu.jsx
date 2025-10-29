import { Link } from "wouter"

export default function Menu() {
  return (
    <div className="sidebar">
      <div className="Logo">
        <img src="/img/logoVetSur.png" alt="logoVioleta" className="logo"></img>
        <span className="vet">Vet</span><span className="sur">Sur</span>
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
            <Link href="/login" className="menu-item salir">
            <img src="/img/salida.png" alt="home" className="icono"></img>
            Salir</Link>
        </div>
        
        
      </nav>
    </div>
  );
}

