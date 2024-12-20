import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Utility for toast notifications
import { register } from "../services/UserService"; // Backend service for user registration

/**
 * RegisterPage
 * 
 * This page allows users to register by providing:
 * - Name
 * - Email
 * - Password
 * 
 * Features:
 * - Validates user inputs before submitting the form.
 * - Provides real-time feedback using toast notifications.
 * - Navigates to the welcome page on successful registration.
 */
const RegisterPage = () => {
  // State variables for form inputs and button state
  const [email, setEmail] = useState(""); // Email input value
  const [password, setPassword] = useState(""); // Password input value
  const [name, setName] = useState(""); // Name input value
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const navigate = useNavigate(); // React Router hook for navigation

  /**
   * Validates user inputs for the registration form.
   * - Ensures all fields are filled.
   * - Checks email format using regex.
   * - Validates that the password meets the minimum length.
   * 
   * @returns {boolean} Whether the inputs are valid.
   */
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

    if (!email || !password || !name) {
      ToastUtils.error("All fields are required!"); // Notify user about missing fields
      return false;
    }
    if (!emailRegex.test(email)) {
      ToastUtils.error("Invalid email format!"); // Notify user about invalid email
      return false;
    }
    if (password.length < 8) {
      ToastUtils.error("Password must be at least 8 characters long!"); // Notify user about weak password
      return false;
    }
    return true;
  };

  /**
   * Handles form submission for user registration.
   * - Validates the form inputs.
   * - Calls the backend registration service.
   * - Displays success or error messages using toast notifications.
   * - Redirects to the welcome page on success.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateInputs()) return;

    setIsSubmitting(true); // Disable the submit button during processing
    try {
      // Call the backend register service
      const response = await register(email, password, name);

      if (response.success) {
        const { message, name, email, welcome_message } = response;

        // Navigate to the welcome page with query params and state
        navigate(`/welcome?welcome_message=${encodeURIComponent(welcome_message)}`, {
          state: { message, name, email, welcome_message },
        });
      } else {
        ToastUtils.error(response.message || "Registration failed!"); // Notify user of failure
      }
    } catch (err) {
      ToastUtils.error(err.message || "Something went wrong!"); // Notify user of network or unexpected error
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
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
        backgroundColor: "#6A6FDD", // Page background color
      }}
    >
      {/* Registration form */}
      <form
        onSubmit={handleRegister}
        style={{
          width: "90%",
          maxWidth: "450px", // Limit width for responsiveness
          padding: "40px",
          backgroundColor: "#fff", // White card-like background
          borderRadius: "20px", // Rounded corners for the form
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
        }}
      >
        {/* Form title */}
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3B3DBF" }}>
          Register
        </h2>

        {/* Name input field */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#6b6b6b" }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc", // Input border
              borderRadius: "5px", // Rounded corners for input
            }}
          />
        </div>

        {/* Email input field */}
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
              border: "1px solid #ccc", // Input border
              borderRadius: "5px", // Rounded corners for input
            }}
          />
        </div>

        {/* Password input field */}
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
              border: "1px solid #ccc", // Input border
              borderRadius: "5px", // Rounded corners for input
            }}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting} // Disable button while submitting
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: isSubmitting ? "#ccc" : "#3B3DBF", // Dynamic background color
            color: "#fff", // White text color
            border: "none", // No border
            borderRadius: "5px", // Rounded corners for button
            cursor: isSubmitting ? "not-allowed" : "pointer", // Disable pointer on submission
            transition: "background-color 0.3s ease", // Smooth hover effect
          }}
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
