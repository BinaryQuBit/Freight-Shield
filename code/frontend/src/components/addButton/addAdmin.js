import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { useTheme } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
} from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import { EmptyValidation } from "../utils/validation/emptyValidation";
import CustomInput from "../utils/forms/customInput";
import { EmailValidation } from "../utils/validation/emailValidation";
import {
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../utils/validation/passwordValidation";
import { PhoneNumberValidation } from "../utils/validation/phoneNumberValidation";

export default function AddAdmin({ isOpen, onClose }) {
  axios.defaults.withCredentials = true;
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Functions
  const handleCloseClick = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");
    onClose();
  };

  // Add Unit Handle
  const handleAddAdmin = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneNumberError("");

    // Validation Checks
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);
    const confirmPasswordError = ConfirmPasswordValidation(
      password,
      confirmPassword
    );
    const firstNameError = EmptyValidation("First Name", firstName);
    const lastNameError = EmptyValidation("Last Name", lastName);
    const phoneNumberError = PhoneNumberValidation(phoneNumber);

    // Set Errors
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setPhoneNumberError(phoneNumberError);

    // Checking Errors
    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      firstNameError ||
      lastNameError ||
      phoneNumberError
    ) {
      return;
    }

    // Start of POST Method
    try {
      const addAdminResponse = await axios.post("/register", {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        phoneNumber,
        role: "admin",
      });
      if (addAdminResponse.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.error("Error: ", error.response.data.message);
        if (error.response.data.message.includes("already exists")) {
          setEmailError("An account with this email already exists");
        }
      } else {
        // console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="3xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader textAlign={"center"}>Add New Admin</ModalHeader>
        <form onSubmit={handleAddAdmin} noValidate>
          <ModalBody>
            <Flex>
              <CustomInput
                id={"email"}
                label={"Email"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                isError={!!emailError}
                errorMessage={emailError}
                isRequired={true}
                type={"email"}
                mr={2}
                mt={2}
              />
              <CustomInput
                id={"phoneNumber"}
                label={"Phone Number"}
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  setPhoneNumberError("");
                }}
                isError={!!phoneNumberError}
                errorMessage={phoneNumberError}
                isRequired={true}
                type={"tel"}
                mr={2}
                mt={2}
              />
            </Flex>

            <Flex>
              <CustomInput
                id={"firstName"}
                label={"First Name"}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setFirstNameError("");
                }}
                isError={!!firstNameError}
                errorMessage={firstNameError}
                isRequired={true}
                type={"text"}
                mr={2}
                mt={8}
              />
              <CustomInput
                id={"lastName"}
                label={"Last Name"}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setLastNameError("");
                }}
                isError={!!lastNameError}
                errorMessage={lastNameError}
                isRequired={true}
                type={"text"}
                ml={2}
                mt={8}
              />
            </Flex>
            <Flex>
              <CustomInput
                id={"password"}
                label={"Password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                isError={!!passwordError}
                errorMessage={passwordError}
                isRequired={true}
                isPassword={true}
                showPassword={showPassword}
                onToggleShowPassword={toggleShowPassword}
                mr={2}
                mt={8}
              />
              <CustomInput
                id={"confirmPassword"}
                label={"Confirm Password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setConfirmPasswordError("");
                }}
                isError={!!confirmPasswordError}
                errorMessage={confirmPasswordError}
                isRequired={true}
                isPassword={true}
                showPassword={showConfirmPassword}
                onToggleShowPassword={toggleShowConfirmPassword}
                ml={2}
                mt={8}
              />
            </Flex>

            <Flex justifyContent="space-between">
              <CustomButton
                color={customBlue}
                icon={<IoMdCloseCircle />}
                mt="8"
                w="90px"
                children="Close"
                variant="blueBackwardButton"
                onClick={handleCloseClick}
              />
              <CustomButton
                color={customBlue}
                icon={<IoMdAddCircle />}
                mt="8"
                w="90px"
                type="submit"
                children="Add"
                variant="blueForwardButton"
              />
            </Flex>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}
