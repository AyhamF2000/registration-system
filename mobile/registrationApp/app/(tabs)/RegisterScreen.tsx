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
import { register } from "../../services/UserService";

/**
 * RegisterScreen
 * 
 * A React Native screen for user registration. Allows users to enter their name, email, and password
 * and submit the data to the backend for account creation. Provides real-time feedback via toast notifications.
 */
const RegisterScreen: React.FC = () => {
  const router = useRouter(); // Navigation hook
  const [name, setName] = useState(""); // Name input value
  const [email, setEmail] = useState(""); // Email input value
  const [password, setPassword] = useState(""); // Password input value
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

  /**
   * Validates user inputs for the registration form.
   * Ensures that all fields are filled, email format is correct, and password is secure.
   * 
   * @returns `true` if all inputs are valid, otherwise `false`.
   */
  const validateInputs = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

    if (!name || !email || !password) {
      Toast.show({ type: "error", text1: "Error", text2: "All fields are required!" });
      return false;
    }
    if (!emailRegex.test(email)) {
      Toast.show({ type: "error", text1: "Error", text2: "Invalid email format!" });
      return false;
    }
    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Password must be at least 8 characters long!",
      });
      return false;
    }
    return true;
  };

  /**
   * Handles registration form submission.
   * Sends validated user data to the backend and navigates to the welcome screen on success.
   */
  const handleRegister = async () => {
    Keyboard.dismiss(); // Close the keyboard
    if (!validateInputs()) return; // Stop if inputs are invalid

    setIsSubmitting(true); // Show loading state
    try {
      const response = await register(email, password, name);

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Registration successful!",
        });

        const { name, email, welcome_message } = response;

        // Navigate to the welcome screen with params
        router.push({
          pathname: "/WelcomeScreen",
          params: { welcome_message, name, email },
        });
      } else {
        Toast.show({ type: "error", text1: "Error", text2: response.message || "Registration failed!" });
      }
    } catch (err: any) {
      Toast.show({ type: "error", text1: "Error", text2: err.message || "Something went wrong!" });
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
        <Text style={styles.title}>Register</Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#A9A9A9"
            value={name}
            onChangeText={setName}
          />
        </View>

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

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          disabled={isSubmitting}
          onPress={handleRegister}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Toast Notifications */}
      <Toast />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6A6FDD",
  },
  form: {
    width: "90%",
    maxWidth: 450,
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
