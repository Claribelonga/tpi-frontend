export default function Footer(){
    return(
        <footer className="footer">
      <div className="footer-contenido">
        <div className="contacto">
          <h4>Contacto Rápido</h4>
          <p>📞 +54 2901 123456</p>
          <p>📧 atencionvetsur@gmail.com</p>
          <p>📍 Magallanes 1234</p>
        </div>

        <div className="logos">
          <img src="/img/zoetis.png" alt="Zoetis" />
          <img src="/img/elanco.png" alt="Elanco" />
          <img src="/img/virbac.png" alt="Virbac" />
        </div>
      </div>

      <p className="footer-copy">
        ©IA Inteligencia Artesanal. Todos los Derechos Reservados
      </p>
    </footer>
    )
}