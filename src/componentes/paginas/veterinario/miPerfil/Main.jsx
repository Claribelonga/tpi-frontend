import { useState, useEffect } from "react";
import axios from "axios";
import Formulario from "./Formulario";

export default function Main() {
    const [perfil, setPerfil] = useState(null);
    const token = sessionStorage.getItem("token");

    const obtenerPerfil = () => {
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const url = "http://localhost:5000/api/veterinarios/perfil";
        axios.get(url, config)
            .then((resp) => {
                setPerfil(resp.data);
                console.log("Perfil del veterinario:", resp.data);
            })
            .catch((error) => {
                console.error("Error al obtener perfil:", error);
            });
    };

    useEffect(() => {
        obtenerPerfil();
    }, []);

    // 2. Manejo de estado de carga
    if (!perfil) {
        return <p>Cargando perfil del veterinario...</p>;
    }

    return (
        // 1. Corrección del nombre de la prop
        <Formulario perfil={perfil} />  
    );
}