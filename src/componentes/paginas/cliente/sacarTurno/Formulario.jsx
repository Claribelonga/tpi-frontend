export default function Formulario({
  mascotas = [],
  servicios = [],
  veterinarios = [],
  turno,
  onChangeDato
}) {

  return (
    <div className="FormContenedor">
      {/* Mascota */}
      <div className="inputContainer">
      <label>Mascota</label>
      <select className="inputGen"
        value={turno.id_mascota}
        onChange={(e) => onChangeDato("id_mascota", e.target.value)}
      >
        <option value="">Selecciona una mascota</option>
        {mascotas.map(m => (
          <option key={m.id_mascota} value={m.id_mascota}>
            {m.nombre}
          </option>
        ))}
      </select>
      </div>

      {/* Servicios */}
      <div className="inputContainer">
      <label>Servicio</label>
      <select className="inputGen"
        value={turno.id_servicio}
        onChange={(e) => onChangeDato("id_servicio", e.target.value)}
      >
        <option value="">Selecciona un servicio</option>
        {servicios.map(s => (
          <option key={s.id_servicio} value={s.id_servicio}>
            {s.nombre}
          </option>
        ))}
      </select>
      </div>

      {/* Fecha */}
      <div className="inputContainer">
      <label>Fecha</label>
      <input className="inputGen"
        type="date"
        value={turno.fecha}
        onChange={(e) => onChangeDato("fecha", e.target.value)}
      />
      </div>

      {/* Hora */}
      <div className="inputContainer">
      <label>Hora</label>
      <input className="inputGen"
        type="time"
        value={turno.hora}
        onChange={(e) => onChangeDato("hora", e.target.value)}
      />
      </div>

      {/* Veterinario */}
      <div className="inputContainer">
      <label>Veterinario</label>
      <select className="inputGen"
        value={turno.id_veterinario}
        onChange={(e) => onChangeDato("id_veterinario", e.target.value)}
      >
        <option value="">Selecciona un veterinario</option>
        {veterinarios.map(v => (
          <option key={v.id_veterinario} value={v.id_veterinario}>
            {v.nombre_veterinario} {v.apellido_veterinario}
          </option>
        ))}
      </select>
      </div>

    </div>
  );
}
