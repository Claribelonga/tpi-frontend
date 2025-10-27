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
            <Link href="/menu/inicio" className="menu-item">
            <img src="/img/casa.png" alt="home" className="icono"></img>
            Inicio</Link>
            <Link href="/menu/perfil" className="menu-item">
            <img src="/img/usuario.png" alt="home" className="icono"></img>
            Mi Perfil</Link>
            <Link href="/menu/mis-turnos" className="menu-item">
            <img src="/img/agenda.png" alt="home" className="icono"></img>
            Mis Turnos</Link>
            <Link href="/menu/sacar-turno" className="menu-item">
            <img src="/img/mas.png" alt="home" className="icono"></img>
            Sacar Turno</Link>
            <Link href="/menu/mis-mascotas" className="menu-item">
            <img src="/img/pata.png" alt="patita" className="icono"></img>
            Mis Mascotas</Link>
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

