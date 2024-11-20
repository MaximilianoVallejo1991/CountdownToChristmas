document.addEventListener('DOMContentLoaded', function () {
    // Función que calcula el tiempo restante para Navidad
    function countdown() {
        // Obtener los parámetros de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const country = urlParams.get('country'); // País
        const timezone = urlParams.get('timezone'); // Zona horaria

        // Ajustar la hora de Navidad según la zona horaria del país
        const christmasDate = new Date(`November 25, 2024 00:00:00 UTC`);  // Asegúrate de que la fecha base esté en UTC
        christmasDate.setHours(christmasDate.getHours() + getTimezoneOffset(timezone)); // Ajusta la fecha según la zona horaria

        console.log(`Fecha de Navidad en ${country}: ${christmasDate}`);

        // Fecha actual en la zona horaria seleccionada
        const now = new Date();

        // Calcular la diferencia en milisegundos
        const timeDifference = christmasDate - now;

        // Si la diferencia es negativa, ya ha pasado la fecha de Navidad
        if (timeDifference <= 0) {
            document.getElementById('countdown').innerHTML = "¡Feliz Navidad!";
            return;
        }

        // Cálculos de días, horas, minutos y segundos
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Actualizar los valores en la página
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    // Función para obtener el desplazamiento de la zona horaria en horas
    function getTimezoneOffset(timezone) {
        // Aquí debes ajustar el cálculo dependiendo del formato del parámetro "timezone"
        // Ejemplo: "GMT-03:00", "GMT+02:00", etc.
        const offsetSign = timezone.charAt(3);  // El signo + o -
        const offsetHour = parseInt(timezone.substring(4, 6), 10);  // Las dos primeras cifras después de GMT
        const offsetMinutes = parseInt(timezone.substring(7, 9), 10);  // Las dos últimas cifras después de GMT

        let offset = offsetHour + (offsetMinutes / 60);  // Convertir a horas decimales
        if (offsetSign === '-') {
            offset = -offset; // Si el signo es negativo, restamos el desplazamiento
        }

        return offset;
    }

    // Actualizar la cuenta regresiva cada segundo
    setInterval(countdown, 1000);

    // Llamar a la función una vez al cargar para mostrar la cuenta regresiva
    countdown();
});
