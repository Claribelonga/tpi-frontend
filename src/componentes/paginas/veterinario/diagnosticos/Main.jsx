import { useState } from "react";
import axios from "axios";
import Buscador from "../../../comun/Buscador";
import Filtro from "../../../comun/Filtro";
import Listado from "./Listado";

export default function Main() {
  const [mascotas, setMascotas] = useState([]);
  const [selectedMascota, setSelectedMascota] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = sessionStorage.getItem("token");

  const buscarMascotas = async (dni) => {
    if (!dni) {
      setMascotas([]);
      setSelectedMascota(null);
      setError("Ingresa un DNI");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const config = { headers: { Authorization: token } };
      const resp = await axios.get(
        `http://localhost:5000/api/mascotas/select?dni=${dni}`,
        config
      );
      setMascotas(resp.data.mascotas || []);
      setSelectedMascota(null); // limpiar selección al buscar
    } catch (err) {
      console.error("Error al buscar mascotas:", err);
      setMascotas([]);
      setError("No se pudieron obtener las mascotas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mainBuscadorMascotas">
        <Buscador
          titulo="Buscar por DNI"
          placeholder="Ingrese DNI del dueño"
          onBuscar={buscarMascotas}
        />

        <div className="listaMascotas">
          {loading && <p>Cargando...</p>}
          {error && <p className="error-text">{error}</p>}
          {!loading && mascotas.length === 0 && !error && (
            <p>No se encontraron mascotas</p>
          )}
          {!loading && mascotas.length > 0 && (
            <Filtro
              opciones={mascotas}
              onChange={(id) => setSelectedMascota(id)}
              textoDefault="Seleccione una mascota"
              mostrarTodos={false}
              keyProp="id_mascota"
              labelProp="nombre"
            />
          )}
        </div>
      </div>

      {/* 👉 Pasamos el idMascota seleccionado a Listado */}
      <Listado idMascota={selectedMascota} token={token} />
    </>
  );
}
