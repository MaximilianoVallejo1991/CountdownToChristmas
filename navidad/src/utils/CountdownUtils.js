/** 
 * Calcula el tiempo restante hasta la fecha objetivo.
 * @param {string} timezone - Zona horaria en formato "UTC±HH:mm".
 * @returns {Object|null} - Un objeto con días, horas, minutos y segundos, o null si ya pasó la fecha objetivo.
 */


export function calculateCountdown(timezone) {
  const currentYear = new Date().getFullYear();
  const targetDateUTC = new Date( `${currentYear}-11-25T00:00:00Z`   );
  const now = new Date();

  // Calcular el offset de la zona horaria proporcionada
  const offsetMinutes = parseTimezoneOffset(timezone);
  const targetDate = new Date(
    targetDateUTC.getTime() - offsetMinutes * 60 * 1000
  );

  const diff = targetDate - now;

  if (diff > 0) { 
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  } else {
    return null;
  }
}

/**
 * Convierte un offset de zona horaria en minutos.
 * @param {string} offset - Zona horaria en formato "UTC±HH:mm".
 * @returns {number} - Offset en minutos.
 */
function parseTimezoneOffset(offset) {
  const match = offset.match(/([+ -])(\d{2}):?(\d{2})/);
  if (!match) return 0;

  const sign = match[1] === "+" ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = parseInt(match[3], 10);
  return sign * (hours * 60 + minutes);
}
