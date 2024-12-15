import React, { useEffect, useState } from "react";
import "../styles/santa.css";

const Santa = () => {
  const [frame, setFrame] = useState(1); 
  const [xPosition, setXPosition] = useState(0); 
  const [screenWidth] = useState(window.innerWidth);  // No es necesario actualizar aquí en cada renderizado

  useEffect(() => {
    const totalFrames = 11; 
    const animationSpeed = 100; 
    const movementSpeed = 10; 

    const interval = setInterval(() => {
      setFrame((prevFrame) => (prevFrame % totalFrames) + 1);

      // Aseguramos que el Santa no se salga de la pantalla
      setXPosition((prevPosition) => {
        // Si Santa ha salido de la pantalla, lo reiniciamos a la izquierda
        if (prevPosition > screenWidth) {
          return -150; // Restablece a la izquierda de la pantalla
        }
        // De lo contrario, movemos a la derecha
        return prevPosition + movementSpeed;
      });
    }, animationSpeed);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [screenWidth]);

  return (
    <div
      className="santa-container"
      style={{
        left: `${xPosition}px`, // Establece la posición horizontal de Santa
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
