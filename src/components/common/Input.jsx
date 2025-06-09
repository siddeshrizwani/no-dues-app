import React from "react";

/**
 * A standardized text input component for the application.
 * This version uses a clean, "white grayish" theme and removes all dark mode logic.
 * Styles have been made more explicit to ensure content and placeholder visibility.
 *
 * @param {object} props - The component props.
 * @param {'text' | 'password' | 'email' | 'number' | 'date'} [props.type='text'] - The input type.
 * @param {string} [props.placeholder] - The placeholder text.
 * @param {string} [props.value] - The current value of the input.
 * @param {Function} [props.onChange] - The function to call when the input value changes.
 * @param {string} [props.name] - The name attribute for the input.
 * @param {string} [props.id] - The id attribute for the input.
 * @param {string} [props.className=''] - Additional CSS classes to apply.
 * @param {React.Ref} [props.innerRef] - A ref to be forwarded to the input element.
 */
const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
  className = "",
  innerRef,
}) => {
  return (
    <input
      ref={innerRef}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      id={id || name}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent sm:text-sm transition-all duration-300 ${className}`}
    />
  );
};

export default Input;
