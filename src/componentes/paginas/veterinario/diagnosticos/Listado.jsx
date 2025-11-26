import { useState, useEffect } from "react";
import axios from "axios";
import fileDownload from "js-file-download";
import Paginacion from "../../../comun/paginacion";

export default function Listado({ idMascota, token }) {
  const [ficha, setFicha] = useState(null);
  const [diagnosticos, setDiagnosticos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [errores, setErrores] = useState({});


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
      .get(
        `http://localhost:5000/api/diagnosticos?id_mascota=${idMascota}&pagina=${paginaActual}`,
        config
      )
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

  //  función para descargar archivo
  const handleDownload = async (id_archivo, nombre) => {
    try {
      const resp = await axios.get(
        `http://localhost:5000/api/archivos/${id_archivo}`,
        {
          headers: { Authorization: token }, 
          responseType: "blob",
        }
      );
      fileDownload(resp.data, nombre);
    } catch (err) {
      console.error("Error al descargar archivo:", err);
    }
  };

  if (!idMascota) {
    return (
      <p className="sinTurnoSeleccionado">
        Selecciona una mascota para ver la ficha de datos
      </p>
    );
  }

  return (
    <div className="formularioDiagnosticos">
      <div className="headerHistorial">
        <img
          src="/img/consulta.png"
          alt="icono consulta"
          className="iconoHistorial"
        />
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
                    <span className="fechaDiag">
                      {formatearFecha(d.fecha_turno)}
                    </span>
                  </div>
                  <div className="diagBody">
                    <p className="textoDiag">Diagnóstico: {d.diagnostico}</p>
                    <p className="textoDiag">Tratamiento: {d.tratamiento}</p>
                    <p className="textoDiag">Observaciones: {d.observaciones}</p>
                    <p className="textoDiag">
                      Peso actual: {d.peso_actual} kg
                    </p>
                  

                 {/* 👇 sección de archivos */}
                  {d.archivos && d.archivos.length > 0 && (
                    <div className="diagArchivos">
                      <p>
                        <b>Archivos adjuntos:</b>
                      </p>
                      <ul>
                        {d.archivos.map((a) => (
                          <li key={a.id_archivo}>
                            {/* link que dispara handleDownload */}
                            <a
                              href="#"
                              className="linkDescargar"
                              onClick={(e) => {
                                e.preventDefault(); // evita navegación
                                handleDownload(a.id_archivo, a.nombre);
                              }}
                            >
                              {a.nombre}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  </div>
                  <button
                    className="btnEditarDiag"
                    onClick={() => {
                      setFormData(d);
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
        <p className="sinTurnoSeleccionado">
          No se pudo cargar la ficha de la mascota seleccionada
        </p>
      )}

      {showModal && (
  <div className="modalOverlay">
    <div className="modalContent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = {};

          if (!formData.diagnostico?.trim()) newErrors.diagnostico = "El diagnóstico es obligatorio";
          if (!formData.tratamiento?.trim()) newErrors.tratamiento = "El tratamiento es obligatorio";
          if (!formData.observaciones?.trim()) newErrors.observaciones = "Las observaciones son obligatorias";
          if (!formData.peso_actual || formData.peso_actual <= 0) newErrors.peso_actual = "El peso es obligatorio";

          if (Object.keys(newErrors).length > 0) {
            setErrores(newErrors); // 👈 guarda errores en estado
            return; // 👈 no deja enviar
          }

          setErrores({});
          handleSave(); // 👈 tu función original
        }}
      >
        <div className="modalArriba">
          <button type="button" className="btnCloseModal" onClick={() => setShowModal(false)}>
            <img src="/img/equis.png" className="icono" />
          </button>
          <h3>Modificar diagnóstico</h3>
        </div>

        <label>
          Diagnóstico
          <input
            name="diagnostico"
            type="text"
            value={formData.diagnostico || ""}
            onChange={handleChange}
            className={`inputGenPerfil ${errores?.diagnostico ? "inputError" : ""}`}
          />
          {errores?.diagnostico && <p className="error-text">{errores.diagnostico}</p>}
        </label>

        <label>
          Tratamiento
          <input
            name="tratamiento"
            type="text"
            value={formData.tratamiento || ""}
            onChange={handleChange}
            className={`inputGenPerfil ${errores?.tratamiento ? "inputError" : ""}`}
          />
          {errores?.tratamiento && <p className="error-text">{errores.tratamiento}</p>}
        </label>

        <label>
          Observaciones
          <textarea
            name="observaciones"
            value={formData.observaciones || ""}
            onChange={handleChange}
            className={`inputGenPerfil textareaDiag ${errores?.observaciones ? "inputError" : ""}`}
          />
          {errores?.observaciones && <p className="error-text">{errores.observaciones}</p>}
        </label>

        <label>
          Peso actual
          <input
            name="peso_actual"
            type="number"
            value={formData.peso_actual || ""}
            onChange={handleChange}
            className={`inputGenPerfil ${errores?.peso_actual ? "inputError" : ""}`}
          />
          {errores?.peso_actual && <p className="error-text">{errores.peso_actual}</p>}
        </label>

        <div className="modalActions">
          <button type="submit" className="btnGuardarPerfil">
            Actualizar diagnóstico
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}