// src/components/AuthLeftSide.jsx
import React from "react";

const AuthLeftSide = () => {
  return (
    <div
      style={{
        flex: 1,
        backgroundColor: "#3B3DBF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        color: "#fff",
      }}
    >
      <img
        src="/assets/logo.svg"
        alt="Logo"
        style={{
          width: "15%",
          marginBottom: "20px",
          maxWidth: "60px",
        }}
      />
      <img
        src="/assets/illustration.svg"
        alt="Welcome Illustration"
        style={{
          width: "70%",
          maxWidth: "300px",
          marginBottom: "20px",
        }}
      />
      <h1 style={{ fontSize: "1.8rem", marginBottom: "10px", textAlign: "center" }}>
        Welcome aboard my friend
      </h1>
      <p style={{ fontSize: "1rem", textAlign: "center" }}>
        Just a couple of clicks and we start
      </p>
    </div>
  );
};

export default AuthLeftSide;
