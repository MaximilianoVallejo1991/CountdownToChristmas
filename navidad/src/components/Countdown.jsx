import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Para manejar navegación en React Router
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";



function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate(); // Hook para redirigir al usuario
  const params = new URLSearchParams(window.location.search);
  const timezone = params.get("timezone") || "UTC";

  useEffect(() => {
    const interval = setInterval(() => {
      const targetDate = new Date("December 25, 2024 00:00:00");
      const now = new Date();
      const offset = parseTimezoneOffset(timezone);
      targetDate.setMinutes(targetDate.getMinutes() - offset);
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeRemaining({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeRemaining(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  function parseTimezoneOffset(offset) {
    const match = offset.match(/([+ -])(\d{2}):?(\d{2})/);
    if (!match) return 0;

    const sign = match[1] === "+" ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);
    return sign * (hours * 60 + minutes);
  }

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
