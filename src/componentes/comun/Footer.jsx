export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contenido">
        <div className="footer-contacto">
          <h4>Contacto Rápido</h4>
          <p><span className="icono">📞</span> +54 2901 123456</p>
          <p><span className="icono">📧</span> atencionvetsur@gmail.com</p>
          <p><span className="icono">📍</span> Magallanes 1234</p>
          <p><span className="icono">🕓</span> Lunes a Sábado: 9:00 a 19:00 hs</p>
        </div>

        <div className="footer-logos">
          <img src="/img/zoetis.png" alt="Zoetis" />
          <img src="/img/elanco.png" alt="Elanco" />
          <img src="/img/virbac.png" alt="Virbac" />
        </div>
      </div>

      <p className="footer-copy">
        © IA Inteligencia Artesanal. Todos los Derechos Reservados
      </p>
    </footer>
  );
}
