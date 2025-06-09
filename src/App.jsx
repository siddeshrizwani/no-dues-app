import React from "react";
import AppRoutes from "./routes";

/**
 * The main App component.
 * Its only responsibility is to render the application's routes.
 * All context-related logic is handled by the AppProvider and its children.
 */
function App() {
  // This component should not call useAppData() directly,
  // as it is not a child of the AppProvider in main.jsx.
  // The theme logic has been removed as it's already handled correctly
  // within the AppContext.
  return <AppRoutes />;
}

export default App;
