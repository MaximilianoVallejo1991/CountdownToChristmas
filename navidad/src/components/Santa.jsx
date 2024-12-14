import React, { useEffect, useState } from "react";
import "../styles/santa.css";

const Santa = () => {
  const [frame, setFrame] = useState(1); // Fotograma actual
  const [xPosition, setXPosition] = useState(0); // Posición horizontal de Santa
  const screenWidth = window.innerWidth; // Ancho de la ventana

  useEffect(() => {
    const totalFrames = 11; // Total de imágenes
    const animationSpeed = 100; // Velocidad de cambio de fotograma
    const movementSpeed = 10; // Velocidad de desplazamiento horizontal

    const interval = setInterval(() => {
      // Actualizar fotograma
      setFrame((prevFrame) => (prevFrame % totalFrames) + 1);

      // Actualizar posición horizontal
      setXPosition((prevPosition) =>
        prevPosition > screenWidth ? -80 : prevPosition + movementSpeed
      );
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [screenWidth]);

  return (
    <div
      className="santa-container"
      style={{
        left: `${xPosition}px`, // Actualizamos la posición horizontal con `left`
      }}
    >
      <img
        src={`/assets/santa/Run(${frame}).png`}
        alt="Dancing Santa"
        className="santa-pixel-art"
      />
    </div>
  );
};

export default Santa;
