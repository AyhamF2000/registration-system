import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Import ToastUtils

const WelcomePage = () => {
  const location = useLocation();
  const welcomeMessage = location.state?.message || "Welcome to the platform!";
  const toastShownRef = useRef(false); // Ref to track if the toast was shown

  useEffect(() => {
    if (!toastShownRef.current) {
      // Show the toast only once
      ToastUtils.success(welcomeMessage, {
        autoClose: 10000, // Customize autoClose for welcome toast
        icon: "🎉", // Custom icon
      });
      toastShownRef.current = true; // Mark as shown
    }
  }, []); // Empty dependency array ensures this logic runs only on the first mount

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#3B3DBF",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          padding: "40px",
          textAlign: "center",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            color: "#3B3DBF",
          }}
        >
          Welcome! 🎉
        </h1>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b6b6b",
          }}
        >
          {welcomeMessage}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
