import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/fetchCountries";
import { FlagCard } from "./FlagCard";
import "./../styles/homeStyles.css";
import Snowfall from "./Snowfall";

function Home() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showOptions, setShowOptions] = useState(true); // Estado para controlar la visualización de los botones
  const [selectedDate, setSelectedDate] = useState(""); // Estado para la fecha seleccionada

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

  const handleOptionClick = (option) => {
    console.log(`Opción seleccionada: ${option}`);
    setShowOptions(false); // Oculta las opciones y muestra las banderas
  };

  const handleDateSubmit = () => {
    if (!selectedDate) {
      alert("Por favor selecciona una fecha antes de continuar.");
      return;
    }
    console.log(`Fecha seleccionada: ${selectedDate}`);
    setShowOptions(false); // Oculta las opciones y muestra las banderas
  };

  return (
    <div className="home-container">
      <Snowfall />
      <h1>Bienvenidos a la Cuenta Regresiva para Navidad</h1>

      {showOptions ? (
        
        <div className="options-container">

          <div className="options-buttons">
          <p>Selecciona una opción o ingresa una fecha para continuar:</p>
            <button onClick={() => handleOptionClick("Navidad")} className="option-button">
              Navidad
            </button>
            <button onClick={() => handleOptionClick("Año Nuevo")} className="option-button">
              Año Nuevo
            </button>
          </div>

          <div className="date-input-container">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
            <button onClick={handleDateSubmit} className="submit-date-button">
              Usar Fecha
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>Elige una bandera para comenzar</p>

          <input
            type="text"
            placeholder="O busca un país por su nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          <div className="flags-container">
            {filteredCountries.length !== 0 ? (
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
              ))
            ) : (
              <h1>"No encontrado"</h1>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
