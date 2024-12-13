import React from "react";
import PropTypes from "prop-types";
import "./../styles/flagCardStyles.css";

export function FlagCard({ name, flag, timezones, onClick }) {
  return (
    <div className="flag-card" onClick={() => onClick(name, timezones)}>
      <img src={flag} alt={`Bandera de ${name}`} className="flag-img" />
      <p>{name}</p>

    </div>
  );
}

FlagCard.propTypes = {
  name: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  timezones: PropTypes.arrayOf(PropTypes.string).isRequired, // Ahora es un arreglo de strings
  onClick: PropTypes.func.isRequired,
};

// Exportación por defecto
export default FlagCard;
