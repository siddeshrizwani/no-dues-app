import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Create the context with default values.
export const AppContext = createContext(null);

// 2. Create a single, unified custom hook for easy access to all app state.
export const useAppData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppData must be used within an AppProvider");
  }
  return context;
};

/**
 * 3. The main Provider component that wraps the entire application.
 * It manages authentication, sidebar state, and the application's theme.
 */
export const AppProvider = ({ children }) => {
  // --- Authentication State ---
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const fullUserData = { name: "Srijan Suryansh", id: "S12345", ...userData };
    localStorage.setItem("user", JSON.stringify(fullUserData));
    setUser(fullUserData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // --- UI State ---
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  // Combine all state and functions into a single value object
  const value = { user, login, logout, isSidebarCollapsed, toggleSidebar };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
