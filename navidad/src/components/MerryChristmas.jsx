import React, { useEffect } from 'react';
import "../styles/greeting.css";
import Fireworks from './Fireworks'; // Asegúrate de importar el componente Fireworks

const Greeting = () => {
  useEffect(() => {
    // Puedes agregar lógica aquí si es necesario
  }, []);

  return (
      <div className="greeting-container">
          <Fireworks /> 
      <h1 className="greeting-message">¡Feliz Navidad!</h1>
      <canvas id="fireworks-canvas"></canvas>
    </div>
  );
};

export default Greeting;
