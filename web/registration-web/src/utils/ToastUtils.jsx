import { toast } from "react-toastify"; // Import toast notification library

/**
 * ToastUtils
 * 
 * A centralized utility for managing toast notifications in the application.
 * This utility wraps the React-Toastify library and provides predefined methods 
 * for different types of notifications: success, error, info, and warning.
 * 
 * Features:
 * - Configurable options for each toast type (position, duration, etc.).
 * - Default configurations that can be overridden with custom options.
 * - Easy-to-use methods for consistent notification management.
 */
const ToastUtils = {
  /**
   * Displays a success toast notification.
   * 
   * @param {string} message - The message to display in the toast.
   * @param {object} options - Additional configuration options for the toast.
   */
  success: (message, options = {}) => {
    toast.success(message, {
      position: "top-right", // Default position
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing on click
      pauseOnHover: true, // Pause auto-close on hover
      draggable: true, // Allow dragging the toast
      theme: "light", // Light theme by default
      ...options, // Override defaults with custom options
    });
  },

  /**
   * Displays an error toast notification.
   * 
   * @param {string} message - The message to display in the toast.
   * @param {object} options - Additional configuration options for the toast.
   */
  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-right", // Default position
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing on click
      pauseOnHover: true, // Pause auto-close on hover
      draggable: true, // Allow dragging the toast
      theme: "light", // Light theme by default
      ...options, // Override defaults with custom options
    });
  },

  /**
   * Displays an informational toast notification.
   * 
   * @param {string} message - The message to display in the toast.
   * @param {object} options - Additional configuration options for the toast.
   */
  info: (message, options = {}) => {
    toast.info(message, {
      position: "top-right", // Default position
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing on click
      pauseOnHover: true, // Pause auto-close on hover
      draggable: true, // Allow dragging the toast
      theme: "light", // Light theme by default
      ...options, // Override defaults with custom options
    });
  },

  /**
   * Displays a warning toast notification.
   * 
   * @param {string} message - The message to display in the toast.
   * @param {object} options - Additional configuration options for the toast.
   */
  warning: (message, options = {}) => {
    toast.warning(message, {
      position: "top-right", // Default position
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: false, // Show progress bar
      closeOnClick: true, // Allow closing on click
      pauseOnHover: true, // Pause auto-close on hover
      draggable: true, // Allow dragging the toast
      theme: "light", // Light theme by default
      ...options, // Override defaults with custom options
    });
  },
};

export default ToastUtils;
