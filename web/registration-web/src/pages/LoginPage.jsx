import React from "react";
import LeftSideComponent from "../components/LeftSideComponent.jsx";
import LoginComponent from "../components/LoginComponent.jsx";
import SocialButtonsComponent from "../components/SocialButtonsComponent.jsx";

/**
 * LoginPage Component
 * 
 * The LoginPage component serves as the main page for user login.
 * It includes:
 * - A left branding panel with a logo and welcome message.
 * - A login form for user authentication.
 * - Social media buttons for alternative login options.
 * - A Register button for user registration.
 * 
 * Features:
 * - Responsive design with centered content.
 * - Hover effects for better user interaction.
 * - Seamless navigation to the registration page.
 */
const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#6A6FDD",
      }}
    >
      {/* Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          maxWidth: "1200px",
          height: "90%",
          maxHeight: "700px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <LeftSideComponent />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#3B3DBF", fontSize: "1.8rem" }}>
            Log in
          </h2>
          <LoginComponent />
          <SocialButtonsComponent />

          {/* Register Button */}
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
                fontWeight: "500", // Medium weight
                gap: "8px", // Space between icon and text
                transition: "all 0.3s ease", // Smooth hover effect
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#3B3DBF";
                e.target.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#fff";
                e.target.style.color = "#3B3DBF";
              }}
              onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
              onClick={() => {
                window.location.href = "/register"; // Redirect to the register page
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
