// Register Form

// React Imports
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdSwitchAccount } from "react-icons/md";
import { FiTruck } from "react-icons/fi";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Card, Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  } from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import Terms from "../laws/termsConditions";
import Privacy from "../laws/privacyPolicy";
import CustomInput from "../utils/forms/customInput";
import CustomLink from "../buttons/customLink";
import CustomSelect from "../utils/forms/customSelect";
import { EmailValidation } from "../utils/validation/emailValidation";
import {
  PasswordValidation,
  ConfirmPasswordValidation,
} from "../utils/validation/passwordValidation";
import { SelectValidation } from "../utils/validation/selectValidation";

// Start of the Build
export default function RegisterForm() {
  const navigate = useNavigate();

  // Hooks
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  // Error Hooks
  const [roleError, setRoleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password Visibility Hooks
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal Hooks
  const [isTermsOpen, setTermsOpen] = useState(false);
  const [isPrivacyOpen, setPrivacyOpen] = useState(false);
  const onCloseSuccess = () => setSuccessOpen(false);


  // Functions
  const onOpenTerms = () => setTermsOpen(true);
  const onCloseTerms = () => setTermsOpen(false);
  const onOpenPrivacy = () => setPrivacyOpen(true);
  const onClosePrivacy = () => setPrivacyOpen(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle Registration
  const handleRegistration = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setRoleError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validation Checks
    const roleError = SelectValidation(role);
    const emailError = EmailValidation(email);
    const passwordError = PasswordValidation(password);
    const confirmPasswordError = ConfirmPasswordValidation(
      password,
      confirmPassword
    );

    // Set Error
    setRoleError(roleError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setConfirmPasswordError(confirmPasswordError);

    // Start of Post Method
    if (roleError || emailError || passwordError || confirmPasswordError) {
      return;
    }
    try {
      const response = await axios.post("/register", {
        role,
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        setSuccessOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
        if (error.response.data.message.includes("already exists")) {
          setEmailError("An account with this email already exists")
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
          rounded={"no"}
        >
          <form onSubmit={handleRegistration} noValidate>
            <CustomSelect
              id={"role"}
              isRequired={true}
              isError={!!roleError}
              placeholder={"Select Role"}
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setRoleError("");
              }}
              value1={"shipper"}
              children1={"I am a Shipper"}
              value2={"carrier"}
              children2={"I am a Carrier"}
              errorMessage={roleError}
            />
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
              mt={8}
              type={"email"}
            />
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
              mt={8}
              isPassword={true}
              showPassword={showPassword}
              onToggleShowPassword={toggleShowPassword}
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
              children={"Create an Account"}
              icon={<MdSwitchAccount />}
              mt={"7"}
            />

            <Flex justify="center" textAlign={"center"} mt={"1"}>
              <Text as="b" fontSize={"10"}>
                By registering, you agree to our
                <CustomLink
                  fontSize={"11px"}
                  onClick={onOpenTerms}
                  ml={1}
                  mr={1}
                  children={"Terms of Service"}
                />
                and
                <CustomLink
                  fontSize={"11px"}
                  onClick={onOpenPrivacy}
                  ml={1}
                  mr={1}
                  children={"Privacy Policy"}
                />
              </Text>
            </Flex>
            <Flex justify="center" mt="4">
              <Text as="b" mr={"2"} fontSize={"13"}>
                Already have an Account?
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
      <Modal isOpen={isSuccessOpen} onClose={onCloseSuccess}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader textAlign={"center"}>Registration Successful</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
  <Flex direction="column" align="center" justify="center">
    <Text mt={4} textAlign={"center"}>Your account has been successfully created!</Text>
  </Flex>
</ModalBody>
    <ModalFooter>
      <CustomButton
       variant={"blueForwardButton"}
       w={"100px"}
       children={"Login"}
       icon={<FiTruck />}
       onClick={() => {
        onCloseSuccess();
        navigate("/login");
       }}
      />
    </ModalFooter>
  </ModalContent>
</Modal>
      <Terms isTermsOpen={isTermsOpen} onCloseTerms={onCloseTerms} />
      <Privacy isPrivacyOpen={isPrivacyOpen} onClosePrivacy={onClosePrivacy} />
    </>
  );
}
