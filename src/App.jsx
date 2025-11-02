import { Router, Route, Redirect, Link } from "wouter";
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
import PantallaGeneral from "./componentes/comun/PantallaGeneral";
import Inicio from "./componentes/comun/Inicio"
import GestionCliente from "./componentes/paginas/admin/gestionCliente/Main"
import GestionVete from "./componentes/paginas/admin/gestionVete/Main"
import GestionEspe from "./componentes/paginas/admin/gestionEspecialidades/Main"
import GestionServicios from "./componentes/paginas/admin/gestionServicios/Main"
import './App.css'

function App() {

  return (
     <div className="App">
      <Router>
        <Route path="/">
          <Redirect to="/login" />
        </Route>

        <Route path="/login" component={InicioSesion} />

        <Route path="/registrarse" component={Registrarse} />

        <Route path="/inicio" component={PantallaGeneral} />

        <Route path="/gestionCliente" component={GestionCliente} />
        
        <Route path="/gestionVete" component={GestionVete} />

        <Route path="/gestionServicios" component={GestionServicios} />

        <Route path="/gestionEspe" component={GestionEspe}/>
      </Router>
      </div>
  )
}

export default App
