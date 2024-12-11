import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import { FlagCard } from "./FlagCard";
import { getTimezoneFromLatLng } from "../utils/timezoneUtils"; // Importamos la nueva función.
import "./../styles/homeStyles.css";
import Snowfall from "./Snowfall";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries()
      .then((data) => {
        console.log("Datos obtenidos de la API:", data);
        setCountries(data);
      })
      .catch(console.error);
  }, []);

  const handleFlagClick = (name, timezone, flag, capitalInfo) => {
    let selectedTimezone = timezone;

    console.log("Inicial: Zona horaria obtenida desde API:", timezone);
    console.log("Capital Info:", capitalInfo);

    // Intentar calcular la zona horaria a partir de la latitud y longitud de la capital
    if (Array.isArray(timezone) && timezone.length > 1 && capitalInfo) {
      const timezoneFromCapital = getTimezoneFromLatLng(capitalInfo);
      console.log("Zona horaria calculada desde la capital:", timezoneFromCapital);

      if (timezoneFromCapital) {
        selectedTimezone = timezoneFromCapital;
        console.log("Zona horaria seleccionada (calculada):", selectedTimezone);
      } else {
        console.log("No se pudo calcular la zona horaria desde las coordenadas.");
      }
    }

    console.log("Final: Zona horaria seleccionada para redirección:", selectedTimezone);

    // Redirigir con la zona horaria seleccionada
    // window.location.href = `/countdown?country=${name}&timezone=${selectedTimezone}&flag=${encodeURIComponent(
    //   flag
    // )}`;
  };

  return (
    <div className="home-container">
      <Snowfall />
      <h1>Bienvenidos a la Cuenta Regresiva para Navidad</h1>
      <p>Haz clic en la bandera para comenzar</p>
      <div className="flags-container">
        {countries.map((country) => (
          <FlagCard
            key={country.name}
            name={country.name}
            flag={country.flag}
            timezone={country.timezone}
            onClick={() =>
              handleFlagClick(country.name, country.timezone, country.flag, country.capitalInfo)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
