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

    // cada vez que cambian servicio o fecha, avisamos al Main
    useEffect(() => {
        onChange({ servicio, fecha });
    }, [servicio, fecha, onChange]);

    return (
        <div>
            <h3>Filtros</h3>

            <div>
                <select 
                    value={servicio} 
                    onChange={(e) => setServicio(e.target.value)}
                >
                    <option value="" disabled>Servicios</option>
                    <option value="">Todos</option>
                    {servicios.map((s) => (
                        <option key={s.id_servicio} value={s.nombre}>
                            {s.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <input 
                    type="date" 
                    value={fecha} 
                    onChange={(e) => setFecha(e.target.value)} 
                />
            </div>
        </div>
    );
}
