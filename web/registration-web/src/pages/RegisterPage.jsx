import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Import ToastUtils
import { register } from "../services/UserService"; // Backend registration API service

const RegisterPage = () => {
  const [email, setEmail] = useState(""); // Email input value
  const [password, setPassword] = useState(""); // Password input value
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for button
  const navigate = useNavigate();

  // Form validation
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      ToastUtils.error("All fields are required!");
      return false;
    }
    if (!emailRegex.test(email)) {
      ToastUtils.error("Invalid email format!");
      return false;
    }
    if (password.length < 8) {
      ToastUtils.error("Password must be at least 8 characters long!");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const response = await register(email, password); // Call the backend API
      if (response.success) {
        ToastUtils.success("Registration successful!");
        navigate("/welcome", { state: { message: response.message } }); // Pass welcome message to WelcomePage
      } else {
        ToastUtils.error(response.message || "Registration failed!");
      }
    } catch (err) {
      ToastUtils.error(err.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        height: "100vh",
        backgroundColor: "#6A6FDD",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "90%",
          maxWidth: "450px",
          padding: "40px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3B3DBF" }}>
          Register
        </h2>

        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#6b6b6b" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#6b6b6b" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isSubmitting ? "#ccc" : "#3B3DBF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
