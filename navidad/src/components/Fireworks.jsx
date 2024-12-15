import React, { useEffect } from 'react';

const Fireworks = () => {
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.classList.add('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    // Agregar el canvas al contenedor cuando el componente esté montado
    const fireworksContainer = document.querySelector('.fireworks-container');
    if (fireworksContainer) {
      fireworksContainer.appendChild(canvas);
    }

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
        this.radius = Math.random() * 1 + .5;
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 6 - 3;
        this.alpha = 1.5;
        this.gravityDelay = Math.random() * 100 + 1;
        this.timeAlive = 0;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.timeAlive++;

        if (this.timeAlive > this.gravityDelay) {
          this.speedY += 0.02;
        }

        this.alpha -= 0.01;
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

    // Cleanup cuando el componente se desmonte
    return () => {
      clearInterval(interval);
      // Solo intentamos eliminar el canvas si el contenedor está presente
      const container = document.querySelector('.fireworks-container');
      if (container) {
        container.removeChild(canvas);
      }
    };
  }, []); // El efecto se ejecuta solo una vez cuando se monta el componente

  return <div className="fireworks-container"></div>;
};

export default Fireworks;
