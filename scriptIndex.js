document.addEventListener('DOMContentLoaded', function () {
    const countries = ['argentina', 'brazil', 'mexico', 'france', 'japan']; // Lista de países
    const flagsContainer = document.getElementById('flags-container'); // Contenedor de las tarjetas

    // Iteramos sobre la lista de países
    countries.forEach(country => {
        fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(response => response.json())
            .then(data => {
                const countryData = data[0]; // Obtenemos el primer resultado (solo uno por país)
                const flagUrl = countryData.flags.png; // URL de la bandera
                const countryName = countryData.name.common; // Nombre del país
                const timezone = countryData.timezones[0]; // Zona horaria (usamos el primer valor si hay varios)

                // Creamos una tarjeta (div) para la bandera
                const card = document.createElement('div');
                card.classList.add('flag-card');
                
                // Creamos el contenido de la tarjeta
                card.innerHTML = `
                    <a href="countdown.html?country=${country}&timezone=${timezone}">
                        <img src="${flagUrl}" alt="Bandera de ${countryName}" class="flag-img">
                        <p>${countryName}</p>
                    </a>
                `;

                // Añadimos la tarjeta al contenedor de banderas
                flagsContainer.appendChild(card);
            })
            .catch(error => console.error('Error al obtener la bandera de', country, error));
    });
});


