// React Imports
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon Import
import { RiLockPasswordFill } from "react-icons/ri";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Card, Text } from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import CustomInput from "../utils/forms/customInput";
import CustomLink from "../buttons/customLink";
import { EmailValidation } from "../utils/validation/emailValidation";
import {
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../utils/validation/passwordValidation";
import OTPModal from "../utils/validation/otpModal.js";

// Start of the Build
export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password Visibility Hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal Hook
  const [isOTPOpen, setOTPOpen] = useState(false);

  // Functions
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const onOpenOTP = () => setOTPOpen(true);
  const onCloseOTP = () => setOTPOpen(false);
  const onOTPClose = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  };

  // Handle Registration
  const handleForgotPassword = async (event) => {
    event.preventDefault();

    // Reset Error Hook
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation Check
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

    // Check Errors
    if (emailError || passwordError || confirmPasswordError) {
      return;
    }

    // Start of POST Method
    try {
      const response = await axios.post("/forgotpassword", { email });

      if (response.status === 200) {
        onOpenOTP();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
        if (error.response.data.message.includes("does not exist")) {
          setEmailError("Account does not exist");
        }
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  // Start of UI
  return (
    <>
      <Box p="4" w={{ base: "full", md: "50%" }}>
        <Card
          p="20px"
          maxWidth={{ base: "auto", md: "400px" }}
          mx="auto"
          rounded={"none"}
        >
          <form onSubmit={handleForgotPassword} noValidate>
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
              mt={"4"}
            />
            <CustomInput
              id={"password"}
              label={"New Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
              isError={!!passwordError}
              errorMessage={passwordError}
              isRequired={true}
              mt={8}
              isPassword={true}
              showPassword={showPassword}
              onToggleShowPassword={toggleShowPassword}
            />
            <CustomInput
              id={"confirmPassword"}
              label={"Confirm New Password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError("");
              }}
              isError={!!confirmPasswordError}
              errorMessage={confirmPasswordError}
              isRequired={true}
              mt={8}
              isPassword={true}
              showPassword={showConfirmPassword}
              onToggleShowPassword={toggleShowConfirmPassword}
            />
            <CustomButton
              variant={"blueForwardButton"}
              w={"100%"}
              type={"submit"}
              backgroundColor="#42B72A"
              children={"Reset Password"}
              icon={<RiLockPasswordFill />}
              mt={"7"}
            />
            <Flex justify="center" mt="4">
              <Text as="b" mr={"2"} fontSize={"13"}>
                Remember your password?
              </Text>
              <CustomLink
                fontSize={"14px"}
                onClick={() => navigate("/login")}
                children={"Log In"}
              />
            </Flex>
          </form>
        </Card>
      </Box>
      <OTPModal
        isOTPOpen={isOTPOpen}
        onCloseOTP={onCloseOTP}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        onModalClose={onOTPClose}
      />
    </>
  );
}
