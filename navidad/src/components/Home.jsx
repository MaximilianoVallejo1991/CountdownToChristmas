import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import { FlagCard } from "./FlagCard";
import "./../styles/homeStyles.css";
import Snowfall from "./Snowfall";

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountries()
      .then((data) => {

        setCountries(data);
        setFilteredCountries(data); 
      })
      .catch(console.error);
  }, []);


  useEffect(() => {

 
    const filtered = countries.filter((country) => {
      const spanishName = country.name.toLowerCase() || ""; 
      return spanishName.includes(searchQuery.toLowerCase());
    });
    setFilteredCountries(filtered);
  }, [searchQuery, countries]);



  const handleFlagClick = (name, timezones, flag) => {
    window.location.href = `/countdown?country=${name}&timezones=${encodeURIComponent(
      JSON.stringify(timezones)
    )}&flag=${encodeURIComponent(flag)}`;
  };

  return (
    <div className="home-container">
      <Snowfall />
      <h1>Bienvenidos a la Cuenta Regresiva para Navidad</h1>
      <p>Elige una bandera para comenzar</p>

        <input
        type="text"
        placeholder="O busca un país por su nombre..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="flags-container">
        
        { filteredCountries.length !== 0 ?  
        filteredCountries.map((country) => (
          <FlagCard
            key={country.name}
            name={country.name}
            flag={country.flag}
            timezones={country.timezones}
            onClick={() =>
              handleFlagClick(country.name, country.timezones, country.flag)
            }
          />
        )): (<h1>"no encontrado"</h1>)}
      </div>
    </div>
  );
}


export default Home;
