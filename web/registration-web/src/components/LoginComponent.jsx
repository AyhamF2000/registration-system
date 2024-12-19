import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastUtils from "../utils/ToastUtils"; // Import ToastUtils
import { login } from "../services/UserService"; // Import login function from the service
import { AiOutlineMail, AiOutlineLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      ToastUtils.error("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await login(email, password);

      if (response.success) {
        ToastUtils.success(response.message);
        navigate("/welcome");
      } else {
        ToastUtils.error(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      ToastUtils.error(err.message || "Something went wrong.");
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
          }}
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
          }}
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
        <Link to="/forgot-password" style={{ color: "#3B3DBF", textDecoration: "none" }}>
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
        }}
      >
        Log in
      </button>
    </form>
  );
};

export default LoginComponent;
