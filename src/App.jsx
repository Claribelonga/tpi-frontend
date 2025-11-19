import { Router, Route, Redirect, Link } from "wouter";
import { useState, useEffect } from "react";
//componentes comunes:
import Menu from "./componentes/comun/Menu";
// import PantallaGeneral from "./componentes/comun/PantallaGeneral";
import Inicio from "./componentes/comun/Inicio";
//login y registro:
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
//Pantallas segun rol: 
import GestionCliente from "./componentes/paginas/admin/gestionCliente/Main"
import GestionVete from "./componentes/paginas/admin/gestionVete/Main"
import GestionEspe from "./componentes/paginas/admin/gestionEspecialidades/Main"
import GestionServicios from "./componentes/paginas/admin/gestionServicios/Main"
//Pantallas de veterinario:
import AgendaTurnos from "./componentes/paginas/veterinario/agendaDeTurnos/Main"
import Diagnosticos from "./componentes/paginas/veterinario/diagnosticos/Main"
import MiPefil from "./componentes/paginas/veterinario/miPerfil/Main"
import Pacientes from "./componentes/paginas/veterinario/pacientes/Main"

//estilos:
import './App.css'
//usar un switch para meter todas las rutas
//el menu deberia estar aca fijo y cuando se logee recien mostrar el menu

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [rol, setRol] = useState(Number(sessionStorage.getItem("rol")));
  // const [token, setToken] = useState("admin@gmail.com")
  // const [rol, setRol] = useState(1)
  const [mensaje, setMensaje] = useState("");

  //cuando cambia el token en sessionStorage, actualizamos el estado
  useEffect(() => {
    const updateSession = () => {
      const storedToken = sessionStorage.getItem("token");
      const storedRol = Number(sessionStorage.getItem("rol"));
      setToken(storedToken);
      setRol(storedRol);
    };

    //escuchamos un evento personalizado que dispararemos desde login/logout
    window.addEventListener("sessionChange", updateSession);

    return () => {
      window.removeEventListener("sessionChange", updateSession);
    };
  }, []);

  //mensajes de bienvenida
  useEffect(() => {
    if (token && rol) {
      if (rol === 1) setMensaje("Bienvenido al panel de administración");
      else if (rol === 2) setMensaje("Bienvenido al panel del veterinario");
      else if (rol === 3) setMensaje("Bienvenido al panel del cliente");

      setTimeout(() => setMensaje(""), 4000);
    }
  }, [token, rol]);

  return (
     <div className="App">
       <Router>
        {/* Rutas públicas (sin menú) */}
        {!token ? (
          <>
            <Route path="/login"><InicioSesion /></Route>
            <Route path="/registrarse"><Registrarse /></Route>
            <Route path="/"><Redirect to="/login" /></Route>
          </>
        ) : (
          /* Layout general con menú y contenido */
          <div className="layout">
            <div className="menu-lateral">
              <Menu rol={rol}/>
            </div>
            <div className="area-contenido">
               {mensaje && (
                <div className="mensaje-bienvenida">
                  {mensaje}
                </div>
              )}
              <Route path="/inicio"><Inicio /></Route>

              {/* ADMIN */}
              {rol === 1 && (
                <>
                  <Route path="/gestionCliente"><GestionCliente /></Route>
                  <Route path="/gestionServicios"><GestionServicios /></Route>
                  <Route path="/gestionVete"><GestionVete /></Route>
                  <Route path="/gestionEspe"><GestionEspe /></Route>
                </>
              )}

              {/* VETERINARIO */}
              {rol === 2 && (
                <>
                  <Route path="/agendaDeTurnos"><AgendaTurnos /></Route>
                  <Route path="/diagnosticos"><Diagnosticos /></Route>
                  <Route path="/miPerfil"><MiPefil /></Route>
                  <Route path="/pacientes"><Pacientes /></Route>
                </>
              )}

              {/* CLIENTE */}
              {rol === 3 && (
                
                <Route path="/cliente">
                  <h2>Pantalla Cliente</h2>
                </Route>
                
              )}
            </div>
          </div>
        )}
      </Router>
     </div>
  )
}

export default App