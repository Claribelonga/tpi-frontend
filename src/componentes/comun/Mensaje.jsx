export default function Mensaje({ texto, tipo }) {
  if (!texto) return null;

  return (
    <div className={`mensaje-alerta ${tipo}`}>
      {texto}
    </div>
  );
}