// React Imports
import React, { useState, useEffect } from "react";

// Icon Imports
import { FaRegSave } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
} from "@chakra-ui/react";

// Custom Imports
import CustomInput from "../utils/forms/customInput";
import CustomButton from "../buttons/customButton";
import { EmptyValidation } from "../utils/validation/emptyValidation.js";
import { PhoneNumberValidation } from "../utils/validation/phoneNumberValidation.js";
import { EmailValidation } from "../utils/validation/emailValidation.js";

// Start of the Build
export default function EditAdminDetails({ isOpen, onClose, data }) {
  axios.defaults.withCredentials = true;

  // Hooks
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Error Hooks
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // Render Saved Data
  useEffect(() => {
    if (data) {
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setPhoneNumber(data.phoneNumber || "");
      setEmail(data.email || "");
    }
  }, [data]);

  // Functions
  const handleCloseClick = () => {
    onClose();
  };

  // Edit Handle
  const handleSave = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setEmailError("");
    setPhoneNumberError("");
    setFirstNameError("");
    setLastNameError("");

    // Validation Checks
    const firstNameError = EmptyValidation("First Name", firstName);
    const lastNameError = EmptyValidation("Last Name", lastName);
    const emailError = EmailValidation(email);
    const phoneNumberError = PhoneNumberValidation(phoneNumber);

    // Set Errors
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setPhoneNumberError(phoneNumberError);
    setEmailError(emailError);

    // Error Checks
    if (firstNameError || lastNameError || phoneNumberError || emailError) {
      return;
    }

    // Object Creation of the Data
    try {
      const adminData = {
        firstName,
        lastName,
        phoneNumber,
        email,
      };

      // Start of PUT Method
      const response = await axios.put("/api/editadmin", adminData);

      // Window Reload
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size={"3xl"} isClosable={false}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader textAlign={"center"}>Edit Shipper Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSave} noValidate>
            <Flex>
              {/* First Name Input */}
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
              />

              {/* Last Name Input */}
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
              />
            </Flex>
            <Flex>
              {/* Phone Number Input */}
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
                mt={8}
              />

              {/* Email Input */}
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
                mt={8}
              />
            </Flex>

            <Flex justifyContent={"space-between"} mt={"7"}>
              {/* Close Button */}
              <CustomButton
                backgroundColor="#0866FF"
                icon={<IoMdCloseCircle />}
                mt="4"
                w="100px"
                children="Close"
                variant="blueBackwardButton"
                onClick={handleCloseClick}
              />

              {/* Save Button */}
              <CustomButton
                backgroundColor="#0866FF"
                icon={<FaRegSave />}
                mt="4"
                w="100px"
                type="submit"
                children="Save"
                variant="blueForwardButton"
              />
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
