import React, { useEffect } from 'react';
import Fireworks from './Fireworks'; 
import Santa from './Santa'; 
import "../styles/greeting.css";


const Greeting = () => {
  useEffect(() => {
 
  }, []);

  return (
      <div className="greeting-container">
          <Fireworks /> 
      <h1 className="greeting-message">¡Feliz Navidad!</h1>
      <canvas id="fireworks-canvas"></canvas>

          <Santa />
    </div>
  );
};

export default Greeting;
