import React, { useState } from "react";
import { Link } from "react-router-dom";

const AuthLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Replace with actual logic
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "350px",
      }}
    >
      {/* Email Field */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginBottom: "15px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "10px",
            fontSize: "16px",
            color: "#6b6b6b",
          }}
        >
          📧
        </span>
        <input
          type="email"
          placeholder="Email"
          style={{
            width: "100%",
            padding: "10px 10px 10px 40px", // Add padding to the left for the icon
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      </div>

      {/* Password Field */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          marginBottom: "15px",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "10px",
            fontSize: "16px",
            color: "#6b6b6b",
          }}
        >
          🔒
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          style={{
            width: "100%",
            padding: "10px 10px 10px 40px", // Add padding to the left for the icon
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            fontSize: "16px",
            color: "#6b6b6b",
            cursor: "pointer",
          }}
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>

      {/* Forgot Password */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Link
          to="/forgot-password"
          style={{
            color: "#3B3DBF",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#3B3DBF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Log in
      </button>
    </form>
  );
};

export default AuthLoginForm;
