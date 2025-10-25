import { Router, Route, Redirect, Link } from "wouter";
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
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
      </Router>
      </div>
  )
}

export default App
