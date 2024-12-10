const API = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  const response = await fetch(API);
  const data = await response.json();

  // Agregamos un console.log para ver los datos de la API
  console.log("Datos obtenidos de la API:", data);

  return data.map((country) => ({
    name: country.name.common,
    timezone: country.timezones ? country.timezones[0] : "No disponible",
    flag: country.flags.png,
  }));
};
