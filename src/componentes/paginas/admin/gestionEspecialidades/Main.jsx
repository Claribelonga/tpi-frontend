import Menu from "../../../comun/Menu";
import Listado from "./listado";
export default function Main(){
    return(
        <div className="Cont-Padre">
            <div className="menu-lateral">
                <Menu></Menu>
            </div>
            <div className="area-contenido">
                <Listado></Listado>
            </div>
        </div>
    )
}