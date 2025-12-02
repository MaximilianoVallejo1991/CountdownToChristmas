const API = `https://restcountries.com/v3.1`;

// Función para hacer peticiones a la API
function fetchData(urlApi) {
    return fetch(urlApi);
}

// Seleccionamos el contenedor de las tarjetas
const flagsContainer = document.getElementById('flags-container');

// Petición a la API
fetchData(`${API}/all?fields=name,flags,timezones`)
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            const flagUrl = country.flags.png;
            const countryName = country.name.common;
            const timezone = country.timezones ? country.timezones[0] : 'No disponible';

            const card = document.createElement('div');
            card.classList.add('flag-card');
            card.innerHTML = `
                <a href="countdown.html?country=${countryName}&timezone=${timezone}">
                    <img src="${flagUrl}" alt="Bandera de ${countryName}" class="flag-img">
                    <p>${countryName}</p>
                </a>
            `;
            flagsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error al obtener los datos:', error));


// comentario para redeploy forzado
