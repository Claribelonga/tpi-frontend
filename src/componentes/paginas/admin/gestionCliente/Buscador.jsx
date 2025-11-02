
export default function Buscador (){
    return (
        <div className="">
            <span>Buscar Cliente</span>
            <div className="buscador">
                <input type="text"  placeholder="Ingrese DNI" className="input-buscador"/>
                <img src="/img/lupa.png" alt="lupa"className="icono"/>
            </div>
        </div>
    )
}