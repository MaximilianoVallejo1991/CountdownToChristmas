document.addEventListener("DOMContentLoaded", () => {
    const starsContainer = document.querySelector('.stars');

    // Generamos un número aleatorio de estrellas
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Asignamos posiciones y duración aleatorias
        const left = Math.random(); // Genera un valor aleatorio entre 0 y 1
        const duration = Math.random() * 3 + 3; // Duración aleatoria entre 3 y 6 segundos

        // Establecemos los valores como variables CSS
        star.style.setProperty('--star-left', left);
        star.style.setProperty('--fall-duration', `${duration}s`);

        starsContainer.appendChild(star);
    }
});