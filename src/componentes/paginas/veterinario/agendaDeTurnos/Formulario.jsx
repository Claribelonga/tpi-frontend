import { useState, useEffect } from "react";
import axios from "axios";

export default function Formulario({ idMascota, idTurno }) {
  const [ficha, setFicha] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pesoActual, setPesoActual] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [diagnosticoExistente, setDiagnosticoExistente] = useState(null);

  const token = sessionStorage.getItem("token");

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  };

  // 👉 Obtener ficha de la mascota
  useEffect(() => {
    if (!idMascota) {
      setFicha(null); // limpiar si no hay mascota seleccionada
      return;
    }
    const config = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/api/turnos/fichadatos?id_mascota=${idMascota}`, config)
      .then((resp) => setFicha(resp.data.ficha))
      .catch((err) => {
        console.error("Error al obtener ficha:", err);
        setFicha(null); // limpiar en caso de error
      });
  }, [idMascota, token]);

  // 👉 Obtener diagnóstico existente
  useEffect(() => {
    if (!idTurno) {
      setDiagnosticoExistente(null);
      setDiagnostico("");
      setTratamiento("");
      setObservaciones("");
      setPesoActual("");
      setArchivo(null);
      return;
    }
    const config = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/api/diagnosticos/turno?id_turno=${idTurno}`, config)
      .then((resp) => {
        const diag = resp.data.diagnostico;
        if (diag) {
          setDiagnosticoExistente(diag);
          setDiagnostico(diag.diagnostico);
          setTratamiento(diag.tratamiento);
          setObservaciones(diag.observaciones);
          setPesoActual(diag.peso_actual);
        } else {
          // limpiar si no hay diagnóstico
          setDiagnosticoExistente(null);
          setDiagnostico("");
          setTratamiento("");
          setObservaciones("");
          setPesoActual("");
          setArchivo(null);
        }
      })
      .catch((err) => {
        console.error("Error al obtener diagnóstico:", err);
        setDiagnosticoExistente(null);
        setDiagnostico("");
        setTratamiento("");
        setObservaciones("");
        setPesoActual("");
        setArchivo(null);
      });
  }, [idTurno, token]);

  // 👉 Guardar diagnóstico
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

    if (archivo) {
      formData.archivo_nombre = archivo.name;
      formData.archivo_ruta = archivo.name;
      formData.fecha_subida = new Date().toISOString().slice(0, 19).replace("T", " ");
    }

    try {
      const resp = await axios.post("http://localhost:5000/api/diagnosticos", formData, config);
      alert("Diagnóstico registrado correctamente");
      setDiagnosticoExistente(resp.data.diagnostico); // usar respuesta del backend

      // refrescar ficha con datos actualizados
      const respFicha = await axios.get(
        `http://localhost:5000/api/turnos/fichadatos?id_mascota=${idMascota}`,
        config
      );
      setFicha(respFicha.data.ficha);
    } catch (err) {
      console.error("Error al registrar diagnóstico:", err);
      alert("Error al registrar diagnóstico");
    }
  };

  return (
    <div className="formularioAgendaDeTurnos">
      <h3 className="tituloFicha">Datos de la mascota y el dueño</h3>
      {ficha ? (
        <div className="fichaDatos">
          <div className="filaFicha">
            <p className="datoFicha">Dueño: {ficha.dueno_nombre} {ficha.dueno_apellido}</p>
            <p className="datoFicha">DNI: {ficha.dueno_dni}</p>
          </div>
          <div className="filaFicha">
            <p className="datoFicha">Teléfono: {ficha.dueno_telefono}</p>
            <p className="datoFicha">Mascota: {ficha.nombre_mascota}</p>
          </div>
          <div className="filaFicha">
            <p className="datoFicha">Especie: {ficha.nombre_especie}</p>
            <p className="datoFicha">Raza: {ficha.nombre_raza}</p>
          </div>
          <div className="filaFicha">
            <p className="datoFicha">Sexo: {ficha.sexo}</p>
            <p className="datoFicha">Fecha Nac.: {formatearFecha(ficha.fecha_nacimiento)}</p>
          </div>
          <div className="filaFicha">
            <p className="datoFicha">Altura: {ficha.altura} cm</p>
            <p className="datoFicha">Peso: {ficha.peso} kg</p>
          </div>
        </div>
      ) : (
        <p>Selecciona una tarjeta para ver la ficha de datos</p>
      )}

      <div className="contenedorDiagnosticoForm">
        <h3 className="tituloFicha">Generar diagnóstico</h3>
        <form onSubmit={handleSubmit} className="formDiagnostico">
          <div>
            <textarea
              className="inputDiagnostico"
              placeholder="Diagnóstico"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
              disabled={!!diagnosticoExistente}
            />
          </div>
          <div>
            <textarea
              className="inputDiagnostico"
              placeholder="Tratamiento"
              value={tratamiento}
              onChange={(e) => setTratamiento(e.target.value)}
              disabled={!!diagnosticoExistente}
            />
          </div>
          <div>
            <textarea
              className="inputDiagnostico"
              placeholder="Observaciones"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              disabled={!!diagnosticoExistente}
            />
          </div>
          <div>
            <input
              type="number"
              step="0.1"
              className="inputDiagnostico"
              placeholder="Peso actual"
              value={pesoActual}
              onChange={(e) => setPesoActual(e.target.value)}
              disabled={!!diagnosticoExistente}
            />
          </div>
          <div>
            <input
              type="file"
              className="inputDiagnostico"
              onChange={(e) => setArchivo(e.target.files[0])}
              disabled={!!diagnosticoExistente}
            />
          </div>
          {!diagnosticoExistente && (
            <button type="submit" className="btnGuardar">Guardar diagnóstico</button>
          )}
        </form>
      </div>
    </div>
  );
}
