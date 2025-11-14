import { useState, useEffect } from "react";
import axios from "axios";

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

    if (!perfil) {
        return <p>Cargando perfil del veterinario...</p>;
    }

    return (
        <div>
            <h2>Perfil del Veterinario</h2>

            <section>
                <h3>Datos personales</h3>
                <p><strong>Nombre:</strong> {perfil.nombre} {perfil.apellido}</p>
                <p><strong>DNI:</strong> {perfil.dni}</p>
                <p><strong>Teléfono:</strong> {perfil.telefono}</p>
                <p><strong>Email:</strong> {perfil.email}</p>
            </section>

            <section>
                <h3>Dirección</h3>
                <p><strong>Calle:</strong> {perfil.calle} {perfil.numero}</p>
                {perfil.piso && <p><strong>Piso:</strong> {perfil.piso}</p>}
                {perfil.departamento && <p><strong>Departamento:</strong> {perfil.departamento}</p>}
            </section>

            <section>
                <h3>Datos profesionales</h3>
                <p><strong>Matrícula:</strong> {perfil.matricula}</p>
                <p><strong>Especialidad:</strong> {perfil.nombre_especialidad}</p>
            </section>
        </div>
    );
}
