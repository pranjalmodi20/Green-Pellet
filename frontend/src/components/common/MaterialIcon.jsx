import React from 'react';

const MaterialIcon = ({ icon, className = '', fill = false, weight = 300 }) => {
  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' 24`
      }}
    >
      {icon}
    </span>
  );
};

export default MaterialIcon;
