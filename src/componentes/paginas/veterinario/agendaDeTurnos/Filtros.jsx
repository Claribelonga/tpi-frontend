import { useState, useEffect } from "react";
import axios from "axios";

export default function Filtros({ onChange }) {
    const [servicios, setServicios] = useState([]);
    const [servicio, setServicio] = useState("");
    const [fecha, setFecha] = useState("");
    const token = sessionStorage.getItem("token");

    // Obtener servicios desde el backend
    useEffect(() => {
        const config = {
            headers: {
                Authorization: token,
            },
        };
        const url = "http://localhost:5000/api/servicios/select";
        axios.get(url, config)
            .then((resp) => {
                setServicios(resp.data);
                console.log("Servicios disponibles:", resp.data);
            })
            .catch((error) => {
                console.error("Error al obtener servicios:", error);
            });
    }, [token]);

    const aplicarFiltros = () => {
        onChange({ servicio, fecha });
    };

    return (
        <div>
            <h3>Filtros</h3>

            <div>
                <label>Servicio: </label>
                <select 
                    value={servicio} 
                    onChange={(e) => setServicio(e.target.value)}
                >
                    <option value="">Todos</option>
                    {servicios.map((s) => (
                        <option key={s.id_servicio} value={s.nombre}>
                            {s.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Fecha: </label>
                <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                />
            </div>

            <button onClick={aplicarFiltros}>Aplicar</button>
        </div>
    );
}
