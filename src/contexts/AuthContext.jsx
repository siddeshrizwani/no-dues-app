import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Create the context with default values for auth state
export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// 2. Create a custom hook to easily access the Auth context.
//    By including it in this file, we avoid the need for a separate useAuth.js file.
export const useAuth = () => useContext(AuthContext);

/**
 * 3. Create the Provider component that wraps the application.
 * It manages the user's session and persists it to localStorage.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // On initial load, try to get user from local storage
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      // If parsing fails, clear the invalid data
      localStorage.removeItem("user");
      return null;
    }
  });

  // isAuthenticated is a derived state, true if user object exists.
  const isAuthenticated = !!user;

  const login = (userData) => {
    // In a real app, you'd get user details from an API response
    const fullUserData = { name: "Srijan Suryansh", id: "S12345", ...userData };
    localStorage.setItem("user", JSON.stringify(fullUserData));
    setUser(fullUserData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // The value object provided to consuming components
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
