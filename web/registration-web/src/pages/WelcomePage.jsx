import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Utility for toast notifications

/**
 * WelcomePage
 * 
 * This page displays a personalized welcome message to the user based on the data received
 * via the navigation state or URL query parameters.
 * 
 * Features:
 * - Extracts user data from either `location.state` or URL query parameters.
 * - Displays a toast notification to welcome the user.
 * - Ensures that the toast notification is displayed only once using `useRef`.
 */
const WelcomePage = () => {
  const location = useLocation(); // Access URL and navigation state
  const toastDisplayedRef = useRef(false); // Ref to track toast display status

  /**
   * Extracts query parameters from the URL.
   * 
   * @param {string} search - The query string from the URL.
   * @returns {Object} An object containing `name`, `email`, and `welcome_message` fields.
   */
  const getQueryParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      name: params.get("name"),
      email: params.get("email"),
      welcome_message: params.get("welcome_message"),
    };
  };

  const stateData = location.state; // Data from location.state
  const queryData = getQueryParams(location.search); // Data from query params

  const { name, email, welcome_message } = stateData || queryData;

  /**
   * Displays a toast notification for data from `location.state`.
   * Ensures the toast is displayed only once.
   * 
   * @param {string} message - The welcome message to display.
   */
  const displayStateToast = (message) => {
    if (!toastDisplayedRef.current) {
      ToastUtils.success(decodeURIComponent(message), {
        autoClose: 8000,
        icon: "🎉",
      });
      toastDisplayedRef.current = true; // Mark the toast as displayed
    }
  };

  /**
   * Displays a toast notification for data from query parameters.
   * 
   * @param {string} message - The welcome message to display.
   */
  const displayQueryToast = (message) => {
    ToastUtils.success(decodeURIComponent(message), {
      autoClose: 8000,
      icon: "🎉",
    });
    toastDisplayedRef.current = true; // Mark the toast as displayed
  };

  // Display the correct toast notification based on data source
  useEffect(() => {
    if (welcome_message) {
      if (stateData) {
        displayStateToast(welcome_message);
      } else if (queryData) {
        displayQueryToast(welcome_message);
      }
    }
  }, [welcome_message, stateData, queryData]);

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
        <h1 style={{ fontSize: "2rem", color: "#3B3DBF" }}>
          Welcome, {name || "Guest"}! 🎉
        </h1>
        <p style={{ color: "#6b6b6b", fontSize: "1rem" }}>
          Enjoy your experience with us!
        </p>
        <p style={{ color: "#6b6b6b", fontSize: "0.9rem" }}>
          Your email: {email || "Not provided"}
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
