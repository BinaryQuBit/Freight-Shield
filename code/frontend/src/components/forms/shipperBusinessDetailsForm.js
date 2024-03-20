// Shipper Business Detail Form

// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Text, Card } from "@chakra-ui/react";

// Custom Imports
import { EmptyValidation } from "../utils/validation/emptyValidation.js";
import { WebsiteValidation } from "../utils/validation/websiteValidation.js";
import CustomInput from "../utils/forms/customInput.js";
import CustomButton from "../buttons/customButton";
import logout from "../methods/logout";
import CustomUpload from "../buttons/customUpload.js";
import { DocumentValidation } from "../utils/validation/documentValidation.js";

// Start of the Build
export default function ShipperCompanyDetailsForm() {
  const navigate = useNavigate();

  // Hooks
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [proofBusiness, setProofBusiness] = useState("");
  const [proofInsurance, setProofInsurance] = useState("");
  const [website, setWebsite] = useState("");

  // Error Hooks
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessNumberError, setBusinessNumberError] = useState("");
  const [proofBusinessError, setProofBusinessError] = useState("");
  const [proofInsuranceError, setProofInsuranceError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  // Next Handle
  const handleNext = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setBusinessNameError("");
    setBusinessNumberError("");
    setProofBusinessError("");
    setProofInsuranceError("");
    setWebsiteError("");

    // Validations Checks
    const businessNameError = EmptyValidation("Business Name", businessName);
    const businessNumberError = EmptyValidation(
      "Business Number",
      businessNumber
    );
    const proofBusinessError = DocumentValidation(
      "Proof of Business",
      proofBusiness
    );
    const proofInsuranceError = DocumentValidation(
      "Proof of Insurance",
      proofInsurance
    );
    const websiteError = WebsiteValidation(website);

    // Set Error
    setBusinessNameError(businessNameError);
    setBusinessNumberError(businessNumberError);
    setProofBusinessError(proofBusinessError);
    setProofInsuranceError(proofInsuranceError);
    setWebsiteError(websiteError);

    // Produce Error
    if (
      businessNameError ||
      businessNumberError ||
      proofBusinessError ||
      proofInsuranceError ||
      websiteError
    ) {
      return;
    }

    // Form Data
    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("businessNumber", businessNumber);
    formData.append("website", website);

    if (proofBusiness) {
      formData.append("proofBusiness", proofBusiness);
    }
    if (proofInsurance) {
      formData.append("proofInsurance", proofInsurance);
    }
    // Start of PUT Method
    try {
      const shipperBusinessDetailsResponse = await axios.put(
        "/api/shipperbusinessdetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );

      if (shipperBusinessDetailsResponse.status === 200) {
        navigate("/shippersubmission");
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
    <Box mb={20}>
      <Card
        p="20px"
        m={"20px"}
        maxWidth={{ base: "auto", md: "400px" }}
        mx="auto"
        rounded={"none"}
      >
        <Text fontWeight={"bold"} textAlign={"center"} pb={"7"}>
          Business Details
        </Text>
        <form onSubmit={handleNext} noValidate>
          <CustomInput
            id={"businessName"}
            label={"Business Name"}
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
              setBusinessNameError("");
            }}
            isError={!!businessNameError}
            errorMessage={businessNameError}
            isRequired={true}
            type={"text"}
          />

          <CustomInput
            id={"businessNumber"}
            label={"Business Number"}
            value={businessNumber}
            onChange={(e) => {
              setBusinessNumber(e.target.value);
              setBusinessNumberError("");
            }}
            isError={!!businessNumberError}
            errorMessage={businessNumberError}
            isRequired={true}
            type={"text"}
            mt={8}
          />

          <CustomUpload
            id="proofBusiness"
            label="Proof of Business"
            required={true}
            isError={!!proofBusinessError}
            errorMessage={proofBusinessError}
            mt={8}
            setError={setProofBusinessError}
            setFileState={setProofBusiness}
          />

          <CustomUpload
            id="proofInsurance"
            label="Proof of Insurance"
            required={true}
            isError={!!proofInsuranceError}
            errorMessage={proofInsuranceError}
            mt={8}
            setError={setProofInsuranceError}
            setFileState={setProofInsurance}
          />

          <CustomInput
            id={"website"}
            label={"Website"}
            value={website}
            onChange={(e) => {
              setWebsite(e.target.value);
            }}
            isError={!!websiteError}
            errorMessage={websiteError}
            type={"text"}
            mt={8}
          />

          <Flex justifyContent={"space-between"} mt={"7"}>
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="100px"
              children="Logout"
              variant="blueBackwardButton"
              onClick={() => logout(navigate)}
            />
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="100px"
              type="submit"
              children="Next"
              variant="blueForwardButton"
            />
          </Flex>
        </form>
      </Card>
    </Box>
  );
}
