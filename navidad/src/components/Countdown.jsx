import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isGreeting, setIsGreeting] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState(""); // Inicializar vacío
  const [timezones, setTimezones] = useState([]); // Arreglo de zonas horarias
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedEvent = params.get("event");
  const targetDateParam = params.get("date");
  const nextYearDateParam = params.get("nextYearDate");
  const targetDate = targetDateParam ? new Date(targetDateParam) : null;
  const nextYearDate = nextYearDateParam ? new Date(nextYearDateParam) : null;
  const countryName = params.get("country");
  const flag = params.get("flag");

  // Decodificar y configurar timezones desde los parámetros
  useEffect(() => {
    const timezonesParam = params.get("timezones");
    if (timezonesParam) {
      try {
        const decodedTimezones = JSON.parse(decodeURIComponent(timezonesParam));
        setTimezones(decodedTimezones);
      } catch (error) {
        console.error("Error al decodificar las zonas horarias:", error);
        setTimezones([]);
      }
    }
  }, [location.search]);

  // Calcular el conteo regresivo solo cuando se selecciona una zona horaria
  useEffect(() => {
    if (!selectedTimezone) return;

    const interval = setInterval(() => {
      const now = new Date();
      const countdown = calculateCountdown(now > targetDate ? nextYearDate : targetDate, selectedTimezone);

      if (countdown) {
        setTimeRemaining(countdown);

        const diff = countdown.days;
        if (365 > diff && diff >= 364) {
          setIsGreeting(true);
        } else {
          setIsGreeting(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone, targetDate, nextYearDate]);

  // Redirección si es tiempo de saludo
  if (isGreeting) {
    navigate(`/MerryChristmas?event=${encodeURIComponent(selectedEvent)}`);
    return null;
  }

  return (
    <div className="countdown-page">
      <Snowfall />
      <div className="container">
        <h1>Cuenta Regresiva para {selectedEvent} en:</h1>
        <div className="country-info">
          <h2>{countryName}</h2>
          {flag && <img className="flag" src={flag} alt={`Bandera de ${countryName}`} />}
          <p>Zonas Horarias:</p>
          <select
            value={selectedTimezone}
            onChange={(e) => setSelectedTimezone(e.target.value)}
          >
            <option value="">Seleccionar</option>
            {timezones.map((timezone, index) => (
              <option key={index} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>
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
