import { useState } from 'react'
import InicioSesion from "./componentes/logins/inicioSesion/Main"
import Registrarse from "./componentes/logins/registrarse/Main"
import './App.css'

function App() {

  return (
    <div className='App'>
      <InicioSesion/>
      <Registrarse></Registrarse>
    </div>
  )
}

export default App
