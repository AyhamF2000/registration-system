import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WelcomePage from "../pages/WelcomePage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Default route: Login Page */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Register Page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* Welcome Page */}
        <Route path="/welcome" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
