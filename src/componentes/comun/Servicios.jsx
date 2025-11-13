import { useState } from "react";
const servicios = [
  {nombre: "Peluquería", precio:"$3000"},
  {nombre: "Cirugía", precio:"$3000"},
  {nombre: "Vacunación", precio:"$3000"},
  {nombre: "Analisis", precio:"$3000"},
  {nombre: "Ecografia", precio:"$3000"},
  {nombre: "Revición", precio:"$3000"}
];

export default function Servicios(){
  return(
    <div className="servicios-container">
      <h3 className="titulo-servicio">Nuestros Servicios</h3>

      <div className="grid-servicios">
        {servicios.map((servicio, i) => (
          <div key={i} className="card-servicio">
            <div className="icono-servicio">
              <img src="/img/corazon.png" alt="corazon" className="serv-img"/>
            </div>
            <p className="nombre-servicio">{servicio.nombre}</p>
            <p className="precio-servicio">{servicio.precio}</p>
          </div>
        ))}
      </div>
    </div>
  )
}