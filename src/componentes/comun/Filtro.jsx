
// import { useState } from "react";

// export default function FiltroMascota({ opciones, onChange, textoDefault }) {
//   const [abierto, setAbierto] = useState(false);

//   const toggleMenu = () => setAbierto(!abierto);

//   const seleccionar = (value) => {
//     onChange(value);      
//     setAbierto(false);
//   };

//   return (
//     <div className="filtro-contenedor">

//       {/* Botón estilo tarjeta */}
//       <button
//         className="filtro-boton"
//         onClick={toggleMenu}
//         type="button"
//       >
//         {textoDefault}
//         <span className="icono-filtro"><img src="/img/filtrar.png" alt="filter-icon" className="icono"/></span>
//       </button>

//       {/* DESPLEGABLE */}
//       {abierto && (
//         <div className="filtro-menu">
//           <p className="filtro-opcion" onClick={() => seleccionar("")}>
//             Todas las mascotas
//           </p>

//           {opciones.map((m) => (
//             <p
//               key={m.id_mascota}
//               className="filtro-opcion"
//               onClick={() => seleccionar(m.id_mascota)}
//             >
//               {m.nombre}
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function Filtro({ 
  opciones = [],
  onChange,
  textoDefault = "Filtrar",
  mostrarTodos = true,
  keyProp = "id",
  labelProp = "nombre"
}) {
  const [abierto, setAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState("");

  const toggleMenu = () => setAbierto(!abierto);

  const seleccionar = (value, label) => {
    setSeleccionado(label);
    onChange(value);
    setAbierto(false);
  };

  return (
    <div className="filtro-contenedor">
      <button
        className="filtro-boton"
        onClick={toggleMenu}
        type="button"
      >
        {seleccionado || textoDefault}
        <span className="icono-filtro">
          <img src="/img/filtrar.png" alt="filter-icon" className="icono"/>
        </span>
      </button>

      {abierto && (
        <div className="filtro-menu">

          {mostrarTodos && (
            <p 
              className="filtro-opcion"
              onClick={() => seleccionar("", "Todas las mascotas")}
            >
              Todos
            </p>
          )}

          {opciones.map((op) => (
            <p
              key={op[keyProp]}
              className="filtro-opcion"
              onClick={() => seleccionar(op[keyProp], op[labelProp])}
            >
              {op[labelProp]}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
