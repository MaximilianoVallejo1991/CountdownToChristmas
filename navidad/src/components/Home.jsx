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
  const [selectedEvent, setSelectedEvent] = useState(""); // Evento seleccionado (Navidad o Año Nuevo)
  const [nextYearTargetDateX, setNextYearTargetDateX] = useState(null);
  


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
    const formattedDate = new Date(selectedDate).toISOString();
    window.location.href = `/countdown?country=${encodeURIComponent(
      name
    )}&timezones=${encodeURIComponent(JSON.stringify(timezones))}&flag=${encodeURIComponent(flag)}&date=${encodeURIComponent(formattedDate)}&event=${encodeURIComponent(selectedEvent)}&nextYearDate=${encodeURIComponent(nextYearTargetDateX.toISOString())}`;
 };
  


  // 
  const handleOptionClick = (option) => {
    const currentYear = new Date().getFullYear();
    let targetDateX;
    let nextYearTargetDateX;
  
    if (option === "Navidad") {
      targetDateX = new Date(`${currentYear}-12-16T00:00:00Z`);
      nextYearTargetDateX = new Date(`${currentYear + 1}-12-16T00:00:00Z`);
    } else if (option === "Año Nuevo") {
      targetDateX = new Date(`${currentYear + 0}-12-15T00:00:00Z`);
      nextYearTargetDateX = new Date(`${currentYear + 1}-12-15T00:00:00Z`);
    }
  
    console.log(`Opción seleccionada: ${option}`);
    console.log(`Fecha objetivo: ${targetDateX}`);
    console.log(`Fecha objetivo del próximo año: ${nextYearTargetDateX}`);;
    setSelectedDate(targetDateX);  // Guarda la fecha seleccionada en el estado
    setSelectedEvent(option);     // Guarda el evento seleccionado
    setNextYearTargetDateX(nextYearTargetDateX); // Guarda la fecha del próximo año
    setShowOptions(false);        // Oculta las opciones y muestra las banderas
  };
  
  
  // const handleDateSubmit = () => {
  //   if (!selectedDate) {
  //     alert("Por favor selecciona una fecha antes de continuar.");
  //     return;
  //   }
  //   console.log(`Fecha seleccionada: ${selectedDate}`);
  //   setShowOptions(false); // Oculta las opciones y muestra las banderas
  // };

  return (
    <div className="home-container">
      <Snowfall />
      <h1>Bienvenido a la Pagina de Cuentas Regresivas</h1>

      {showOptions ? (
        
        <div className="options-container">

          <div className="options-buttons">
          <p>Selecciona una opción para continuar:</p>
            <button onClick={() => handleOptionClick("Navidad")} className="option-button">
              Navidad
            </button>
            <button onClick={() => handleOptionClick("Año Nuevo")} className="option-button">
              Año Nuevo
            </button>
          </div>

          {/* <div className="date-input-container">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
            />
            <button onClick={handleDateSubmit} className="submit-date-button">
              Usar Fecha
            </button>
          </div> */}
        </div>
      ) : (
        <>
          <p>Elige un País para continuar</p>

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
