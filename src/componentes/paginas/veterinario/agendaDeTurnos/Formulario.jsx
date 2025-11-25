import { useState, useEffect } from "react";
import axios from "axios";
import useMensaje from "../../../../hooks/useMensaje";
import Mensaje from "../../../comun/Mensaje";

export default function Formulario({ idMascota, idTurno }) {
  const [ficha, setFicha] = useState(null);
  const [diagnostico, setDiagnostico] = useState("");
  const [tratamiento, setTratamiento] = useState("");
  const [observaciones, setObservaciones] = useState("");
  const [pesoActual, setPesoActual] = useState("");
  const [archivo, setArchivo] = useState(null);
  const [diagnosticoExistente, setDiagnosticoExistente] = useState(null);
  const [errors, setErrors] = useState({});
  const { textoMensaje, tipoMensaje, visible, mostrarMensaje } = useMensaje();

  const token = sessionStorage.getItem("token");

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = String(fecha.getFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  };

  //  Obtener ficha de la mascota
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

  //  Obtener diagnóstico existente
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

  //  Guardar diagnóstico
 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!diagnostico.trim()) newErrors.diagnostico = "El diagnóstico es obligatorio";
  if (!tratamiento.trim()) newErrors.tratamiento = "El tratamiento es obligatorio";
  if (!observaciones.trim()) newErrors.observaciones = "Las observaciones son obligatorias";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return; // corta el envío
  }

  setErrors({}); // limpia errores si todo está bien

  const config = { headers: { Authorization: token } };
  const pesoAEnviar = pesoActual ? pesoActual : ficha?.peso;

  const formData = {
    id_turno: idTurno,
    diagnostico,
    tratamiento,
    observaciones,
    peso_actual: pesoAEnviar,
  };

  if (archivo) {
    formData.archivo_nombre = archivo.name;
    formData.archivo_ruta = archivo.name;
    formData.fecha_subida = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  try {
    const resp = await axios.post("http://localhost:5000/api/diagnosticos", formData, config);
    setDiagnosticoExistente(resp.data.diagnostico);

    await axios.put(
      "http://localhost:5000/api/turnos/modificarestado",
      { id_turno: idTurno, estado: "finalizado" },
      config
    );

    const respFicha = await axios.get(
      `http://localhost:5000/api/turnos/fichadatos?id_mascota=${idMascota}`,
      config
    );
    setFicha(respFicha.data.ficha);
    mostrarMensaje("Diagnótico registrado correctamente", "exito")
  } catch (err) {
    console.error("Error al registrar diagnóstico:", err);
    mostrarMensaje("Error al registrar diagnóstico", "error")
  }
};
  return (
  <div className="formularioAgendaDeTurnos">
    <Mensaje texto={textoMensaje} tipo={tipoMensaje} visible={visible} />
    <h3>Datos del dueño</h3>
    {ficha ? (
      <div className="fichaDatos">
        <div className="filaFicha">
          <p><b>Dueño:</b> {ficha.dueno_nombre} {ficha.dueno_apellido}</p>
          <p><b>DNI:</b> {ficha.dueno_dni}</p>
        </div>
        <div className="filaFicha">
          <p><b>Teléfono:</b> {ficha.dueno_telefono}</p>
        </div>
    <h3 className="tituloFicha">Datos de la mascota</h3>
        <div className="filaFicha">
          <p><b>Mascota:</b> {ficha.nombre_mascota}</p>
          <p><b>Especie:</b> {ficha.nombre_especie}</p>
          </div>
        <div className="filaFicha">
          <p><b>Raza:</b> {ficha.nombre_raza}</p>
          <p><b>Sexo:</b> {ficha.sexo}</p>
        </div>
        <div className="filaFicha">
          <p><b>Fecha Nac.:</b> {formatearFecha(ficha.fecha_nacimiento)}</p>
          <p><b>Altura:</b> {ficha.altura} cm</p>
          </div>
          <div className="filaFicha">
          <p ><b>Peso:</b> {ficha.peso} kg</p>
          </div>
        
      </div>
    ) : (
      <p >Selecciona una tarjeta para ver la ficha de datos</p>
    )}

    <div className="contenedorDiagnosticoForm">
      <h3 className="tituloFicha">Generar diagnóstico</h3>
      <form onSubmit={handleSubmit} className="formDiagnostico">
        <div>
          <textarea
            className={`inputDiagnostico ${errors.diagnostico ? "error" : ""}`}
            placeholder="Diagnóstico"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            disabled={!!diagnosticoExistente}
          />
          {errors.diagnostico && <p className="error-text">{errors.diagnostico}</p>}
        </div>
        <div>
          <textarea
            className={`inputDiagnostico ${errors.tratamiento ? "error" : ""}`}
            placeholder="Tratamiento"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
            disabled={!!diagnosticoExistente}
          />
          {errors.tratamiento && <p className="error-text">{errors.tratamiento}</p>}
        </div>
        <div>
          <textarea
            className={`inputDiagnostico ${errors.observaciones ? "error" : ""}`}
            placeholder="Observaciones"
            value={observaciones}
            onChange={(e) => setObservaciones(e.target.value)}
            disabled={!!diagnosticoExistente}
          />
          {errors.observaciones && <p className="error-text">{errors.observaciones}</p>}
        </div>
        <div>
          <input
            type="number"
            step="0.1"
            className="inputDiagnostico"
            placeholder="Peso actual"
            value={pesoActual}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value > 0) {
                setPesoActual(e.target.value);
              } else {
                setPesoActual(""); // limpia si ponen 0 o negativo
              }
            }}
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
