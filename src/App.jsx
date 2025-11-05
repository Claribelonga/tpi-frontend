import { Router, Route, Redirect, Link } from "wouter";
import { useState, useEffect } from "react";
//componentes comunes:
import Menu from "./componentes/comun/Menu";
import PantallaGeneral from "./componentes/comun/PantallaGeneral";
import Inicio from "./componentes/comun/Inicio";
//login y registro:
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
//Pantallas segun rol: 
import GestionCliente from "./componentes/paginas/admin/gestionCliente/Main"
import GestionVete from "./componentes/paginas/admin/gestionVete/Main"
import GestionEspe from "./componentes/paginas/admin/gestionEspecialidades/Main"
import GestionServicios from "./componentes/paginas/admin/gestionServicios/Main"

//estilos:
import './App.css'
//usar un switch para meter todas las rutas
//el menu deberia estar aca fijo y cuando se logee recien mostrar el menu

function App() {
  const token = sessionStorage.getItem("token");
  const rol = Number(sessionStorage.getItem("rol")); // lo guardamos como número
   // Estado del token y del rol
  // const [token, setToken] = useState(sessionStorage.getItem("token"));
  // const [rol, setRol] = useState(sessionStorage.getItem("rol"));

  // Este efecto se dispara cuando cambian los valores en sessionStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(sessionStorage.getItem("token"));
      setRol(sessionStorage.getItem("rol"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
              <Route path="/inicio"><PantallaGeneral /></Route>

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
                <Route path="/veterinario">
                  <h2>Pantalla Veterinario</h2>
                </Route>
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

      {/* <Router>

        <Route path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/login">
        <InicioSesion />
        </Route>

        <Route path="/registrarse">
        <Registrarse /> //el profe dijo que era mejor asi que con component ya que por aca le pasarias las props o params(aunque no se de que )
        </Route> 

        <Route path="/inicio" component={PantallaGeneral} />

        <Route path="/gestionCliente" component={GestionCliente} />
        
        <Route path="/gestionVete" component={GestionVete} />

        <Route path="/gestionServicios" component={GestionServicios} />

        <Route path="/gestionEspe" component={GestionEspe}/>
      </Router> */}