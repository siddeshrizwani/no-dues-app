import React from "react";
import { useLocation } from "react-router-dom";
import useAppData from "../../hooks/useAppData";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaSearch,
} from "react-icons/fa";

/**
 * The top navigation bar for the application.
 * This version features a refined, modern design with a search bar
 * and improved visual hierarchy for user actions.
 */
const Navbar = () => {
  const { user, logout, toggleSidebar } = useAppData();
  const location = useLocation();

  // Generate a readable page title from the URL path.
  const pageTitle = location.pathname.split("/").pop().replace(/-/g, " ");

  return (
    <nav className="bg-white h-16 flex items-center justify-between px-6 border-b border-gray-200 shrink-0 z-10">
      <div className="flex items-center space-x-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-800 lg:hidden" // Hide on large screens where sidebar is often static
          aria-label="Toggle sidebar"
        >
          <FaBars size={20} />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
          {pageTitle}
        </h1>
      </div>

      {/* Search Bar - Centered */}
      <div className="relative w-full max-w-md hidden md:block">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for students, departments..."
          className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-5">
        <button
          className="text-gray-500 hover:text-gray-800 relative"
          aria-label="Notifications"
        >
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <span className="w-px h-6 bg-gray-200"></span>

        <div className="flex items-center space-x-3">
          <FaUserCircle size={24} className="text-gray-400" />
          <div className="hidden md:flex flex-col items-start -space-y-1">
            <span className="text-sm font-medium text-gray-700">
              {user?.name}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <button
          onClick={logout}
          className="text-gray-500 hover:text-red-600"
          title="Logout"
          aria-label="Logout"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
