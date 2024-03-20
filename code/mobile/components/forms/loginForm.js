// React Imports
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Alert } from "react-native";

// Axios Imports
import axios from "axios";

// Custom Imports
import { EmailValidation } from "../validation/emailValidation";
import { PasswordValidation } from "../validation/passwordValidation";
import CustomInput from "../customs/customInput";
import CustomButton from "../customs/customButton";
import CustomLink from "../customs/customLink";
import CustomModal from "../customs/customModal"
import ForgotPasswordForm from "./forgotPasswordForm";

// Start of the Build
export default function LoginForm() {
  const ipConfig = process.env.REACT_IP_CONFIG;
  axios.defaults.withCredentials = true;
  const navigation = useNavigation();

  // Hooks
  const [email, setEmail] = useState("driver@driver.com");
  const [password, setPassword] = useState("12345678");
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] = useState(false);

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setEmailError("");
    setPasswordError("");

    // Validation Checks
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);

    // Set Error
    setEmailError(emailError);
    setPasswordError(passwordError);

    // Produce Error
    if (emailError || passwordError) {
      return;
    }

    // Start of POST Method
    try {
      const loginResponse = await axios.post(`${ipConfig}/login`, {
        email,
        password,
      });
      if (loginResponse.status === 201) {
        navigation.navigate("NavBar");
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
    <>
      <Text style={styles.title}>Login</Text>
      <CustomInput
        label="Email"
        required={true}
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
          setEmailError('');
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        errorMessage={emailError}
      />
      <CustomInput
        label="Password"
        required={true}
        value={password}
        onChangeText={(newPassword) => {
          setPassword(newPassword);
          setPasswordError('');
        }}
        autoCapitalize="none"
        errorMessage={passwordError}
        secureTextEntry={true}
      />
      <CustomButton onPress={handleLogin} children={"Login"} pH={30} fs={16} />
      <CustomLink
        onPress={() => setForgotPasswordModalVisible(true)}
        children="Forgot Password?"
      />
        <CustomModal
          modalVisible={forgotPasswordModalVisible}
          setModalVisible={setForgotPasswordModalVisible}
          children={<ForgotPasswordForm />}
          animationType={"fade"}
        />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora-Bold",
    color: "#0866FF",
  },
});
