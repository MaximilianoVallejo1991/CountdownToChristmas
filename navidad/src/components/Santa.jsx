import React, { useEffect, useState } from "react";
import "../styles/santa.css";

const Santa = () => {
  const [frame, setFrame] = useState(1); // Estado para manejar el fotograma actual

  useEffect(() => {
    const totalFrames = 11; // Total de imágenes
    let animationFrameId;
    let lastFrameTime = performance.now(); // Momento inicial

    const animate = (timestamp) => {
      const elapsed = timestamp - lastFrameTime;

      if (elapsed >= 200) { // Cambia el frame cada 100ms (ajusta para velocidad)
        setFrame((prevFrame) => (prevFrame % totalFrames) + 1);
        lastFrameTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId); // Limpia la animación al desmontar el componente
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
