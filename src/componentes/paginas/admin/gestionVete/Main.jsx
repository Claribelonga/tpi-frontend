import Formulario from "./Formulario";
import Listado from "./Listado";
import { useState, useEffect } from "react";
import axios from "axios";
// import Buscador from "./Buscador"

export default function Main(){

    return(
        <div>
            <Formulario/>
            <Listado/>
        </div>
    )
}