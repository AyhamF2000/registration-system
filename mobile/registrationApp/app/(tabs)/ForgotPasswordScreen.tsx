import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { changePassword } from "../../services/UserService";

/**
 * ForgotPasswordScreen
 * 
 * A React Native screen for changing a user's password.
 * Users must provide their email, current password, and a new password.
 * 
 * Features:
 * - Validates input fields before submission.
 * - Provides real-time feedback using toast notifications.
 * - Disables the submit button while processing.
 */
const ForgotPasswordScreen: React.FC = () => {
  const router = useRouter(); // Navigation hook
  const [email, setEmail] = useState(""); // Email input value
  const [currentPassword, setCurrentPassword] = useState(""); // Current password input value
  const [newPassword, setNewPassword] = useState(""); // New password input value
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit button state

  /**
   * Validates the user inputs.
   * - Ensures all fields are filled.
   * - Checks that the new password meets length requirements.
   * 
   * @returns `true` if inputs are valid, otherwise `false`.
   */
  const validateInputs = (): boolean => {
    if (!email || !currentPassword || !newPassword) {
      Toast.show({ type: "error", text1: "Error", text2: "All fields are required!" });
      return false;
    }
    if (newPassword.length < 8) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "New password must be at least 8 characters long!",
      });
      return false;
    }
    return true;
  };

  /**
   * Handles the password change submission.
   * Sends user inputs to the backend and provides feedback on success or failure.
   */
  const handleSubmit = async () => {
    Keyboard.dismiss(); // Close keyboard
    if (!validateInputs()) return; // Stop if inputs are invalid

    setIsSubmitting(true); // Show loading state
    try {
      const response = await changePassword(email, currentPassword, newPassword);

      if (response.success) {
        Toast.show({ type: "success", text1: "Success", text2: response.message });

        // Reset form fields
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");

        // Navigate to home screen (or login screen)
        router.push("/");
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.message || "Password change failed!",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: err.message || "Something went wrong!",
      });
    } finally {
      setIsSubmitting(false); // Stop loading state
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.title}>Change Password</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Current Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your current password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your new password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
          onPress={handleSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Toast Notifications */}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A6FDD",
  },
  form: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B3DBF",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    color: "#6b6b6b",
    fontSize: 14,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: "#333",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3B3DBF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
