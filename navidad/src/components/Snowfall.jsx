import React, { useEffect } from "react";


const Snowfall = () => {
  useEffect(() => {
    const snowContainer = document.querySelector(".snowfall");
    const numberOfSnowflakes = 100;

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snow");

      // Generar propiedades CSS aleatorias
      const left = Math.random();
      const duration = Math.random() * 3 + 3;
      const delay = Math.random() * 2;

      snowflake.style.setProperty("--snow-left", left);
      snowflake.style.setProperty("--fall-duration", `${duration}s`);
      snowflake.style.setProperty("--fall-delay", delay);

      snowContainer.appendChild(snowflake);
    }

    // Limpieza al desmontar el componente
    return () => {
      while (snowContainer.firstChild) {
        snowContainer.removeChild(snowContainer.firstChild);
      }
    };
  }, []);

  return <div className="snowfall"></div>;
};

export default Snowfall;
