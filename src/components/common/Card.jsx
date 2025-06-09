import React from "react";

/**
 * A standardized container component for displaying content sections.
 * This version uses a clean, "white grayish" theme.
 * All dark mode logic has been removed for a unified design.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display within the card.
 * @param {string} [props.className=''] - Additional CSS classes to apply.
 * @param {string} [props.title] - An optional title to display at the top of the card.
 */
const Card = ({ children, className = "", title }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
