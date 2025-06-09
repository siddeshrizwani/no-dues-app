import React from "react";
import { Link } from "react-router-dom";
import useAppData from "../hooks/useAppData";
import Button from "../components/common/Button";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * A user-friendly 404 Not Found page.
 * Displayed when a user navigates to a URL that does not match any defined routes.
 * The "Go to Homepage" button intelligently directs users to the correct page.
 */
const NotFound = () => {
  const { user } = useAppData();

  // Determine the correct "home" path based on authentication status and role
  const getHomePath = () => {
    if (!user) {
      return "/login"; // If not logged in, homepage is the login page
    }
    // If logged in, direct to the specific role's dashboard
    switch (user.role) {
      case "admin":
        return "/admin/dashboard";
      case "department":
        return "/dept/dashboard";
      case "student":
      default:
        return "/student/dashboard";
    }
  };

  const homePath = getHomePath();

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center p-4 bg-gray-50">
      <FaExclamationTriangle className="text-yellow-400 text-6xl mb-6" />
      <h1 className="text-5xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-4">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link to={homePath}>
        <Button className="mt-8" variant="primary">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
