// src/hooks/useMensaje.jsx
import { useState, useCallback } from "react";

export default function useMensaje() {
  const [textoMensaje, setTextoMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState(""); // "error", "exito", "info"
  const [visible, setVisible] = useState(false);

  const mostrarMensaje = useCallback((texto, tipo = "info") => {
    setTextoMensaje(texto);
    setTipoMensaje(tipo);
    setVisible(true);

    // El mensaje desaparece después de 3 segundos
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);

  return { textoMensaje, tipoMensaje, visible, mostrarMensaje };
}
