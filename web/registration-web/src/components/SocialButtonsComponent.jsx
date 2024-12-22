import React, { useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { getGoogleLoginUrl, getFacebookLoginUrl } from "../services/UserService";

/**
 * SocialButtonsComponent
 * 
 * Provides buttons for social login with Google and Facebook.
 * 
 * Features:
 * - Icons for visual branding (Google and Facebook).
 * - Interactive hover, press, and opacity effects.
 * - Redirects users to respective login URLs.
 */
const SocialButtonsComponent = () => {
  // Tracks the pressed state for each button
  const [isGooglePressed, setIsGooglePressed] = useState(false); // Google button press state
  const [isFacebookPressed, setIsFacebookPressed] = useState(false); // Facebook button press state

  // Handles Google login redirection
  const handleGoogleLogin = () => {
    const googleLoginUrl = getGoogleLoginUrl();
    window.location.href = googleLoginUrl;
  };

  // Handles Facebook login redirection
  const handleFacebookLogin = () => {
    const facebookLoginUrl = getFacebookLoginUrl();
    window.location.href = facebookLoginUrl;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px", // Space between buttons
        marginTop: "20px",
      }}
    >
      {/* Google Button */}
      <button
        onClick={handleGoogleLogin}
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
          fontWeight: "500", // Medium weight
          gap: "8px", // Space between icon and text
          transition: "all 0.3s ease", // Smooth hover and press transitions
          opacity: isGooglePressed ? 0.3 : 1, // Reduces opacity when pressed
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f0f0f0"; // Light gray background on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#fff"; // Revert to white background
        }}
        onMouseDown={() => setIsGooglePressed(true)} // Set pressed state
        onMouseUp={() => setIsGooglePressed(false)} // Reset pressed state
      >
        <FaGoogle size={18} /> {/* Google Icon */}
        Google
      </button>

      {/* Facebook Button */}
      <button
        onClick={handleFacebookLogin}
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
          fontWeight: "500", // Medium weight
          gap: "8px", // Space between icon and text
          transition: "all 0.3s ease", // Smooth hover and press transitions
          opacity: isFacebookPressed ? 0.3 : 1, // Reduces opacity when pressed
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#f0f0f0"; // Light gray background on hover
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#fff"; // Revert to white background
        }}
        onMouseDown={() => setIsFacebookPressed(true)} // Set pressed state
        onMouseUp={() => setIsFacebookPressed(false)} // Reset pressed state
      >
        <FaFacebook size={18} /> {/* Facebook Icon */}
        Facebook
      </button>
    </div>
  );
};

export default SocialButtonsComponent;
