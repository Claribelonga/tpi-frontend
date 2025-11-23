// import { useState, useEffect } from "react";
// import axios from "axios";
// import Listado from "./Listado";
// import Buscador from "./Buscador";

// export default function Main() {
//     return (
//         <>
//        <Buscador/>
//        <Listado/>
       
//        </>
//     )
// }
// Main.jsx
import { useState } from "react";
import axios from "axios";
import Listado from "./Listado";
import Buscador from "../../../comun/Buscador";

export default function Main() {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("token");

  // 👉 versión usando .then() y .catch()
  const buscarMascotas = (dni) => {
    if (!dni) {
      setMascotas([]);
      return;
    }

    setLoading(true);

    const config = { headers: { Authorization: token } };

    axios
      .get(`http://localhost:5000/api/mascotas/select?dni=${dni}`, config)
      .then((resp) => {
        setMascotas(resp.data.mascotas || []);
      })
      .catch((error) => {
        console.error("Error al buscar mascotas:", error);
        setMascotas([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Buscador
        titulo="Buscar por DNI"
        placeholder="Ingrese DNI del dueño"
        onBuscar={buscarMascotas}
      />

      {loading && <p>Cargando...</p>}
      {!loading && mascotas.length === 0 && <p>No se encontraron mascotas</p>}

      <Listado mascotas={mascotas} />
    </>
  );
}
