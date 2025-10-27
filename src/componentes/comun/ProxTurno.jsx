import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "wouter";

export default function ProximoTurno() {
  const [turno, setTurno] = useState(null);

  useEffect(() => {
    const idCliente = 1;
    axios
      .get(`https://api-vetsur.com/turnos/ultimo/${idCliente}`)
      .then((res) => setTurno(res.data))
      .catch((err) => console.error("Error al obtener el turno", err));
  }, []);

  if (!turno) {
    return (
      <div className="">
        <p>No tenes turnos próximos agendados</p>
        <Link href="/cliente/sacarTurno/Main">
        <button className="btn-violeta">Sacar Turno</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="">
      <div className="">
        <div>
          <p className="">Próximo turno</p>
          <p className="">
            {turno.fecha} - {turno.hora}
          </p>
          <p className="">
            Servicio: {turno.servicio} · {turno.veterinario}
          </p>
        </div>
        <button className="btn-violeta">
          Cancelar
        </button>
      </div>

      <Link href="/cliente/mis-turnos">
        <button className="btn-violeta">
          Ver todos mis turnos
        </button>
      </Link>
    </div>
  );
}
