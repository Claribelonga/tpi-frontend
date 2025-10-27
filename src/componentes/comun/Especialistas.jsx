import { useState } from "react";
const especialistas = [
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
];

export default function Especialistas(){
    return(
        <div>
            <h3>Nuestros Especialistas</h3>
            <div>
                {especialistas.map((esp,i) =>
                <div key={i}>
                    <img src="/img/veterinario.png" alt="perfilvete" />
                    <p>{esp.especialidad}</p>
                    <p>{esp.nombre}</p>
                </div>
                )}
            </div>
        </div>
    )
}