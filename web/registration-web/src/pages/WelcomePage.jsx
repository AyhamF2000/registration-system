import React from "react";

const WelcomePage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        backgroundColor: "#3B3DBF", // Blue background color
        margin: 0, // Ensure no unwanted margin
        padding: 0, // Ensure no unwanted padding
        overflow: "hidden", // Prevent scrolling issues
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff", // White card background
          borderRadius: "15px", // Rounded corners for the card
          padding: "40px", // Padding inside the card
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for the card
          textAlign: "center", // Center text inside the card
          width: "80%", // Responsive width
          maxWidth: "400px", // Limit the card's maximum width
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            color: "#3B3DBF", // Blue heading color
            marginBottom: "20px",
          }}
        >
          Welcome to the Platform! 🎉
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b6b6b", // Subtle gray color for the description
          }}
        >
          We’re glad to have you here. Explore and enjoy the experience!
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
