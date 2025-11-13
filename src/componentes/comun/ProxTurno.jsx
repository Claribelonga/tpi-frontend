import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";

export default function ProximoTurno() {
  //const [turno, setTurno] = useState(null);

  const [turno, setTurno] = useState({
  fecha: "Miércoles, 10 de octubre",
  hora: "12:00hs",
  servicio: "Consulta general",
  veterinario: "Dr. López",
});

  // useEffect(() => {
  //   const idCliente = 1;
  //   axios
  //     .get(`https://api-vetsur.com/turnos/ultimo/${idCliente}`)
  //     .then((res) => setTurno(res.data))
  //     .catch((err) => console.error("Error al obtener el turno", err));
  // }, []);

  if (!turno) {
    return (
      <div className="sin-turno">
        <p>No tenes turnos próximos agendados</p>
        <Link href="/cliente/sacarTurno/Main">
        <button className="btn-violeta">Sacar Turno</button>
        </Link>
      </div>
    );
  }

   return (
    <div className="contenedor-turno">
      <div className="card-turno">
        <div className="info-turno">
          <p className="titulo-turno">Próximo turno</p>
          <p className="texto-turno">{turno.fecha}</p>
          <p className="texto-turno">{turno.hora}</p>
        </div>
        <button className="btn-violeta">Cancelar</button>
      </div>

      <Link href="/cliente/mis-turnos">
        <button className="btn-violeta grande">Ver Todos Mis Turnos</button>
      </Link>
    </div>
  );
  // return (
  //   <div className="">
  //     <div className="">
  //       <div>
  //         <p className="">Próximo turno</p>
  //         <p className="">
  //           {turno.fecha} - {turno.hora}
  //         </p>
  //         <p className="">
  //           Servicio: {turno.servicio} · {turno.veterinario}
  //         </p>
  //       </div>
  //       <button className="btn-violeta">
  //         Cancelar
  //       </button>
  //     </div>

  //     <Link href="/cliente/mis-turnos">
  //       <button className="btn-violeta">
  //         Ver todos mis turnos
  //       </button>
  //     </Link>
  //   </div>
  // );
}
