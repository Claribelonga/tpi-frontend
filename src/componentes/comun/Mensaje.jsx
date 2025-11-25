
export default function Mensaje({ texto, tipo, visible }) {
  if (!visible) return null;

  return (
    <div className={`mensaje-toast ${tipo}`}>
      <p>{texto}</p>
    </div>
  );
}
