// src/utils/timezoneUtils.js

/**
 * Obtiene la zona horaria UTC en base a las coordenadas de latitud y longitud.
 * @param {number[]} latlng - Coordenadas [latitud, longitud].
 * @returns {string} - Zona horaria en formato UTC±HH:mm.
 */
export function getTimezoneFromLatLng(latlng) {
    if (!latlng || latlng.length < 2) {
      return "UTC"; // Valor predeterminado si no hay coordenadas.
    }
  
    const [lat, lng] = latlng;
  
    // Calcular el desplazamiento en minutos.
    const offsetMinutes = Math.round((lng / 15) * 60);
  
    // Convertir el desplazamiento en formato "UTC±HH:mm".
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const absOffset = Math.abs(offsetMinutes);
    const hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    const minutes = String(absOffset % 60).padStart(2, "0");
  
    return `UTC${sign}${hours}:${minutes}`;
  }
  