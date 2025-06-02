import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 px-4 py-12">
      {/* The wrapper div in App.jsx handles overall layout, so LoginPage itself can be simpler */}
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default LoginPage;
