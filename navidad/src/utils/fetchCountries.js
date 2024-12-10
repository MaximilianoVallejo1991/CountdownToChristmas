const API = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  const response = await fetch(API);
  const data = await response.json();

  // Mapeamos y ordenamos los datos
  return data
    .map((country) => ({
      name: country.name.common,
      timezone: country.timezones ? country.timezones[0] : "No disponible",
      flag: country.flags.png,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Ordenamos alfabéticamente por el nombre
};
