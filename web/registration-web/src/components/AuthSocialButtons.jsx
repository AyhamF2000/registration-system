// src/components/AuthSocialButtons.jsx
import React from "react";

const AuthSocialButtons = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <button
        style={{
          flex: 1,
          padding: "10px",
          backgroundColor: "#fff",
          color: "#3B3DBF",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Google
      </button>
      <button
        style={{
          flex: 1,
          padding: "10px",
          backgroundColor: "#fff",
          color: "#3B3DBF",
          border: "1px solid #ccc",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Facebook
      </button>
    </div>
  );
};

export default AuthSocialButtons;
