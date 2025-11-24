import { useState, useEffect } from "react";
import axios from "axios";
import Paginacion from "../../../comun/paginacion";

export default function Listado({ idMascota, token }) {
  const [ficha, setFicha] = useState(null);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!idMascota) {
      setFicha(null);
      setDiagnosticos([]);
      return;
    }

    const config = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/api/turnos/fichadatos?id_mascota=${idMascota}`, config)
      .then((resp) => setFicha(resp.data.ficha))
      .catch(() => setFicha(null));
  }, [idMascota, token]);

  useEffect(() => {
    if (!idMascota) {
      setDiagnosticos([]);
      return;
    }

    const config = { headers: { Authorization: token } };
    axios
      .get(`http://localhost:5000/api/diagnosticos?id_mascota=${idMascota}&pagina=${paginaActual}`, config)
      .then((resp) => {
        setDiagnosticos(resp.data.diagnosticos || []);
        setTotalPaginas(resp.data.totalPaginas || 1);
      })
      .catch(() => setDiagnosticos([]));
  }, [idMascota, paginaActual, token]);

  const formatearFecha = (fecha) => {
    if (!fecha) return "";
    return new Date(fecha).toLocaleDateString("es-AR");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.peso_actual || formData.peso_actual <= 0) {
    alert("El peso debe ser mayor a 0");
    return;
  }
    try {
      const config = { headers: { Authorization: token } };
      await axios.put(
        `http://localhost:5000/api/diagnosticos/${formData.id_diagnostico}`,
        {
          diagnostico: formData.diagnostico,
          tratamiento: formData.tratamiento,
          observaciones: formData.observaciones,
          peso_actual: formData.peso_actual,
        },
        config
      );
      // refrescar lista
      const resp = await axios.get(
        `http://localhost:5000/api/diagnosticos?id_mascota=${idMascota}&pagina=${paginaActual}`,
        config
      );
      setDiagnosticos(resp.data.diagnosticos || []);
    } catch (error) {
      console.error("Error al actualizar diagnóstico:", error);
    }
    setShowModal(false);
  };

  if (!idMascota) {
    return <p className="sinTurnoSeleccionado">Selecciona una mascota para ver la ficha de datos</p>;
  }

  return (
    <div className="formularioDiagnosticos">
      {/* Sección superior con título e imagen */}
      <div className="headerHistorial">
        <img src="/img/consulta.png" alt="icono consulta" className="iconoHistorial" />
        <h3 className="tituloHistorial">Historial</h3>
      </div>

      {ficha ? (
        <>
          <div className="fichaContainer">
            <div className="fichaCol">
              <h3 className="tituloFicha">Datos del dueño</h3>
              <div className="fichaDatos">
                <div className="filaFicha">
                  <p className="datoFicha">Dueño: {ficha.dueno_nombre} {ficha.dueno_apellido}</p>
                  <p className="datoFicha">DNI: {ficha.dueno_dni}</p>
                  <p className="datoFicha">Teléfono: {ficha.dueno_telefono}</p>
                </div>
              </div>
            </div>

            <div className="fichaCol">
              <h3 className="tituloFicha">Datos de la mascota</h3>
              <div className="fichaDatos">
                <div className="filaFicha">
                  <p className="datoFicha">Mascota: {ficha.nombre_mascota}</p>
                  <p className="datoFicha">Especie: {ficha.nombre_especie}</p>
                  <p className="datoFicha">Raza: {ficha.nombre_raza}</p>
                </div>
                <div className="filaFicha">
                  <p className="datoFicha">Sexo: {ficha.sexo}</p>
                  <p className="datoFicha">Fecha Nac.: {formatearFecha(ficha.fecha_nacimiento)}</p>
                  <p className="datoFicha">Altura: {ficha.altura} cm</p>
                </div>
                <div className="filaFicha">
                  <p className="datoFicha">Peso: {ficha.peso} kg</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="tituloFicha">Diagnósticos</h3>
          {diagnosticos.length > 0 ? (
            <>
              {diagnosticos.map((d) => (
                <div key={d.id_diagnostico} className="diagnosticoCard">
                  <div className="diagHeader">
                    <div className="circle"></div>
                    <span className="fechaDiag">{formatearFecha(d.fecha_turno)}</span>
                  </div>
                  <div className="diagBody">
                    <p className="textoDiag">Diagnóstico: {d.diagnostico}</p>
                    <p className="textoDiag">Tratamiento: {d.tratamiento}</p>
                    <p className="textoDiag">Observaciones: {d.observaciones}</p>
                    <p className="textoDiag">Peso actual: {d.peso_actual} kg</p>
                  </div>
                  <button
                    className="btnEditarDiag"
                    onClick={() => {
                      setFormData(d); // cargar datos del diagnóstico en el modal
                      setShowModal(true);
                    }}
                  >
                    Editar diagnóstico
                  </button>
                </div>
              ))}
              <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                cambiarPagina={setPaginaActual}
              />
            </>
          ) : (
            <p>No hay diagnósticos registrados para esta mascota</p>
          )}
        </>
      ) : (
        <p className="sinTurnoSeleccionado">No se pudo cargar la ficha de la mascota seleccionada</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalContent">
            <div className="modalArriba">
              <button className="btnCloseModal" onClick={() => setShowModal(false)}>
                <img src="/img/equis.png" className="icono" />
              </button>
              <h3>Modificar diagnóstico</h3>
            </div>
            <label>
              Diagnóstico
              <input
                name="diagnostico"
                type="text"
                className="inputGenPerfil"
                value={formData.diagnostico || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Tratamiento
              <input
                name="tratamiento"
                type="text"
                className="inputGenPerfil"
                value={formData.tratamiento || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Observaciones
              <textarea
                name="observaciones"
                className="inputGenPerfil textareaDiag"
                value={formData.observaciones || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Peso actual
              <input
                name="peso_actual"
                type="number"
                className="inputGenPerfil"
                value={formData.peso_actual || ""}
                onChange={handleChange}
              />
            </label>
            <div className="modalActions">
              <button onClick={handleSave} className="btnGuardarPerfil">
                Actualizar diagnóstico
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
