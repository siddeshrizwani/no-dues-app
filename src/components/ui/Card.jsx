import React from "react";

const Card = ({ children, className = "", title }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
