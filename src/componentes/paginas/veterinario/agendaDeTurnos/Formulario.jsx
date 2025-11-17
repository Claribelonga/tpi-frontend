
import { useState, useEffect } from "react";
import axios from "axios";

export default function Formulario({ idMascota, idTurno }) {
  const [ficha, setFicha] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pesoActual, setPesoActual] = useState("");
  const [archivo, setArchivo] = useState(null);

  const token = sessionStorage.getItem("token");

  // Obtener ficha de datos de la mascota
  useEffect(() => {
    if (!idMascota) return;

    const config = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/api/turnos/fichadatos?id_mascota=${idMascota}`, config)
      .then((resp) => setFicha(resp.data.ficha))
      .catch((err) => console.error("Error al obtener ficha:", err));
  }, [idMascota, token]);

  // Enviar diagnóstico
  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = { headers: { Authorization: token } };
    const formData = {
      id_turno: idTurno,
      diagnostico,
      tratamiento,
      observaciones,
      peso_actual: pesoActual,
    };

    // si hay archivo cargado
    if (archivo) {
      formData.archivo_nombre = archivo.name;
      formData.archivo_ruta = archivo.name; // en backend deberías guardar ruta real
      formData.fecha_subida = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    try {
      await axios.post("http://localhost:5000/api/diagnosticos/", formData, config);
      alert("Diagnóstico registrado correctamente");
      // limpiar formulario
      setDiagnostico("");
      setTratamiento("");
      setObservaciones("");
      setPesoActual("");
      setArchivo(null);
    } catch (err) {
      console.error("Error al registrar diagnóstico:", err);
      alert("Error al registrar diagnóstico");
    }
  };

  return (
    <div className="formularioTurno">
      <h3>Ficha de Datos</h3>
      {ficha ? (
        <div className="fichaDatos">
          <p><strong>Dueño:</strong> {ficha.dueno_nombre} {ficha.dueno_apellido}</p>
          <p><strong>DNI:</strong> {ficha.dueno_dni}</p>
          <p><strong>Teléfono:</strong> {ficha.dueno_telefono}</p>
          <p><strong>Mascota:</strong> {ficha.nombre_mascota}</p>
          <p><strong>Especie:</strong> {ficha.nombre_especie}</p>
          <p><strong>Raza:</strong> {ficha.nombre_raza}</p>
          <p><strong>Sexo:</strong> {ficha.sexo}</p>
          <p><strong>Fecha Nac.:</strong> {ficha.fecha_nacimiento}</p>
          <p><strong>Altura:</strong> {ficha.altura} cm</p>
          <p><strong>Peso:</strong> {ficha.peso} kg</p>
        </div>
      ) : (
        <p>Selecciona una tarjeta para ver la ficha de datos</p>
      )}

      <h3>Diagnóstico</h3>
      <form onSubmit={handleSubmit} className="formDiagnostico">
        <div>
          <label>Diagnóstico:</label>
          <textarea value={diagnostico} onChange={(e) => setDiagnostico(e.target.value)} />
        </div>
        <div>
          <label>Tratamiento:</label>
          <textarea value={tratamiento} onChange={(e) => setTratamiento(e.target.value)} />
        </div>
        <div>
          <label>Observaciones:</label>
          <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} />
        </div>
        <div>
          <label>Peso actual:</label>
          <input
            type="number"
            step="0.1"
            value={pesoActual}
            onChange={(e) => setPesoActual(e.target.value)}
          />
        </div>
        <div>
          <label>Archivo:</label>
          <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
        </div>
        <button type="submit">Guardar diagnóstico</button>
      </form>
    </div>
  );
}
