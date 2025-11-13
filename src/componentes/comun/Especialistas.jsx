import { useState } from "react";
const especialistas = [
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
  { nombre: "Dr. Lopez Rosetti", especialidad: "Cirujano" },
];

export default function Especialistas(){
    return(
        <div className="servicios-container">
            <h3 className="titulo-servicio">Nuestros Especialistas</h3>
            <div className="grid-servicios">
                {especialistas.map((esp,i) =>
                <div key={i} className="card-vete">
                    <div className="img-vete">
                        <img src="/img/veterinario.png" alt="perfilvete" className="vete-img"/>
                    </div>
                    <p className="nombre-servicio">{esp.especialidad}</p>
                    <p className="nombre-vete">{esp.nombre}</p>
                </div>
                )}
            </div>
        </div>
    )
}