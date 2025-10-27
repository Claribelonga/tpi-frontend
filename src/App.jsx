import { Router, Route, Redirect, Link } from "wouter";
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
import PantallaGeneral from "./componentes/comun/PantallaGeneral";

// import Inicio from "./componentes/cliente/inicio"
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
      </Router>
      </div>
  )
}

export default App
