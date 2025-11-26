import { useState, useEffect } from "react";
import axios from "axios";
import Paginacion from "./paginacion";

export default function Servicios() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [servicios, setServicios] = useState([]);

  // Función para obtener los servicios desde el backend
  const obtenerServicios = (pagina = 1) => {
    const url = `http://localhost:5000/api/publico/servicios?pagina=${pagina}`;
    axios.get(url)
      .then((resp) => {
        // console.log("Respuesta GET:", resp.data);
        setServicios(resp.data.servicios);
        setPaginaActual(resp.data.paginaActual);
        setTotalPaginas(resp.data.totalPaginas);
      })
      .catch((error) => {
        // console.error("Error al obtener servicios:", error);
        alert("Ocurrió un error al obtener los servicios");
      });
  };

  // Al cargar el componente, traer la primera página
  useEffect(() => {
    obtenerServicios(1);
  }, []);

  // Función que se pasa a Paginacion
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    obtenerServicios(nuevaPagina);
  };

  return (
    <div className="servicios-container">
      <h3 className="titulo-servicio">Nuestros Servicios</h3>

      <div className="grid-servicios">
        {servicios.map((servicio) => (
          <div key={servicio.id_servicio} className="card-servicio">
            <div className="icono-servicio">
              <img src="/img/corazon.png" alt="corazon" className="serv-img"/>
            </div>
            <p className="nombre-servicio">{servicio.nombre}</p>
            <p className="precio-servicio">${servicio.precio}</p>
          </div>
        ))}
      </div>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        cambiarPagina={cambiarPagina}
      />
    </div>
  );
}
