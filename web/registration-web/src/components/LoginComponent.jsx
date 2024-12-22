import React, { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

/**
 * LoginComponent
 * A reusable React component for a login form with interactive features.
 * 
 * Props:
 * - `email`: Current email input value.
 * - `setEmail`: Updates the email value.
 * - `password`: Current password input value.
 * - `setPassword`: Updates the password value.
 * - `showPassword`: Toggles password visibility.
 * - `togglePasswordVisibility`: Handles password visibility toggle.
 * - `handleSubmit`: Handles form submission.
 */
const LoginComponent = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
  handleSubmit,
}) => {
  const [isHovered, setIsHovered] = useState(false); // Submit button hover state
  const [isActive, setIsActive] = useState(false); // Submit button active state
  const [isDisabled, setIsDisabled] = useState(false); // Submit button disabled state
  const [hoveredInput, setHoveredInput] = useState(null); // Input hover tracking

  const [isPressed, setIsPressed] = useState(false); // Tracks Login button pressed state
  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false); // Tracks Forgot Password pressed state

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "350px",
    },
    inputContainer: {
      position: "relative",
      marginBottom: "15px",
      display: "flex",
      alignItems: "center",
    },
    inputIcon: {
      position: "absolute",
      left: "10px",
      color: "#6b6b6b",
      fontSize: "18px",
    },
    inputField: (isHovered) => ({
      width: "100%",
      padding: "10px 40px 10px 40px",
      border: "1px solid",
      borderColor: isHovered ? "#3b3dbf" : "#ccc",
      borderRadius: "5px",
      fontSize: "14px",
      transition: "border-color 0.3s",
    }),
    passwordToggle: {
      position: "absolute",
      right: "10px",
      color: "#6b6b6b",
      fontSize: "18px",
      cursor: "pointer",
    },
    forgotPassword: {
      textAlign: "right",
      marginBottom: "20px",
    },
    forgotPasswordLink: {
      color: "#3b3dbf",
      textDecoration: "none",
      opacity: isForgotPasswordPressed ? 0.3 : 1, // Reduces opacity when pressed
      transition: "opacity 0.3s",

    },
    forgotPasswordLinkHover: {
      color: "#1f1f8f",
    },
    submitButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: isDisabled
        ? "#b0b0d9"
        : isActive
        ? "#1f1f8f"
        : isHovered
        ? "#2a2a9f"
        : "#3b3dbf",
      color: "#fff",
      border: "none",
      borderRadius: "25px",
      cursor: isDisabled ? "not-allowed" : "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      opacity: isPressed ? 0.3 : 1, // Reduces opacity when pressed
      transition: "opacity 0.3s",

    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.inputContainer}>
        <AiOutlineMail style={styles.inputIcon} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onMouseEnter={() => setHoveredInput("email")}
          onMouseLeave={() => setHoveredInput(null)}
          style={styles.inputField(hoveredInput === "email")}
        />
      </div>

      <div style={styles.inputContainer}>
        <AiOutlineLock style={styles.inputIcon} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onMouseEnter={() => setHoveredInput("password")}
          onMouseLeave={() => setHoveredInput(null)}
          style={styles.inputField(hoveredInput === "password")}
        />
        <span style={styles.passwordToggle} onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      <div style={styles.forgotPassword}>
        <a
          href="/forgot-password"
          style={
            hoveredInput === "forgotPassword"
              ? { ...styles.forgotPasswordLink, ...styles.forgotPasswordLinkHover }
              : styles.forgotPasswordLink
          }
          onMouseEnter={() => setHoveredInput("forgotPassword")}
          onMouseLeave={() => setHoveredInput(null)}
          onMouseDown={() => setIsForgotPasswordPressed(true)} // Reduces opacity
          onMouseUp={() => setIsForgotPasswordPressed(false)} // Restores opacity
        >
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        style={styles.submitButton}
        disabled={isDisabled}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        Log in
      </button>
    </form>
  );
};

export default LoginComponent;
