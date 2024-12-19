import axios from "axios";

// Base URL of your backend
const API_BASE_URL = "http://127.0.0.1:5000";

// Login function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data; // Return the data received from the backend
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};

// Register function (optional example)
export const register = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network error" };
  }
};
