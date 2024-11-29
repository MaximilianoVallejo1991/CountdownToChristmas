const API = `https://restcountries.com/v3.1`;

// Función para hacer peticiones a la API
function fetchData(urlApi) {
    return fetch(urlApi);
}

// Seleccionamos el contenedor de las tarjetas
const flagsContainer = document.getElementById('flags-container');

// Petición a la API
fetchData(`${API}/all`)
    .then(response => response.json())
    .then(data => {
        // Iteramos sobre todos los países
        data.forEach(country => {
            const flagUrl = country.flags.png; // URL de la bandera
            const countryName = country.name.common; // Nombre del país
            const timezone = country.timezones ? country.timezones[0] : 'No disponible'; // Zona horaria
            
            // Creamos una tarjeta (div) para cada país
            const card = document.createElement('div');
            card.classList.add('flag-card');
            
            // Creamos el contenido de la tarjeta
            card.innerHTML = `
                <a href="countdown.html?country=${countryName}&timezone=${timezone}">
                    <img src="${flagUrl}" alt="Bandera de ${countryName}" class="flag-img">
                    <p>${countryName}</p>
                </a>
            `;
            
            // Añadimos la tarjeta al contenedor
            flagsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));
