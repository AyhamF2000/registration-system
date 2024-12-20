import React, { useState } from "react";
import ToastUtils from "../utils/ToastUtils"; // Utility for toast notifications
import { changePassword } from "../services/UserService"; // Backend service for password change
import { useNavigate } from "react-router-dom"; // Hook for navigation

/**
 * ForgotPasswordPage
 * 
 * A page that allows users to update their password by providing:
 * - Email address
 * - Current password
 * - New password
 * 
 * Features:
 * - Validates inputs to ensure required fields are filled and meet password length requirements.
 * - Provides visual feedback using toast notifications for success or error scenarios.
 * - Disables the submit button while processing.
 */
const ForgotPasswordPage = () => {
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for submit button
  const navigate = useNavigate(); // React Router hook for navigation

  /**
   * Validates the user inputs for the form.
   * Ensures all fields are filled and the new password meets length requirements.
   * 
   * @returns {boolean} Whether the inputs are valid.
   */
  const validateInputs = () => {
    if (!email || !currentPassword || !newPassword) {
      ToastUtils.error("All fields are required!");
      return false;
    }
    if (newPassword.length < 8) {
      ToastUtils.error("New password must be at least 8 characters long!");
      return false;
    }
    return true;
  };

  /**
   * Handles form submission to change the user's password.
   * - Validates the form inputs.
   * - Calls the backend service to process the password change.
   * - Displays feedback to the user via toast notifications.
   * - Navigates back to the home page on success.
   * 
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs before proceeding
    if (!validateInputs()) return;

    setIsSubmitting(true); // Disable the button during processing
    try {
      // API call to change password
      const response = await changePassword(email, currentPassword, newPassword);

      if (response.success) {
        // Success notification
        ToastUtils.success(response.message);

        // Reset form fields
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");

        // Navigate to the login page
        navigate("/");
      } else {
        // Error notification from the server response
        ToastUtils.error(response.message || "Password change failed!");
      }
    } catch (err) {
      // Network or unexpected error notification
      ToastUtils.error(err.message || "Something went wrong!");
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
        height: "100vh", // Full screen height
        width: "100vw",  // Full screen width
        backgroundColor: "#6A6FDD", // Background color of the page
      }}
    >
      {/* Password change form */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#fff", // White card-like background
          borderRadius: "10px", // Rounded corners
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          boxSizing: "border-box",
        }}
      >
        {/* Page title */}
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3B3DBF" }}>
          Change Password
        </h2>

        {/* Email input field */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
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
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Current password input field */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#6b6b6b" }}>
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter your current password"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* New password input field */}
        <div style={{ marginBottom: "15px", width: "100%" }}>
          <label style={{ display: "block", marginBottom: "5px", color: "#6b6b6b" }}>
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter your new password"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              boxSizing: "border-box",
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
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: isSubmitting ? "not-allowed" : "pointer", // Disable pointer events when submitting
            transition: "background-color 0.3s ease", // Smooth hover effect
          }}
        >
          {isSubmitting ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
