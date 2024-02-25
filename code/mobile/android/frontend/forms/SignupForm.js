import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../components/ipConfig";

const SignupForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [canadianCarrierCode, setCanadianCarrierCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");


  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Signup Failed", "Passwords do not match.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Signup Failed", "Please enter a valid email address.");
      return;
    }

    try {
      const role = "driver";
      const lowerCaseEmail = email.toLowerCase();
      const response = await axios.post(`${API_BASE_URL}/register`, {
        email: lowerCaseEmail,
        password,
        canadianCarrierCode,
        confirmPassword,
        role,
      });

      if (response.status === 201) {
        Alert.alert(
          "Signup Successful",
          "You can now login with your new account."
        );
        props.onSwitchToLogin(email);
      } else {
        Alert.alert(
          "Signup Failed",
          "Email already exists. Please use a different email."
        );
      }
    } catch (error) {
      Alert.alert("Signup Failed", "Please check your details and try again.");
    }
  };

  return (
<View style={styles.formContainer}>
  <View style={styles.row}>
    <TextInput
      placeholder="First Name"
      onChangeText={setFirstName}
      value={firstName}
      style={[styles.input, styles.flexInput]}
    />
    <TextInput
      placeholder="Last Name"
      onChangeText={setLastName}
      value={lastName}
      style={[styles.input, styles.flexInput]}
    />
  </View>
  <TextInput
    placeholder="Carrier Code"
    onChangeText={setEmail}
    value={email}
    style={styles.input}
  />
  <TextInput
    placeholder="Email"
    onChangeText={setEmail}
    value={email}
    style={styles.input}
  />
  <TextInput
    placeholder="Password"
    onChangeText={setPassword}
    value={password}
    secureTextEntry
    style={styles.input}
  />
  <TextInput
    placeholder="Confirm Password"
    onChangeText={setConfirmPassword}
    value={confirmPassword}
    secureTextEntry
    style={styles.input}
  />

  <TouchableOpacity onPress={handleSignup} style={styles.button}>
    <Text style={styles.buttonText}>Sign Up</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Make sure the container takes full width
  },
  input: {
    width: "100%", // Original width for single inputs
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
  },
  flexInput: {
    flex: 1, // Makes input take equal space
    marginHorizontal: 5, // Adds space between the two inputs
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});


export default SignupForm;
