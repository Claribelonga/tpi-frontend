import Listado from "./Listado";
import ProximoTurno from "../../../comun/ProxTurno";
import Filtro from "../../../comun/Filtro";
import Diagnostico from "./Diagnostico";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Main() {
  const [turnos, setTurnos] = useState([]);
  const [mascotas, setMascotas] = useState([])
  const [filtroMascota, setFiltroMascota] = useState("");
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [diagnostico, setDiagnostico] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    obtenerMascotas();
    obtenerTurnos();
  }, []);

  useEffect(() => {
    obtenerTurnos();
  }, [filtroMascota]);

  const obtenerMascotas = () => {
    const url= "http://localhost:5000/api/mascotas/";
    axios.get(url, {
      headers: { Authorization: token }
    })
    .then((resp) => {
      setMascotas(resp.data.mascotas || []);
    })
    .catch((err) => console.error(err));
  };

  const obtenerTurnos = () => {
    const config = {
      headers: { Authorization: token },
      params: { id_mascota: filtroMascota }
    };
    const url= "http://localhost:5000/api/turnos/cliente";
    axios.get(url, config)
      .then((resp) => {
        console.log(resp.data.turnos)
        setTurnos(resp.data.turnos || []);
      })
      .catch((err) => console.error(err));
  };
  
  //cuando hago click en un turno
  const onSeleccionar = (idTurno) => {
  setTurnoSeleccionado(idTurno);
  verDiagnostico(idTurno);
};

  // const onSeleccionar = (turno) => {
  //   setTurnoSeleccionado(turno);
  //   verDiagnostico(turno.id_turno);
  // };
  // Cuando el usuario hace click en un turno
  const verDiagnostico = (id) => {
    const url = "http://localhost:5000/api/diagnosticos/turno?id_turno=";
    const config = {
      headers: {Authorization: token}
    }
    axios
      .get(url + id, config)
      .then((res) => {
        if (res.data && res.data.diagnostico) {
          setDiagnostico(res.data.diagnostico);
        } else {
          setDiagnostico(null);
        }
      })
      .catch((err) => {
      //   if (err.response && err.response.status === 404) {
      //   // Si no hay diagnóstico, lo tratamos como null
      //   setDiagnostico(null);
      // } else {
      //   console.log("Error cargando diagnóstico:", err);
      //   alert("No se pudo cargar el diagnóstico");
      // }
        console.log("Error cargando diagnóstico:", err);
        alert("No se pudo cargar el diagnóstico");
      });
  };
  return (
    <div className="diagnosticos-container">
      <h2>Mis Turnos</h2>

      <div className="arriba-turno">
        <ProximoTurno />
        <div>

        <span>Filtro por mascota: </span>
        <Filtro
          // opciones={mascotas}
          // onChange={(value) => setFiltroMascota(value)}
          // textoDefault="Todas las mascotas"
          opciones={mascotas}
          onChange={(id) => setFiltroMascota(id)}
          textoDefault="Todas las mascotas"
          keyProp="id_mascota"
          labelProp="nombre"
        />
        </div>
      </div>

      <div className="containerAgendaDeTurnos">
        
        {/* IZQUIERDA: lista de turnos */}
        <div className="leftColumna">
          <Listado turnos={turnos} onSeleccionar={onSeleccionar} />
        </div>

        {/* DERECHA: diagnóstico */}
        <div className="rightColumna">
          {turnoSeleccionado ? (
            diagnostico ? (
              <Diagnostico datos={diagnostico} />
            ) : (
              <p>Este turno aún no tiene diagnóstico</p>
            )
          ) : (
            <p>Selecciona un turno para ver el diagnóstico</p>
          )}
        </div>
      </div>
    </div>
  );
}