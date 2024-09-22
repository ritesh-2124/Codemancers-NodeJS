import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import { useAuthRequest } from 'expo-auth-session';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user , setUser] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: '293846285263-5opettqpv435ebi1i7a17eeqq1hmnlgk.apps.googleusercontent.com',
    androidClientId: '293846285263-t0b88donmo0agid8jf4kk3dojk1mid8o.apps.googleusercontent.com',
    useProxy: true
    // Use the appropriate client ID for your app's platform
    // For web apps: `webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com'`
  });

  useEffect(() => {
    if (response) {
      console.log('Google Sign-In Response:', response); // Log the response
  
      if (response.type === 'success') {
        const { id_token , access_token} = response.params;
        alert(id_token);
        handleGoogleSignIn(id_token ,access_token); // Pass the id_token for further processing
      } else {
        console.log('Google Sign-In did not succeed:', response.type); // Handle failure or dismiss
      }
    }
  }, [response]);
  

  // Function to handle Google Sign-In
  const handleGoogleSignIn = async (idToken , accessToken) => {
    try {
      // Store the token and navigate based on Google sign-in response
      console.log('Google Sign-In ID Token:', idToken);
      await AsyncStorage.setItem('token', idToken);
      const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
   
      const userData = userInfoResponse.data;
      console.log('User Info:', userData);
  
      // Optionally store user info in AsyncStorage for future use
      await AsyncStorage.setItem('user', JSON.stringify(userData));
  
      // Pass user data to the next screen
      navigation.navigate('ProductManagement', { user: userData });
      // alert(`Google Sign-In succeeded with email: ${JSON.stringify(userInfoResponse.data)}`);

      // Navigate to a specific screen if needed
      // navigation.navigate('ProductManagement');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert(error);
    }
  };

  // Function to handle email/password login
  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Please enter email and password');
        return;
      }
      // Make the login request
      const response = await axios.post('https://codemancers-nodejs-2.onrender.com/api/auth/login', {
        email,
        password,
      });

      // Store the token in AsyncStorage
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);

      // Decode the token to get the user's role
      const userRole = response.data.role;

      // Navigate based on the user's role
      if (userRole === 'super_admin') {
        navigation.navigate('ProductManagement'); // Navigate to product management screen for super admins
        setEmail('');
        setPassword('');
      } else {
        navigation.navigate('Products'); // Navigate to regular products page for other users
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      console.log('Login error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Google Sign-In Button */}
      <Button
        title="Sign in with Google"
        onPress={() => promptAsync()}
        disabled={!request}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007bff', // Button background color
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    borderRadius: 5, // Rounded corners
    marginVertical: 20, // Margin
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16, // Font size
    fontWeight: 'bold', // Bold text
  },
});

export default LoginScreen;
