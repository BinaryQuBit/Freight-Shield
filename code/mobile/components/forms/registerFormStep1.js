// React Imports
import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";

// Axios Imports
import axios from "axios";

// Custom Imports
import { EmptyValidation } from "../validation/emptyValidation";
import { EmailValidation } from "../validation/emailValidation";
import {
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../validation/passwordValidation";
import CustomInput from "../customs/customInput";
import CustomButton from "../customs/customButton";
import CustomModal from "../customs/customModal";
import RegisterFormStep2 from "./registerFormStep2";

// Start of the Build
export default function RegisterFormStep1({closeRegister1}) {
  const ipConfig = process.env.REACT_IP_CONFIG;
  axios.defaults.withCredentials = true;

  // Hooks
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerFormStep2ModalVisible, setRegisterFormStep2ModalVisible] = useState("");

  // Error Hooks
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleRegisterStep1 = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation Checks
    const firstNameError = EmptyValidation("First Name", firstName);
    const lastNameError = EmptyValidation("Last Name", lastName);
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);
    const confirmPasswordError = ConfirmPasswordValidation(
      password,
      confirmPassword
    );

    // Set Error
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    // Produce Error
    if (
      firstNameError ||
      lastNameError ||
      emailError ||
      passwordError ||
      confirmPasswordError
    ) {
      return;
    }

    // Start of POST Method
    try {
      const registerResponse = await axios.post(`${ipConfig}/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role: "driver",
      });

      if (registerResponse.status === 201) {
        setRegisterFormStep2ModalVisible(true);
        // closeRegister1();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Registration error:", error);
        Alert.alert(
          "Registration Failed",
          "An account with this email already exists"
        );
      } else {
        console.error("Registration error:", error);
        Alert.alert(
          "Registration Failed",
          "Please check your credentials and try again."
        );
      }
    }
  };
  return (
    <>
      <Text style={styles.title}>Register</Text>
      <CustomInput
        label="First Name"
        required={true}
        value={firstName}
        onChangeText={(newFirstName) => {
          setFirstName(newFirstName);
          setFirstNameError("");
        }}
        keyboardType="default"
        errorMessage={firstNameError}
      />
      <CustomInput
        label="Last Name"
        required={true}
        value={lastName}
        onChangeText={(newLastName) => {
          setLastName(newLastName);
          setLastNameError("");
        }}
        keyboardType="default"
        errorMessage={lastNameError}
      />
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
      <CustomButton onPress={handleRegisterStep1} children={"Next"} pH={30} fs={16} />
      {/* <CustomButton onPress={() => setRegisterFormStep2ModalVisible(true)} children={"Next"} pH={30} /> */}
      <CustomModal
          modalVisible={registerFormStep2ModalVisible}
          setModalVisible={setRegisterFormStep2ModalVisible}
          children={<RegisterFormStep2 closeModal={() => { setRegisterFormStep2ModalVisible(false); closeRegister1(); }} />}
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
