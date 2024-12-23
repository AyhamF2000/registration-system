import axios, { AxiosResponse } from "axios";

// Base URL of your backend
const API_BASE_URL = "https://registration-server-hdawevcsavg0bvbx.israelcentral-01.azurewebsites.net";

// Interfaces for the API response types
export interface LoginResponse {
  success: boolean;
  message: string;
  name?: string;
  email?: string;
  welcome_message?: string;
}

export interface RegisterResponse {
  success: boolean; // Indicates whether the registration was successful
  message: string; // Feedback message from the server
  name?: string; // Name of the user (optional, returned on success)
  email?: string; // Email of the user (optional, returned on success)
  welcome_message?: string; // Personalized welcome message (optional, returned on success)
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

/**
 * Login Function
 * Sends user credentials to the backend for authentication.
 * 
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A Promise resolving to the response data from the backend.
 * @throws Error object containing response data or a generic message.
 */
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${API_BASE_URL}/user/login`, { email, password });
    return response.data;
  } catch (error: any) {
    handleApiError(error); // Throws an error, so no explicit return is needed
    throw new Error("Unreachable code"); // Added for TypeScript's sake (will never execute)
  }
};

/**
 * Registers a new user by sending their details to the backend.
 * 
 * @param email - The user's email address.
 * @param password - The user's chosen password.
 * @param name - The user's full name.
 * @returns A promise that resolves to the backend's response.
 * @throws An error if the backend request fails or returns an error.
 */
export const register = async (
  email: string,
  password: string,
  name: string
): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      `${API_BASE_URL}/user/register`,
      { email, password, name }
    );
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw new Error("Unreachable code");
  }
};


/**
 * Google Login Redirect URL
 * Generates the URL for Google OAuth login.
 * 
 * @returns The URL for Google OAuth login.
 */
export const getGoogleLoginUrl = (): string => {
  return `${API_BASE_URL}/auth/google`;
};

/**
 * Facebook Login Redirect URL
 * Generates the URL for Facebook OAuth login.
 * 
 * @returns The URL for Facebook OAuth login.
 */
export const getFacebookLoginUrl = (): string => {
  return `${API_BASE_URL}/auth/facebook`;
};

/**
 * Change Password
 * Allows the user to update their password by providing current and new passwords.
 * 
 * @param email - The user's email address.
 * @param currentPassword - The user's current password.
 * @param newPassword - The new password to set.
 * @returns A Promise resolving to the response data from the backend.
 * @throws Error object containing response data or a generic message.
 */
export const changePassword = async (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<ChangePasswordResponse> => {
  try {
    const response: AxiosResponse<ChangePasswordResponse> = await axios.post(`${API_BASE_URL}/user/change-password`, {
      email,
      current_password: currentPassword,
      new_password: newPassword,
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
    throw new Error("Unreachable code");
  }
};

/**
 * Handles API errors by extracting meaningful error messages.
 * Throws a processed error for higher-level handling.
 * 
 * @param error - The error object thrown by Axios.
 * @throws A formatted error with a user-friendly message.
 */
const handleApiError = (error: any): never => {
  const errorResponse = error.response?.data || { message: "Network error" };
  throw errorResponse;
};
