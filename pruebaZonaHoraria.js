document.addEventListener('DOMContentLoaded', function () {
    const country = 'argentina'; // Nombre del país
    const apiUrl = `https://restcountries.com/v3.1/name/${country}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const countryData = data[0]; // Obtener los datos del primer país
            const countryName = countryData.name.common;
            const flagUrl = countryData.flags.png;
            const timezone = countryData.timezones[0];

            console.log(`País: ${countryName}`);
            console.log(`Bandera: ${flagUrl}`);
            console.log(`Zona horaria: ${timezone}`);
            
            // Mostrar los datos en la página
            const result = document.getElementById('result');
            result.innerHTML = `
                <p>País: ${countryName}</p>
                <img src="${flagUrl}" alt="Bandera de ${countryName}" width="100">
                <p>Zona horaria: ${timezone}</p>
            `;
        })
        .catch(error => {
            console.error('Error al obtener los datos del país:', error);
        });
});
