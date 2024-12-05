import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import "./../styles/homeStyles.css";

function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries()
      .then(setCountries)
      .catch(console.error);
  }, []);


  

  return (
    <div className="home-container">
      <h1>Bienvenidos a la Cuenta Regresiva para Navidad</h1>
      <p>Haz clic en la bandera para comenzar</p>
      <div className="flags-container">
        {countries.map((country) => (
          <a
            key={country.name}
            href={`/countdown?country=${country.name}&timezone=${country.timezone}`}
          >
            <div className="flag-card">
              <img
                src={country.flag}
                alt={`Bandera de ${country.name}`}
                className="flag-img"
              />
              <p>{country.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Home;
