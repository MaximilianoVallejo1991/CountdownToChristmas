import React, { useEffect } from 'react';
import Fireworks from './Fireworks'; 
import Santa from './Santa'; 
import "../styles/greeting.css";
import { useNavigate, useLocation } from "react-router-dom";



const Greeting = () => {
  const navigate = useNavigate();

  useEffect(() => {
 
  }, []);

  return (
      <div className="greeting-container">
      <h1 className="greeting-message">¡Feliz Navidad!</h1>
      
      <footer>
          <button onClick={() => navigate("/")} className="back-button">
            Regresar a la Página de Inicio
          </button>
        </footer>
      <canvas id="fireworks-canvas"></canvas>

          <Fireworks /> 
          <Santa />
    </div>
  );
};

export default Greeting;
