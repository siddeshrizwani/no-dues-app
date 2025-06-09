import React, { useState, useEffect, useRef } from "react";
import useAppData from "../hooks/useAppData";
import {
  FaUserGraduate,
  FaUserShield,
  FaUserTie,
  FaArrowLeft,
} from "react-icons/fa";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

/**
 * A reusable login form component with an improved, focused design.
 * It appears after a user selects their role.
 * @param {{ role: 'student' | 'department' | 'admin', onBack: () => void }} props
 */
const LoginForm = ({ role, onBack }) => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAppData();
  const firstInputRef = useRef(null);

  // Automatically focus the first input field when the form appears
  useEffect(() => {
    if (firstInputRef.current) {
      setTimeout(() => firstInputRef.current.focus(), 100);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would validate credentials here before logging in.
    console.log(
      `Attempting to log in as ${role} with credential: ${credential}`
    );
    login({ role });
  };

  const placeholder =
    role === "student" ? "Student ID or University Email" : "Staff ID or Email";

  return (
    <div className="w-full animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors duration-200"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 capitalize">
        {role} Login
      </h2>
      <p className="text-gray-500 mb-8">Please enter your credentials.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          innerRef={firstInputRef}
          name="credential"
          placeholder={placeholder}
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="pt-2">
          <Button type="submit" variant="primary" className="w-full !py-3">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

/**
 * The main login page for the application, featuring a two-step flow.
 */
const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const RoleButton = ({ role, icon, label }) => (
    <button
      // FIX: This now sets the selected role state instead of logging in directly.
      onClick={() => setSelectedRole(role)}
      className="w-full text-left p-4 bg-gray-50 border border-gray-200 rounded-lg group hover:bg-white hover:border-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300"
    >
      <div className="flex items-center">
        <div className="bg-white text-gray-500 p-3 rounded-lg border border-gray-200 group-hover:bg-gray-800 group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <span className="ml-4 font-semibold text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Sunyam</h1>
          <p className="text-gray-500 mt-2">No Dues Certificate Portal</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 transition-all duration-500 min-h-[400px] flex items-center">
          {/* Conditionally render either the role selector or the login form */}
          {selectedRole ? (
            <LoginForm
              role={selectedRole}
              onBack={() => setSelectedRole(null)}
            />
          ) : (
            <div className="w-full animate-fade-in">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Select Your Role
              </h2>
              <div className="space-y-4">
                <RoleButton
                  role="student"
                  icon={<FaUserGraduate />}
                  label="I am a Student"
                />
                <RoleButton
                  role="department"
                  icon={<FaUserTie />}
                  label="I am Department Staff"
                />
                <RoleButton
                  role="admin"
                  icon={<FaUserShield />}
                  label="I am an Administrator"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
