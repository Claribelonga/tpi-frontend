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

    return (
    <div>
      <h3 className="">
        Nuestros Servicios
      </h3>
      <div className="">
        {servicios.map((servicio, i) => (
          <div
            key={i}
            className="">
            <div className="">
              <span className="">✂️</span>
            </div>
            <p className="">{servicio.nombre}</p>
            <p>{servicio.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}