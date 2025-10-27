import Navegador from './Menu';
import { Route } from "wouter";

export default function MainMenu() {
  return (
    <div style={{ display: "flex" }}>
      <Navegador />

      <div style={{ flex: 1, padding: "20px" }}>
        <Route path="/cliente/inicio">
          <h2>Inicio</h2>
        </Route>
        <Route path="/menu/perfil">
          <h2>Mi Perfil</h2>
        </Route>
        <Route path="/menu/mis-turnos">
          <h2>Mis Turnos</h2>
        </Route>
        <Route path="/menu/sacar-turno">
          <h2>Sacar Turno</h2>
        </Route>
        <Route path="/menu/contactos">
          <h2>Contactos</h2>
        </Route>
        <Route path="/menu/mis-mascotas">
          <h2>Mis Mascotas</h2>
        </Route>
      </div>
    </div>
  );
}
