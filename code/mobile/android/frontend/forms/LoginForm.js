import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from "../components/ipConfig";


const LoginForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      // Reset form fields when screen is focused
      setEmail('driver@driver.com');
      setPassword('12345');
      //setActiveForm('login'); // Set the default active form
      // Add any other states that need to be reset
    }, [])
  );

  const handleLogin = async () => {
    
    console.log(`Email: ${email}, Password: ${password}`);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email: email.toLowerCase() , password });
    
      if (response.status === 200) {
        // Save the token
        const { token, driverId } = response.data;
        AsyncStorage.setItem('token', token);
        //AsyncStorage.setItem('driverId', driverId);
        await AsyncStorage.setItem('token', token);
        //await AsyncStorage.setItem('driverId', driverId);
        await AsyncStorage.setItem('driverId', JSON.stringify(driverId));
        const storedToken = await AsyncStorage.getItem('token');
        //const storedDriverId = await AsyncStorage.getItem('driverId');
        console.log('Stored token:', storedToken);
        //console.log('Stored driverId:', storedDriverId);
        console.log('Stored driverId:', driverId);
        

  
        // Navigate to the home screen
        //navigation.navigate('Drawer', { screen: 'Home', params: { email: email } });
        navigation.navigate('MainApp');
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

//   const handleLogin = async () => {
//   try {
//     // Mock response for testing
//     const response = {
//       status: 201,
//       data: {
//         email: 'driver@driver.com',
//         password: '12345'
//       }
//     };

//     if (email === response.data.email && password === response.data.password) {
//       navigation.navigate('Drawer', { screen: 'Home'});
//     } else {
//       console.error("Login error: Invalid credentials");
//       Alert.alert("Invalid credentials");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     Alert.alert("Login error", error.message);
//   }
// };

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post("http://142.3.84.67:8080/api/users/login", { email, password });
      
  //     if (response.status === 201) {
  //       navigation.navigate('Drawer', { screen: 'Home'});
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     Alert.alert(
  //       "Login Failed",
  //       "Please check your credentials and try again."
  //     );
  //   }
  // };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email or phone number"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.inputField}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  inputField: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
  },
  loginButton: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: "blue",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
});

export default LoginForm;
