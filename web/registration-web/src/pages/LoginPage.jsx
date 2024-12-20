import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Utility for toast notifications
import { login } from "../services/UserService"; // Backend service for login
import LeftSideComponent from "../components/LeftSideComponent.jsx"; // Left-side panel
import LoginComponent from "../components/LoginComponent.jsx"; // Login form component
import SocialButtonsComponent from "../components/SocialButtonsComponent.jsx"; // Social login buttons

/**
 * LoginPage
 * 
 * This page provides the UI for user login.
 * Features:
 * - A visually appealing card layout with a left-side branding panel.
 * - Login form with email, password, and show/hide password functionality.
 * - Social login buttons for Google and Facebook.
 * - Redirect to the registration page for new users.
 * 
 * Key Functionality:
 * - Validates user input (email and password) before submission.
 * - Displays toast notifications for success or failure.
 * - Navigates to the welcome page on successful login.
 */
const LoginPage = () => {
  // State variables for form inputs and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // React Router hook for navigation

  /**
   * Toggles the visibility of the password input field.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Handles the login form submission.
   * - Validates the form inputs (email and password).
   * - Calls the backend login service.
   * - Displays a toast notification based on the result.
   * - Navigates to the welcome page on success.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleLogin = async (e) => {
    e.preventDefault();

    // Ensure email and password fields are filled
    if (!email || !password) {
      ToastUtils.error("Please fill in both email and password fields.");
      return;
    }

    try {
      // API call to the login service
      const response = await login(email, password);

      if (response.success) {
        const { name, email: userEmail } = response.data; // Extract user data from response
        navigate("/welcome", { state: { message: response.message, name, email: userEmail } }); // Navigate to welcome page
      } else {
        ToastUtils.error(response.message || "Login failed. Please try again."); // Error notification
      }
    } catch (err) {
      ToastUtils.error(err.message || "Something went wrong."); // Network or unexpected error
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw",  // Full viewport width
        backgroundColor: "#6A6FDD", // Background color of the page
      }}
    >
      {/* Card layout for login */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          maxWidth: "1200px",  // Maximum width for responsiveness
          height: "90%",
          maxHeight: "700px", // Maximum height for responsiveness
          backgroundColor: "#fff", // Card background color
          borderRadius: "20px", // Rounded corners for the card
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          overflow: "hidden", // Prevent overflow content
        }}
      >
        {/* Left-side branding panel */}
        <LeftSideComponent />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px", // Spacing around the content
          }}
        >
          {/* Login title */}
          <h2 style={{ marginBottom: "20px", color: "#3B3DBF", fontSize: "1.8rem" }}>
            Log in
          </h2>
          {/* Login form */}
          <LoginComponent
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            handleSubmit={handleLogin}
          />
          {/* Social login buttons */}
          <SocialButtonsComponent />

          {/* Redirect to registration page */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              maxWidth: "350px",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#fff", // White background
                color: "#3B3DBF", // Blue text color
                border: "1px solid #3B3DBF", // Blue border
                borderRadius: "25px", // Rounded corners
                cursor: "pointer",
                fontSize: "16px", // Font size
                fontWeight: "500", // Medium font weight
                gap: "8px", // Space between icon and text
                transition: "all 0.3s ease", // Smooth hover effect
              }}
              // Hover effects for the button
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3B3DBF";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.color = "#3B3DBF";
              }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")} // Button press effect
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")} // Button release effect
              onClick={() => {
                window.location.href = "/register"; // Navigate to the register page
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
