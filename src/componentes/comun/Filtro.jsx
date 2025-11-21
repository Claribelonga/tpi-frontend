// export default function Filtros({ opciones, onFiltrar }) {
//   return (
//     <select onChange={e => onFiltrar(e.target.value)}>
//       {opciones.map(op => (
//         <option key={op.value} value={op.value}>
//           {op.label}
//         </option>
//       ))}
//     </select>
//   );
// }
import { useState } from "react";

export default function FiltroMascota({ opciones, onChange, textoDefault }) {
  const [abierto, setAbierto] = useState(false);

  const toggleMenu = () => setAbierto(!abierto);

  const seleccionar = (value) => {
    onChange(value);      
    setAbierto(false);
  };

  return (
    <div className="filtro-contenedor">

      {/* Botón estilo tarjeta */}
      <button
        className="filtro-boton"
        onClick={toggleMenu}
        type="button"
      >
        {textoDefault}
        <span className="icono-filtro"><img src="/img/filtrar.png" alt="filter-icon" className="icono"/></span>
      </button>

      {/* DESPLEGABLE */}
      {abierto && (
        <div className="filtro-menu">
          <p className="filtro-opcion" onClick={() => seleccionar("")}>
            Todas las mascotas
          </p>

          {opciones.map((m) => (
            <p
              key={m.id_mascota}
              className="filtro-opcion"
              onClick={() => seleccionar(m.id_mascota)}
            >
              {m.nombre}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
