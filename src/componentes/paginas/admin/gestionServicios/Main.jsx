import Formulario from "./Formulario"
import Listado from "./Listado"
import Menu from "../../../comun/Menu"

export default function Main(){
    return(
        <div className="Cont-Padre">
            <div className="menu-lateral">
                <Menu></Menu>
            </div>
            <div className="area-contenido">
                <Formulario></Formulario>
                <Listado></Listado>
            </div>
        </div>
    )
}