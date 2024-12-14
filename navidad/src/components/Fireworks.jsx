import React, { useEffect } from 'react';

const Fireworks = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('fireworks-canvas'); // Añadimos una clase al canvas
    const ctx = canvas.getContext('2d');
    document.querySelector('.fireworks-container').appendChild(canvas); // Agregarlo al contenedor adecuado

    const fireworks = [];

    class Firework {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.particles = [];
        for (let i = 0; i < 60; i++) {
          this.particles.push(new Particle(this.x, this.y, this.color));
        }
      }

      update() {
        this.particles.forEach(p => p.update());
      }

      draw() {
        this.particles.forEach(p => p.draw());
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.alpha = 1.5;
        this.gravityDelay = Math.random() * 100 + 1; // Tiempo antes de que la gravedad afecte
        this.timeAlive = 0; // Para llevar el conteo de la vida útil de la partícula
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.timeAlive++; // Aumenta el contador de vida de la partícula

        // Si ha pasado el tiempo de espera, se aplica la gravedad (desplazar hacia abajo)
        if (this.timeAlive > this.gravityDelay) {
          this.speedY += 0.02; // Aumenta la velocidad en Y (gravedad simulada)
        }

        this.alpha -= 0.01; // La opacidad disminuye con el tiempo
      }

      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      fireworks.push(new Firework(x, y, color));
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fireworks.forEach((firework, index) => {
        firework.update();
        firework.draw();
        if (firework.particles[0].alpha <= 0) {
          fireworks.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const interval = setInterval(createFirework, 500);
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => {
      clearInterval(interval);
      document.querySelector('.fireworks-container').removeChild(canvas);
    };
  }, []);

  return <div className="fireworks-container"></div>;  // Añadimos un contenedor para los fuegos artificiales
};

export default Fireworks;
