import Menu from "./Menu"
import Inicio from "./Inicio"

export default function PantallaGeneral(){
    return(
        <div className="Cont-Padre">
            <div className="menu-lateral">
                <Menu></Menu>
            </div>
            <div className="area-contenido">
                <Inicio></Inicio>
            </div>
        </div>
    )
}