

// Esperamos que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', function () {
    // Hacemos la solicitud a la API de Restcountries para obtener los datos de Argentina
    fetch('https://restcountries.com/v3.1/name/argentina')
        .then(response => response.json()) // Convertimos la respuesta a formato JSON
        .then(data => {
            // Extraemos la URL de la bandera en formato PNG
            const banderaUrl = data[0].flags.png;
            
            // Actualizamos el atributo 'src' de la imagen con la URL de la bandera
            document.getElementById('argentina-flag').src = banderaUrl;
        })
        .catch(error => console.error('Error al obtener la bandera:', error));
});
