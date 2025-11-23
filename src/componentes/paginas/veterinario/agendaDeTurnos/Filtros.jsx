import { useState, useEffect } from "react";
import axios from "axios";

export default function Filtros({ onChange }) {
  const [servicios, setServicios] = useState([]);
  const [servicio, setServicio] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("");
  const token = sessionStorage.getItem("token");

  // Obtener servicios desde el backend
  useEffect(() => {
    const config = { headers: { Authorization: token } };
    const url = "http://localhost:5000/api/servicios/select";
    axios
      .get(url, config)
      .then((resp) => {
        setServicios(resp.data);
        console.log("Servicios disponibles:", resp.data);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
      });
  }, [token]);

  // cada vez que cambian servicio, fecha o estado, avisamos al Main
  useEffect(() => {
    onChange({ servicio, fecha, estado });
  }, [servicio, fecha, estado, onChange]);

  // 👉 limpiar todos los filtros
  const limpiarFiltros = () => {
    setServicio("");
    setFecha("");
    setEstado("");
    onChange({ servicio: "", fecha: "", estado: "" });
  };

   return (
  <div>
    <h2>Agenda de turnos</h2>
    <div className="contenedorFiltros">
      <div>
        <select
          className="filtro-boton"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        >
          <option value="" disabled className="filtro-opcion">Servicios</option>
          <option value="" className="filtro-opcion">Todos</option>
          {servicios.map((s) => (
            <option key={s.id_servicio} value={s.nombre}>
              {s.nombre}
            </option>
          ))}
        </select>
      </div>

        <div className="filtroFecha">
          <input
            type="date"
            className="filtroInput"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <button className="btnClearFiltros" onClick={limpiarFiltros}>✕</button>
        </div>


        <div>
          <select
            className="filtroSelect"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="" disabled>
              Estados
            </option>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="finalizado">Finalizado</option>
          </select>
        </div>

        
      </div>
    </div>
  );
}
