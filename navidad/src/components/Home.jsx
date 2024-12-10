import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import { FlagCard } from "./FlagCard";
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

  const handleFlagClick = (name, timezone, flag) => {
    window.location.href = `/countdown?country=${name}&timezone=${timezone}&flag=${encodeURIComponent(flag)}`;
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
            onClick={() => handleFlagClick(country.name, country.timezone, country.flag)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
