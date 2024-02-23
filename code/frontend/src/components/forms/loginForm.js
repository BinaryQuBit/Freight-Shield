// Login Form

// React Imports
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Text, Card } from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import CustomInput from "../utils/forms/customInput";
import CustomLink from "../buttons/customLink";
import { EmailValidation } from "../utils/validation/emailValidation";
import { PasswordValidation } from "../utils/validation/passwordValidation";

// Start of the Build
export default function LoginForm() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  // Hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Password Visibility Hooks
  const [showPassword, setShowPassword] = useState(false);

  // Functions
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Login Handle
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
      console.log(emailError, passwordError);
      return;
    }

    // Start of POST Method
    try {
      const loginResponse = await axios.post("/login", { email, password });

      if (![201, 200].includes(loginResponse.status)) {
        throw new Error("Login failed");
      }

      const role = loginResponse.data.role;
      const contactDetails = loginResponse.data.areContactDetailsComplete;
      const businessDetails = loginResponse.data.areBusinessDetailsComplete;
      const submissionComplete = loginResponse.data.isFormComplete;

      if (role === "carrier")
      {
        if(contactDetails == false)
        {
          navigate("/carriercontactdetails");
        }
        else if (businessDetails == false)
        {
          navigate("/carrierbusinessdetails");
        }
        else if (submissionComplete == false)
        {
          navigate("/carriersubmission");
        }
        else
        {
          navigate("/marketplace");
        }
      }
      else if (role === "shipper") {
        if(contactDetails == false)
        {
          navigate("/shippercontactdetails");
        }
        else if (businessDetails == false)
        {
          navigate("/shipperbusinessdetails");
        }
        else if (submissionComplete == false)
        {
          navigate("/shippersubmission");
        }
        else
        {
          navigate("/activeloads");
        }
      }
      else if (role === "admin")
      {
        navigate("/pending");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
        if (error.response.data.message.includes("Invalid")) {
          setPasswordError("Invalid Email or Password");
        }
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  // Start of the UI
  return (
    <Box p="4" w={{ base: "full", md: "50%" }}>
      <Card
        p="20px"
        maxWidth={{ base: "auto", md: "400px" }}
        mx="auto"
        rounded={"none"}
      >
        <form onSubmit={handleLogin} noValidate>
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
          <CustomButton
            backgroundColor="#0866FF"
            icon={<FiTruck />}
            mt="8"
            w="full"
            type="submit"
            children="Log In"
            variant="blueForwardButton"
          />
          <Flex justify="center" mt="2">
            <CustomLink
              fontSize={"14px"}
              onClick={() => navigate("/forgotpassword")}
              children={"Forgot Password"}
            />
          </Flex>
          <CustomButton
            backgroundColor="#42B72A"
            icon={<FiTruck />}
            mt="8"
            w="full"
            onClick={() => navigate("/register")}
            children="Create an Account"
            variant="blueForwardButton"
          />
        </form>
      </Card>
      <Text textAlign="center" mt="2">
        <strong>Your Ultimate Loadboard Solution!</strong>
      </Text>
    </Box>
  );
}
