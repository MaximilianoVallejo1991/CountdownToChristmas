import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./../styles/countdownStyles.css";
import Snowfall from "./Snowfall";
import { calculateCountdown } from "./../utils/CountdownUtils";

function Countdown() {
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });  // Inicializamos con valores por defecto
  
  const [selectedTimezone, setSelectedTimezone] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();

  
  const params = new URLSearchParams(location.search);
  const selectedEvent = params.get("event"); // Obtén el evento desde la URL
  const targetDateParam = params.get("date");
  const targetDate = targetDateParam ? new Date(targetDateParam) : null;

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
      if (selectedTimezone && targetDate) {
        const countdown = calculateCountdown(targetDate, selectedTimezone);
        if (countdown) {
          setTimeRemaining(countdown);
        } else {
          navigate(`/MerryChristmas?event=${encodeURIComponent(selectedEvent)}`);
        }
      }
    }, 1000);
  
    return () => clearInterval(interval);
  }, [selectedTimezone, targetDate, navigate]);
  



  return (
    <div className="countdown-page">
      <Snowfall />
      <div className="container">
        <h1>Cuenta Regresiva para Navidad en:</h1>
        <div className="country-info">
          <h2>{countryName}</h2>
          {flag && <img className = "flag" src={flag} alt={`Bandera de ${countryName}`} />}
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




