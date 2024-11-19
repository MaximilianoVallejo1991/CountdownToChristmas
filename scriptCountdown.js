// Función que calcula el tiempo restante para Navidad
function countdown() {
    // Fecha de Navidad en Argentina (25 de diciembre de 2024)
    const christmasDate = new Date('December 25, 2024 00:00:00 GMT-0300'); // Hora de Argentina (GMT-3)
    
    // Fecha actual
    const now = new Date();

    // Diferencia en milisegundos
    const timeDifference = christmasDate - now;

    // Cálculos
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Mostrar resultados en la página
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Actualizar cada segundo
setInterval(countdown, 1000);

// Llamar a la función una vez al cargar
countdown();
