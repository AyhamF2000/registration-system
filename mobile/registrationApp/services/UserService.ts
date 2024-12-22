import axios from "axios";

// Base URL of your backend
const API_BASE_URL = "https://registration-server-hdawevcsavg0bvbx.israelcentral-01.azurewebsites.net"; // Update this to your backend URL

/**
 * Login Function
 * Sends user credentials to the backend for authentication.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} - The response data from the backend.
 * @throws {Object} - Error object containing response data or a generic message.
 */
export const login = async (email: string, password: string): Promise<{ success: boolean; message: string; name: string }> => {
  try {
    
    const response = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data; // Return the data received from the backend
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Network error" }; // Handle API or network errors
  }
};

/**
 * Register Function
 * Registers a new user by sending their details to the backend.
 * 
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @param {string} name - The user's name.
 * @returns {Promise<Object>} - The response data from the backend.
 * @throws {Object} - Error object containing response data or a generic message.
 */
export const register = async (email: string, password: string, name: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/register`, { email, password, name });
    return response.data; // Return the backend response
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Network error" }; // Handle API or network errors
  }
};

/**
 * Google Login Redirect URL
 * Generates the URL for Google OAuth login.
 * 
 * @returns {string} - The URL for Google OAuth login.
 */
export const getGoogleLoginUrl = (): string => {
  return `${API_BASE_URL}/auth/google`;
};

/**
 * Facebook Login Redirect URL
 * Generates the URL for Facebook OAuth login.
 * 
 * @returns {string} - The URL for Facebook OAuth login.
 */
export const getFacebookLoginUrl = (): string => {
  return `${API_BASE_URL}/auth/facebook`;
};

/**
 * Change Password
 * Allows the user to update their password by providing current and new passwords.
 * 
 * @param {string} email - The user's email address.
 * @param {string} currentPassword - The user's current password.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<Object>} - The response data from the backend.
 * @throws {Object} - Error object containing response data or a generic message.
 */
export const changePassword = async (email: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/change-password`, {
      email,
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data; // Return the backend response
  } catch (error: any) {
    throw error.response ? error.response.data : { message: "Network error" }; // Handle API or network errors
  }
};


//npx expo start 