import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isGreeting, setIsGreeting] = useState(false); // Nueva variable para el saludo
  const [selectedTimezone, setSelectedTimezone] = useState(null); 
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
  const timezones = JSON.parse(decodeURIComponent(params.get("timezones")));

  useEffect(() => {
    if (timezones.length > 0 && !selectedTimezone) {
      setSelectedTimezone(timezones[0]);
    }
  }, [timezones]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      // Calcular la diferencia con la fecha objetivo
      const countdown = calculateCountdown(now > targetDate ? nextYearDate : targetDate, selectedTimezone);
      
      if (countdown) {
        setTimeRemaining(countdown);
        
        // Obtener la diferencia entre la fecha objetivo y la fecha actual
        const diff = countdown.days ;
        
        // Verificar si estamos en las 24 horas de saludo (0 > diff > -24 horas)
        if ( 365  > diff && diff >= 364  ) {
          setIsGreeting(true); // Activar el saludo
        } else {
          setIsGreeting(false); // Dejar de mostrar el saludo
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedTimezone, targetDate, nextYearDate]);

  if (isGreeting) {
    navigate(`/MerryChristmas?event=${encodeURIComponent(selectedEvent)}`); // Redirigir al saludo
    return null; // Evitar que la cuenta regresiva se muestre
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
