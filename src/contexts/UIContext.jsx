import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context with default values
const UIContext = createContext({
  isSidebarCollapsed: false,
  theme: "light",
  toggleSidebar: () => {},
  toggleTheme: () => {},
});

/**
 * Custom hook to easily access the UI context from any component.
 * @returns {{isSidebarCollapsed: boolean, theme: 'light' | 'dark', toggleSidebar: () => void, toggleTheme: () => void}}
 */
export const useUI = () => useContext(UIContext);

/**
 * Provider component that wraps the application to provide UI state.
 * It manages the sidebar's collapsed state and the application's theme (light/dark),
 * and persists the theme choice to the browser's localStorage.
 */
export const UIProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // This effect runs when the theme state changes.
  // It adds or removes the 'dark' class from the root <html> element,
  // which is necessary for Tailwind's dark mode to work.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = {
    isSidebarCollapsed,
    theme,
    toggleSidebar,
    toggleTheme,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
