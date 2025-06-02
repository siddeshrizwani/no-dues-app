import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar'; // Assuming a simple top navbar

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simple auth state

  // In a real app, you'd have a more robust auth check
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Potentially clear tokens, etc.
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {isAuthenticated && <Sidebar onLogout={handleLogout} />}
      <div className="flex-1 flex flex-col overflow-hidden">
        {isAuthenticated && <Navbar />} {/* Simple Navbar, adjust as needed */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Routes>
            <Route
              path="/login"
              element={!isAuthenticated ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/"
              element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
            />
            {/* Add other routes here, e.g., for specific due details, profile, etc. */}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;