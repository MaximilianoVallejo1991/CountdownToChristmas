import React, { useEffect, useState } from "react";
import "../styles/santa.css";

const Santa = () => {
  const [frame, setFrame] = useState(1); // Estado para manejar el fotograma actual

  useEffect(() => {
    const totalFrames = 11; // Total de imágenes
    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame % totalFrames) + 1); // Cambia al siguiente fotograma
    }, 100); // Velocidad de cambio de fotograma (ajústalo según la animación)

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="santa-container">

      <img
        src={`/assets/santa/Run(${frame}).png`}
        alt="Dancing Santa"
        className="santa-pixel-art"
      />
    </div>
  );
  
};

export default Santa;
