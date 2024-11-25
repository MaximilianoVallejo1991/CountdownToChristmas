document.addEventListener('DOMContentLoaded', function () {
    function parseTimezoneOffset(timezone) {
        const match = timezone.match(/UTC([+ -]\d{2}):(\d{2})/);
        if (!match) return null;

        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        return (hours * 60 + minutes) * 60 * 1000; // Conversión a milisegundos
    }

    function updateCountdown() {
        const urlParams = new URLSearchParams(window.location.search);
        const country = urlParams.get('country');
        const timezone = urlParams.get('timezone');

        if (!country || !timezone) {
            console.error("Faltan parámetros en la URL: 'country' y/o 'timezone'.");
            return;
        }

        const offset = parseTimezoneOffset(timezone);
        if (offset === null) {
            console.error('Formato de huso horario no válido:', timezone);
            return;
        }

        const nowUTC = new Date();
        const countryTime = new Date(nowUTC.getTime() + offset);

        const christmasDate = new Date(Date.UTC(2024, 11, 25, 0, 0, 0)); // Navidad UTC
        const remainingTime = christmasDate - countryTime;

        if (remainingTime <= 0) {
            document.getElementById('countdown').innerHTML = "¡Feliz Navidad!";
            return;
        }

        const seconds = Math.floor(remainingTime / 1000);
        const days = Math.floor(seconds / (60 * 60 * 24));
        const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((seconds % (60 * 60)) / 60);
        const secs = seconds % 60;

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = secs;
    }

    // Ejecutar inmediatamente y actualizar cada segundo
    setInterval(updateCountdown, 1000);
    updateCountdown();
});
