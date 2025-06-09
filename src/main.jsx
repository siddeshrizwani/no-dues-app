import React from "react";
import { createRoot } from "react-dom/client";
// FIX: Corrected the path to the main CSS file.
import "./assets/styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext.jsx"; // Import the provider

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* This is the critical fix. By wrapping <App /> here, every component 
        rendered by your router will be a child of AppProvider and can
        safely use the useAppData() hook.
      */}
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
