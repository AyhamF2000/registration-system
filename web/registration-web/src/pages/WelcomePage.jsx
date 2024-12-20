import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Utility for toast notifications

/**
 * WelcomePage
 * 
 * This page greets the user after successful login or registration.
 * Features:
 * - Extracts user details (name, email, and welcome message) from URL query parameters or navigation state.
 * - Displays a welcome toast notification only once when the page loads.
 * - Provides a clean and centered layout for the welcome message.
 */
const WelcomePage = () => {
  const location = useLocation(); // React Router hook for accessing the current location
  const toastShownRef = useRef(false); // Ref to ensure the toast is shown only once

  /**
   * Helper function to parse query parameters from the URL.
   * 
   * @param {string} search - The query string from the URL.
   * @returns {Object} Extracted query parameters: name, email, and welcome_message.
   */
  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      name: params.get("name"),
      email: params.get("email"),
      welcome_message: params.get("welcome_message"),
    };
  };

  // Extract query parameters and fallback to location state if not present
  const { name: queryName, email: queryEmail, welcome_message: queryWelcomeMessage } = getQueryParams(location.search);
  const name = queryName || location.state?.name || "User"; // Fallback to "User" if no name is provided
  const email = queryEmail || location.state?.email || "Unknown"; // Fallback to "Unknown" if no email is provided

  // Welcome message with a fallback message
  const welcomeMessage = queryWelcomeMessage || `Hi ${name}, Welcome to the platform!`;

  useEffect(() => {
    // Display the welcome toast only once
    if (!toastShownRef.current) {
      ToastUtils.success(welcomeMessage, {
        autoClose: 10000, // Toast will auto-close after 10 seconds
        icon: "🎉", // Add a celebratory icon
      });
      toastShownRef.current = true; // Mark the toast as shown
    }
  }, []); // Empty dependency array ensures this effect runs only on the first render

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: "#3B3DBF", // Page background color
      }}
    >
      {/* Card container for the welcome message */}
      <div
        style={{
          backgroundColor: "#fff", // White card background
          borderRadius: "15px", // Rounded corners for the card
          padding: "40px", // Padding for spacing
          textAlign: "center", // Center-align the text content
          width: "80%", // Responsive width
          maxWidth: "400px", // Limit the maximum width
        }}
      >
        {/* Title */}
        <h1 style={{ fontSize: "2rem", color: "#3B3DBF" }}>Welcome! 🎉</h1>
        {/* User details */}
        <div style={{ fontSize: "1rem", color: "#6b6b6b" }}>
          <h1>Welcome, {name}!</h1>
          <p>Your email: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
