import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const countdown = calculateCountdown();
      setTimeRemaining(countdown);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!timeRemaining) return <h1>¡Feliz Navidad!</h1>;

  return (
    <div className="countdown-page">
      <Snowfall />
      <div className="container">
        <h1>Cuenta Regresiva para Navidad</h1>
        <div id="countdown">
          <div className="time-box">
            <span>{timeRemaining.days}</span>
            <p>Días</p>
          </div>
          <div className="time-box">
            <span>{timeRemaining.hours}</span>
            <p>Horas</p>
          </div>
          <div className="time-box">
            <span>{timeRemaining.minutes}</span>
            <p>Minutos</p>
          </div>
          <div className="time-box">
            <span>{timeRemaining.seconds}</span>
            <p>Segundos</p>
          </div>
        </div>
        <footer>
          <button onClick={() => navigate("/")} className="back-button">
            Regresar a la Página de Inicio
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Countdown;
