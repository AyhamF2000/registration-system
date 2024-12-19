import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../services/UserService"; // Import login function from the service
import { AiOutlineMail, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import icons from react-icons

/**
 * LoginComponent
 * 
 * This component provides a login form with:
 * - Email and password inputs.
 * - Password visibility toggle functionality.
 * - Login integration with backend services.
 * - Toast notifications for success and error feedback.
 * 
 * Features:
 * - Input focus and hover effects for better user experience.
 * - Form validation to ensure all fields are filled before submission.
 */
const LoginComponent = () => {
  const [email, setEmail] = useState(""); // Email input value
  const [password, setPassword] = useState(""); // Password input value
  const [showPassword, setShowPassword] = useState(false); // Toggle visibility of password
  const navigate = useNavigate(); // For navigation after successful login

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password fields.", {
        position: "top-right",
      });
      return;
    }

    try {
      const response = await login(email, password);

      if (response.success) {
        toast.success(response.message, { position: "top-right" });
        navigate("/welcome");
      } else {
        toast.error(response.message || "Login failed. Please try again.", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.", {
        position: "top-right",
      });
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "350px",
      }}
    >
      {/* Email Input */}
      <div
        style={{
          marginBottom: "15px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AiOutlineMail
          style={{
            position: "absolute",
            left: "10px",
            color: "#6b6b6b",
            fontSize: "18px",
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 40px 10px 40px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            transition: "all 0.3s ease", // Smooth hover effect
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "#3B3DBF")}
          onMouseLeave={(e) => (e.target.style.borderColor = "#ccc")}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 5px rgba(59, 61, 191, 0.5)")}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
      </div>

      {/* Password Input */}
      <div
        style={{
          marginBottom: "15px",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AiOutlineLock
          style={{
            position: "absolute",
            left: "10px",
            color: "#6b6b6b",
            fontSize: "18px",
          }}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 40px 10px 40px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            transition: "all 0.3s ease", // Smooth hover effect
          }}
          onMouseEnter={(e) => (e.target.style.borderColor = "#3B3DBF")}
          onMouseLeave={(e) => (e.target.style.borderColor = "#ccc")}
          onFocus={(e) => (e.target.style.boxShadow = "0 0 5px rgba(59, 61, 191, 0.5)")}
          onBlur={(e) => (e.target.style.boxShadow = "none")}
        />
        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            right: "10px",
            color: "#6b6b6b",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </div>

      {/* Forgot Password */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <Link
          to="/forgot-password"
          style={{
            color: "#3B3DBF",
            textDecoration: "none",
            transition: "color 0.3s ease", // Smooth hover effect
          }}
          onMouseEnter={(e) => (e.target.style.color = "#6b6b6b")}
          onMouseLeave={(e) => (e.target.style.color = "#3B3DBF")}
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#3B3DBF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          borderRadius: "25px",
          transition: "all 0.3s ease", // Smooth hover effect
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#2C2F99")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#3B3DBF")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
      >
        Log in
      </button>
    </form>
  );
};

export default LoginComponent;
