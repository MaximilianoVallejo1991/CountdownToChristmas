import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({});
  const [selectedTimezone, setSelectedTimezone] = useState(null); // Zona horaria seleccionada
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener parámetros de la URL
  const params = new URLSearchParams(location.search);
  const countryName = params.get("country");
  const flag = params.get("flag");
  const timezones = JSON.parse(decodeURIComponent(params.get("timezones"))); // Decodificar y parsear

  useEffect(() => {
    // Seleccionar por defecto la primera zona horaria
    if (timezones.length > 0 && !selectedTimezone) {
      setSelectedTimezone(timezones[0]);
    }
  }, [timezones]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedTimezone) {
        const countdown = calculateCountdown(selectedTimezone);
        setTimeRemaining(countdown);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone]);

  if (!timeRemaining) return <h1>¡Feliz Navidad!</h1>;

  return (
    <div className="countdown-page">
      <Snowfall />
      <div className="container">
        <h1>Cuenta Regresiva para Navidad</h1>
        <div className="country-info">
          <h2>{countryName}</h2>
          {flag && <img src={flag} alt={`Bandera de ${countryName}`} />}
          <p>Zonas Horarias:</p>
          {timezones.length > 1 ? (
            <select
            value={selectedTimezone || ""}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
          
          ) : (
            <p>{timezones[0]}</p>
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
