const API_BASE = "https://api.restcountries.com/countries/v5";
const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY;

// Solo pedimos lo que la app realmente usa: nombre común + traducciones
// (para el español), timezones, y el código alpha-2 (para armar la URL
// de la bandera). Esto reduce el payload y evita gastar cuota en campos
// que no mostramos (leaders, currencies, geography, etc).
const FIELDS = "names.common,names.translations,timezones,codes.alpha_2";

// El plan free tiene un límite de 100 registros por página; hay ~250
// países, así que hace falta paginar.
const PAGE_SIZE = 100;

// Cacheamos en localStorage para no gastar cuota (500 req/mes en el plan
// free) en cada visita: los campos estáticos del dataset se revisan
// semanalmente, así que 24hs de cache es más que suficiente.
const CACHE_KEY = "countriesCache";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

// CDN gratuito de banderas: no requiere API key ni consume cuota.
// https://restcountries.com/docs/countries#free-flag-cdn
const flagUrl = (alpha2) =>
  `https://flags.restcountries.com/v5/w320/${alpha2.toLowerCase()}.png`;

const buildUrl = (offset) => {
  const params = new URLSearchParams({
    response_fields: FIELDS,
    limit: String(PAGE_SIZE),
    offset: String(offset),
  });
  return `${API_BASE}?${params.toString()}`;
};

const fetchPage = async (offset) => {
  const response = await fetch(buildUrl(offset), {
    headers: { Authorization: `Bearer ${API_KEY}` },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = body?.errors?.[0]?.message || response.statusText;
    throw new Error(`Error ${response.status} al obtener países: ${message}`);
  }

  const { data } = await response.json();
  return data;
};

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { timestamp, countries } = JSON.parse(raw);
    if (!countries || Date.now() - timestamp > CACHE_TTL_MS) return null;
    return countries;
  } catch {
    return null;
  }
};

const writeCache = (countries) => {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), countries })
    );
  } catch {
    // localStorage puede no estar disponible (modo privado, cuota llena, etc.)
    // No es crítico: simplemente no se cachea.
  }
};

export const fetchCountries = async () => {
  const cached = readCache();
  if (cached) return cached;

  if (!API_KEY) {
    throw new Error(
      "Falta VITE_RESTCOUNTRIES_API_KEY. Copiá .env.example a .env y completá tu key (https://restcountries.com/sign-up)."
    );
  }

  // Trae todas las páginas hasta que la API indique que no hay más.
  let offset = 0;
  let objects = [];
  while (true) {
    const page = await fetchPage(offset);
    objects = objects.concat(page.objects);
    if (!page.meta.more) break;
    offset += PAGE_SIZE;
  }

  const countries = objects
    // Un puñado de territorios en disputa (Abjasia, Somalilandia, etc.) no
    // tienen código ISO alpha-2, así que no hay bandera del CDN para ellos.
    // El dataset viejo (v3.1) tampoco los incluía; los dejamos afuera.
    .filter((country) => country.codes?.alpha_2)
    .map((country) => ({
      name: country.names.translations?.spa?.common || country.names.common,
      timezones: country.timezones?.length ? country.timezones : ["No disponible"],
      flag: flagUrl(country.codes.alpha_2),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  writeCache(countries);
  return countries;
};
