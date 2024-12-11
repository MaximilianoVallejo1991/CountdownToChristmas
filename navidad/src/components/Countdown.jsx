import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener parámetros de la URL
  const params = new URLSearchParams(location.search);
  const countryName = params.get("country");
  const timezone = params.get("timezone");
  const flag = params.get("flag");
  const basedOnCapital = params.get("basedOnCapital") === "true"; // Nuevo parámetro

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
        <div className="country-info">
          <h2>{countryName}</h2>
          {flag && <img src={flag} alt={`Bandera de ${countryName}`} />}
          <p>Zona Horaria: {timezone}</p>
          {basedOnCapital && (
            <p className="capital-warning">
              <strong>Nota:</strong> El cálculo se basa en la zona horaria de la capital.
            </p>
          )}
        </div>
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
