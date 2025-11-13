import { useState } from "react";

export default function Buscador ({onBuscar}){
    const [texto, setTexto] = useState("");

  const handleBuscar = () => {
    onBuscar(texto); // Llama al padre (Main) con el texto de búsqueda
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleBuscar();
    }
  };
  const limpiarBusqueda = () => {
    setTexto(""); //borra el texto del input 
    onBuscar(""); //llama al padre sin texto, muestra los clientes
  }
    return (
        <div className="">
            <span>Buscar Cliente</span>
            <div className="cont-buscador">
            <div className="buscador">
                <input type="text"  placeholder="Ingrese Nombre y Apellido" className="input-buscador" value={texto} onChange={(e) => setTexto(e.target.value)} onKeyDown={handleKeyPress}/>
                <img src="/img/lupa.png" alt="lupa"className="icono" onClick={handleBuscar} style={{ cursor: "pointer" }}/>
            </div>
             {(texto &&
                <img src="/img/equis.png" alt="equis" onClick={limpiarBusqueda} style={{ cursor: "pointer", width: "35px", height: "35px", margin: "15px"}}/>
            )}
            </div>
        </div>
    )
}