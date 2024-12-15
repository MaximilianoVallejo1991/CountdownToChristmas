import React, { useEffect, useState } from "react";
import "../styles/santa.css";

const Santa = () => {
  const [frame, setFrame] = useState(1); 
  const [xPosition, setXPosition] = useState(0); 
  const [screenWidth] = useState(window.innerWidth); 


  useEffect(() => {
    const totalFrames = 11; 
    const animationSpeed = 100; 
    const movementSpeed = 10; 

    const interval = setInterval(() => {
      
      setFrame((prevFrame) => (prevFrame % totalFrames) + 1);

      
      setXPosition((prevPosition) =>         

        prevPosition > screenWidth-10 ? -150 : prevPosition + movementSpeed);

    }, animationSpeed);

    return () => clearInterval(interval);
  }, [screenWidth]);
  return (
    <div
      className="santa-container"
      style={{
        left: `${xPosition}px`, 
      }}
    >
      <img
        src={`/assets/santa/Run(${frame}).png`}
        alt="Dancing Santa"
        className="santa-pixel-art"
      />
    </div>
  );
};

export default Santa;
