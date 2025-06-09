import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

const LoginForm = ({ onLoginSuccess }) => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!studentId || !password) {
      setError("Please enter both Student ID/Email and Password.");
      return;
    }

    // Simulate login (replace with real API call)
    console.log("Logging in with:", { studentId, password });

    setTimeout(() => {
      onLoginSuccess(); // Replace this with actual auth response
    }, 500);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Student Login
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="studentId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Student ID / Email
          </label>
          <Input
            type="text"
            name="studentId"
            id="studentId"
            autoComplete="username"
            placeholder="Enter your student ID or email"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button type="submit" variant="primary" className="w-full">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
