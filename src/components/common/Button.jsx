import React from "react";

/**
 * A standardized button component for the application.
 * This version uses a clean, "white grayish" theme with no blue colors.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {Function} [props.onClick] - The function to call when the button is clicked.
 * @param {'button' | 'submit' | 'reset'} [props.type='button'] - The button's type.
 * @param {'primary' | 'secondary'} [props.variant='primary'] - The button's visual style.
 * @param {string} [props.className=''] - Additional CSS classes to apply.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
