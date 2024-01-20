import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const LoginForm = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://10.69.92.62:8080/api/users/login", { email, password });

      if (response.status === 201) {
        navigation.navigate('Drawer', { screen: 'Home'});
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };

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
