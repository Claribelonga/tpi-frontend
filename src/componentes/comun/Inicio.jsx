import ProxTurno from "./ProxTurno"
import Servicios from "./Servicios"
import Especialistas from "./Especialistas"
import Footer from "./Footer"

export default function Inicio(){
    const rol = sessionStorage.getItem("rol");
    return(
        <div>
            <img src="/img/bienvenida.png" alt="banner" className="banner"/>
            {rol === "3" && <ProxTurno />}
            <Servicios></Servicios>
            <Especialistas></Especialistas>
            <Footer></Footer>
        </div>
    )
}