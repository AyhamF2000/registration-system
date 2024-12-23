import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router'; // For navigation
import { login } from '../../services/UserService'; // Backend API service

/**
 * LoginScreen
 *
 * A user authentication screen for logging in.
 * Features:
 * - Email and password inputs with visibility toggle for password.
 * - Toast notifications for success and error feedback.
 * - Navigation to registration and welcome screens.
 */
const LoginScreen: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginPressed, setIsLoginPressed] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  /**
   * Handles user login.
   * - Validates inputs.
   * - Sends credentials to the backend.
   * - Displays success or error messages via Toast.
   */
  const handleLogin = async () => {
    Keyboard.dismiss();

    // Validation
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both email and password fields.',
      });
      return;
    }

    try {
      const response = await login(email, password);

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Welcome!',
          text2: response.message || 'Login successful!',
        });

        const { name, email: userEmail, welcome_message } = response;
        router.push({
          pathname: '/WelcomeScreen',
          params: { welcome_message, name, email: userEmail },
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.message || 'Login failed. Please try again.',
        });
      }
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Something went wrong.',
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Log in</Text>

      {/* Email Input */}
      <View
        style={[
          styles.inputContainer,
          focusedInput === 'email' ? styles.inputFocused : null,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
        <Icon name="mail-outline" size={20} color="#A9A9A9" style={styles.inputIcon} />
      </View>

      {/* Password Input */}
      <View
        style={[
          styles.inputContainer,
          focusedInput === 'password' ? styles.inputFocused : null,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.inputIcon}
        >
          <Icon
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#A9A9A9"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity 
        style={styles.forgotPasswordButton}
        onPress={() => router.push('/ForgotPasswordScreen')}
        >
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          isLoginPressed ? styles.loginButtonPressed : null,
        ]}
        onPressIn={() => setIsLoginPressed(true)}
        onPressOut={() => setIsLoginPressed(false)}
        onPress={handleLogin}
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or</Text>
        <View style={styles.divider} />
      </View>

      {/* Social Buttons */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-google" size={20} color="#6B6BFF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="logo-facebook" size={20} color="#6B6BFF" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>

      {/* Register Section */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Have no account yet?</Text>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/RegisterScreen')}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </View>

      {/* Toast Notifications */}
      <Toast />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333366',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
  },
  inputFocused: {
    borderColor: '#6B6BFF',
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  inputIcon: {
    marginLeft: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6B6BFF',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#6B6BFF',
    paddingVertical: 12,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonPressed: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D3D3D3',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#A9A9A9',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#6B6BFF',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  socialIcon: {
    marginRight: 10,
  },
  socialButtonText: {
    color: '#6B6BFF',
    fontSize: 14,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  registerText: {
    color: '#A9A9A9',
    marginBottom: 10,
  },
  registerButton: {
    alignItems: 'center', // Center children vertically
    justifyContent: 'center', // Center children horizontally
    borderWidth: 1,
    borderColor: '#6B6BFF',
    borderRadius: 20,
    paddingVertical: 10, // Add vertical padding for height
    width: '100%', // Ensure full width of parent container
  },
  registerButtonText: {
    color: '#6B6BFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center', // Center text within its container
  },
  
});
