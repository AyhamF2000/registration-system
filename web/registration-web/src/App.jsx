import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* ToastContainer for global toast notifications */}
      <ToastContainer />

      {/* App routes */}
      <AppRoutes />
    </>
  );
};

export default App;
