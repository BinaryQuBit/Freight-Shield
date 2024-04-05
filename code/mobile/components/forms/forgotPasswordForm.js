// React Imports
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Alert, View } from "react-native";

// Axios Imports
import axios from "axios";

// Custom Imports
import { EmailValidation } from "../validation/emailValidation";
import {
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../validation/passwordValidation";
import CustomInput from "../customs/customInput";
import CustomButton from "../customs/customButton";
import CustomModal from "../customs/customModal";
import OtpForm from "./otpForm";

// Start of the Build
export default function ForgotPasswordForm() {
  axios.defaults.withCredentials = true;
  const navigation = useNavigation();

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Functions
  const handleSendOTP = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation Checks
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);
    const confirmPasswordError = ConfirmPasswordValidation(
      password,
      confirmPassword
    );

    // Set Error
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    // Produce Error
    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    // Start of POST Method
    try {
      const loginResponse = await axios.post(`${ipConfig}/login`, {
        email,
        password,
        confirmPassword,
      });
      if (loginResponse.status === 201) {
        navigation.navigate("MainApp");
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
      <Text style={styles.title}>Forgot Password</Text>
      <CustomInput
        label="Email"
        required={true}
        value={email}
        onChangeText={(newEmail) => {
          setEmail(newEmail);
          setEmailError("");
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
          setPasswordError("");
        }}
        autoCapitalize="none"
        errorMessage={passwordError}
        secureTextEntry={true}
      />
      <CustomInput
        label="Confirm Password"
        required={true}
        value={confirmPassword}
        onChangeText={(newConfirmPassword) => {
          setConfirmPassword(newConfirmPassword);
          setConfirmPasswordError("");
        }}
        autoCapitalize="none"
        errorMessage={confirmPasswordError}
        secureTextEntry={true}
      />
      <CustomButton
        onPress={() => setOtpModalVisible(true)}
        children={"Send OTP"}
        pH={30}
        fs={16}
      />
      <CustomModal
        modalVisible={otpModalVisible}
        setModalVisible={setOtpModalVisible}
        children={<OtpForm email={email} />}
        animationType={"fade"}
        paddingVertical={33}
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
