// src/pages/LoginPage.jsx
import React from "react";
import AuthLeftSide from "../components/AuthLeftSide";
import AuthLoginForm from "../components/AuthLoginForm";
import AuthSocialButtons from "../components/AuthSocialButtons";

const LoginPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#E5E5E5",
      }}
    >
      {/* Card */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          maxWidth: "1200px",
          height: "90%",
          maxHeight: "700px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <AuthLeftSide />
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#3B3DBF", fontSize: "1.8rem" }}>
            Log in
          </h2>
          <AuthLoginForm />
          <AuthSocialButtons />
          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Have no account yet?{" "}
            <a
              href="/register"
              style={{
                color: "#3B3DBF",
                textDecoration: "none",
              }}
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
