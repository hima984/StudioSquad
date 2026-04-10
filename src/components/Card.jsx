import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm border border-earth-brown/10 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default Card;
