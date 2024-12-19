import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WelcomePage from "../pages/WelcomePage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
