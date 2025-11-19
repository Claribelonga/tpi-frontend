import { useState, useEffect } from "react";
import axios from "axios";
import Paginacion from "./paginacion";
export default function Veterinarios() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [veterinarios, setVeterinarios] = useState([]);

  // GET con paginación
  const obtenerVeterinarios = (pagina = 1) => {
    const url = `http://localhost:5000/api/publico/veterinarios?pagina=${pagina}`;
    axios.get(url)
      .then((resp) => {
        console.log("Respuesta GET veterinarios:", resp.data);
        setVeterinarios(resp.data.veterinarios);
        setPaginaActual(resp.data.paginaActual);
        setTotalPaginas(resp.data.totalPaginas);
      })
      .catch((error) => {
        console.error("Error al obtener veterinarios:", error);
        alert("Ocurrió un error al obtener los veterinarios");
      });
  };

  // Al cargar el componente, traer la primera página
  useEffect(() => {
    obtenerVeterinarios(1);
  }, []);

  // Función que se pasa a Paginacion
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPaginas) return;
    obtenerVeterinarios(nuevaPagina);
  };

  return (
    <div className="servicios-container">
      <h3 className="titulo-servicio">Nuestros Especialistas</h3>

      <div className="grid-servicios">
        {veterinarios.map((vet) => (
          <div key={vet.id_veterinario} className="card-vete">
            <div className="img-vete">
              <img src="/img/veterinario.png" alt="perfilvete" className="vete-img"/>
            </div>
            <p className="nombre-servicio">{vet.especialidad}</p>
            <p className="nombre-vete">{vet.nombre_veterinario} {vet.apellido_veterinario}</p>
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
