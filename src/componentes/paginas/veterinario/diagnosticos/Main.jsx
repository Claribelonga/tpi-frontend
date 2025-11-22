import { useState, useEffect } from "react";
import axios from "axios";
import Listado from "./Listado";
import Buscador from "./Buscador";

export default function Main() {
    return (
        <>
       <Buscador/>
       <Listado/>
       
       </>
    )
}