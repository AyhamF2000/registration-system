import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';

// Define the structure of the search parameters
type WelcomeScreenParams = {
  name?: string;
  email?: string;
  welcome_message?: string;
};

const WelcomeScreen: React.FC = () => {
  // Extract query parameters using `useLocalSearchParams`
  const params = useLocalSearchParams<Partial<WelcomeScreenParams>>(); // Use Partial for optional parameters
  const toastDisplayedRef = useRef(false); // Ref to track if toast has been displayed

  const { name, email, welcome_message } = params;

  /**
   * Displays a toast notification for the welcome message.
   * Ensures the toast is shown only once.
   * 
   * @param message - The message to display in the toast.
   */
  const displayToast = (message: string) => {
    if (!toastDisplayedRef.current) {
      Toast.show({
        type: 'success',
        text1: decodeURIComponent(message),
        text2: 'We’re excited to have you here! 🎉',
        autoHide: true,
        visibilityTime: 8000,
      });
      toastDisplayedRef.current = true; // Mark toast as displayed
    }
  };

  // Show the toast notification when the component mounts
  useEffect(() => {
    if (welcome_message) {
      displayToast(welcome_message);
    }
  }, [welcome_message]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Welcome, {name ? decodeURIComponent(name) : 'Guest'}! 🎉
        </Text>
        <Text style={styles.subtitle}>
          Enjoy your experience with us!
        </Text>
        <Text style={styles.info}>
          Your email: {email ? decodeURIComponent(email) : 'Not provided'}
        </Text>
      </View>
      {/* Toast Notification Component */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3DBF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 40,
    textAlign: 'center',
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#3B3DBF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b6b6b',
    textAlign: 'center',
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: '#6b6b6b',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
