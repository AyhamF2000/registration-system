import React, { useState } from "react";
import ToastUtils from "../utils/ToastUtils"; // Import ToastUtils
import { changePassword } from "../services/UserService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsSubmitting(true);
    try {
      const response = await changePassword(email, currentPassword, newPassword); // Call the service
      if (response.success) {
        ToastUtils.success(response.message);
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        navigate("/");
      } else {
        ToastUtils.error(response.message || "Password change failed!");
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
        backgroundColor: "#6A6FDD",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#3B3DBF" }}>
          Change Password
        </h2>

        {/* Email Input */}
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

        {/* Current Password Input */}
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

        {/* New Password Input */}
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
          {isSubmitting ? "Changing Password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
