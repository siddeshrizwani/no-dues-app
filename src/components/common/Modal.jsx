import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * A reusable, accessible modal component redesigned for a cleaner, more modern look.
 * It includes an improved header, a subtle entry animation, and refined spacing.
 * The modal's white background ensures that any standard text passed as children will be clearly visible.
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isVisible - Whether the modal is currently visible.
 * @param {Function} props.onClose - The function to call to close the modal.
 * @param {string} props.title - The title to display in the modal header.
 * @param {React.ReactNode} props.children - The content to display within the modal body.
 */
const Modal = ({ isVisible, onClose, title, children }) => {
  useEffect(() => {
    // Function to handle keydown events for accessibility
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener when the modal is visible
    if (isVisible) {
      document.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]); // Rerun effect if isVisible or onClose changes

  if (!isVisible) return null;

  return (
    // The modal root with a semi-transparent background overlay
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
      onClick={onClose} // Close modal if the overlay is clicked
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* The modal content panel with an enhanced entry animation */}
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4 transform transition-all duration-300 animate-fade-in"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal Header with a light gray background for better separation */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center rounded-t-lg">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body with refined padding */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
