const API = "https://restcountries.com/v3.1/all";

export const fetchCountries = async () => {
  const response = await fetch(API);
  const data = await response.json();

  // Mapeamos y ordenamos los datos
  return data
    .map((country) => ({
      name: country.name.common,
      timezones: country.timezones || ["No disponible"], // Guardamos todas las timezones o un arreglo indicando "No disponible"
      flag: country.flags.png,
    }))
    .sort((a, b) => a.name.localeCompare(b.name)); // Ordenamos alfabéticamente por el nombre
};
