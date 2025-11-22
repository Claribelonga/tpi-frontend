import { useState, useEffect } from "react";

export default function Formulario({ mascota, cerrar, onGuardar, especies, razas, obtenerRazas }) {

  const [nombre, setNombre] = useState("");
  const [idEspecie, setIdEspecie] = useState("");
  const [idRaza, setIdRaza] = useState("");
  const [sexo, setSexo] = useState("");
  const [fecha_nacimiento, setFN] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");

  // CARGAR DATOS EN MODO EDICIÓN
  useEffect(() => {
    if (mascota) {
      setNombre(mascota.nombre);
      setIdEspecie(mascota.id_especie);
      setIdRaza(mascota.id_raza);
      setSexo(mascota.sexo);
      setFN(mascota.fecha_nacimiento);
      setAltura(mascota.altura);
      setPeso(mascota.peso);

      // Cargar razas automáticamente según la especie
      obtenerRazas(mascota.id_especie);
    }
  }, [mascota]);

  // Enviar datos
  const enviarDatos = (e) => {
    e.preventDefault();

    if (!idRaza) {
      alert("Debes seleccionar una raza");
      return;
    }

    const datos = {
      idMascota: mascota?.id_mascota || null,
      nombre,
      id_raza: idRaza,
      sexo,
      fecha_nacimiento,
      altura,
      peso
    };

    console.log("📤 Datos a enviar:", datos);
    onGuardar(datos);
  };

  return (
    <div className="modal-overlay">
      <div className="FormContenedor">

        <form className="formulario-mascota-modal" onSubmit={enviarDatos}>

          <div className="arriba-mascota">
            <span className="text-xl">{mascota ? "Editar Mascota" : "Agregar Mascota"}</span>
            <button type="button" onClick={cerrar}><img src="/img/equis.png" className="icono" /></button>
          </div>
          <div className="inputContainer">
            <label>Nombre:</label>
          <input className="inputGen" placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} />
          </div>

          {/* ESPECIE */}
          <div className="inputContainer">
            <label>Especie:</label>
          <select className="inputGen" value={idEspecie}
            onChange={(e) => {
              setIdEspecie(e.target.value);
              obtenerRazas(e.target.value); // traer razas
            }}>
            <option value="">Selecciona especie</option>
            {especies.map(e => (
              <option key={e.id_especie} value={e.id_especie}>{e.nombre}</option>
            ))}
          </select>
          </div>

          {/* RAZA */}
          <div className="inputContainer">
            <label>Raza:</label>
          <select className="inputGen" value={idRaza}
            onChange={(e) => setIdRaza(e.target.value)}>
            <option value="">Selecciona raza</option>
            {razas.map(r => (
              <option key={r.id_raza} value={r.id_raza}>{r.nombre}</option>
            ))}
          </select>
          </div>
          <div className="inputContainer">
            <label>Sexo:</label>
          <select className="inputGen" value={sexo} onChange={e => setSexo(e.target.value)}>
            <option value="">Sexo</option>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
          </div>

          <div className="inputContainer">
            <label>Fecha de Nacimiento:</label>
          <input className="inputGen" type="date" value={fecha_nacimiento}
            onChange={e => setFN(e.target.value)} />
          </div>

          <div className="inputContainer">
            <label>Altura:</label>
          <input className="inputGen" placeholder="Altura"
            value={altura} onChange={e => setAltura(e.target.value)} />
          </div>

          <div className="inputContainer">
            <label>Peso:</label>
          <input className="inputGen" type="number" placeholder="Peso"
            value={peso} onChange={e => setPeso(e.target.value)} />
          </div>

          <button className="btnGuardar" type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
}
