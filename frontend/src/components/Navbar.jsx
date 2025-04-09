import React, { useState } from "react";
// import { FaTailwind } from "react-icons/fa";

export const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data.token)
      if (response.ok) {
        // Login successful
        console.log("Login successful:", data);
        setIsLoggedIn(true);
        setShowLoginForm(false);
        localStorage.setItem("authToken", data.token);
      } else {
        // Login failed
        console.error("Login failed:", data.message || "Unknown error");
        alert("Login failed: " + (data.message || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full bg-white shadow-md">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-blue-500 font-bold text-xl">
          {/* <FaTailwind size={28} /> */}
          <span>TailwindApp</span>
        </div>

        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Login Form */}
      {!isLoggedIn && showLoginForm && (
        <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-md animate-slide-down">
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
