import React from "react";
import { AiOutlineMail, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

/**
 * LoginComponent
 * A reusable component for login input fields and the form UI.
 * Props:
 * - email: email value
 * - setEmail: function to update email value
 * - password: password value
 * - setPassword: function to update password value
 * - showPassword: boolean to toggle password visibility
 * - togglePasswordVisibility: function to toggle password visibility
 * - handleSubmit: function to handle form submission
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
    inputField: {
      width: "100%",
      padding: "10px 40px 10px 40px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
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
    },
    submitButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#3b3dbf",
      color: "#fff",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
    },
    submitButtonHover: {
      backgroundColor: "#2a2a9f",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Email Input */}
      <div style={styles.inputContainer}>
        <AiOutlineMail style={styles.inputIcon} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.inputField}
        />
      </div>

      {/* Password Input */}
      <div style={styles.inputContainer}>
        <AiOutlineLock style={styles.inputIcon} />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.inputField}
        />
        <span style={styles.passwordToggle} onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      {/* Forgot Password */}
      <div style={styles.forgotPassword}>
        <a href="/forgot-password" style={styles.forgotPasswordLink}>
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <button type="submit" style={styles.submitButton}>
        Log in
      </button>
    </form>
  );
};

export default LoginComponent;
