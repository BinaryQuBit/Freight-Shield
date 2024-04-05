// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icon Import
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
export default function CarrierCompanyDetailsForm() {
  const navigate = useNavigate();

  // Hooks
  const [businessName, setBusinessName] = useState("");
  const [doingBusinessAs, setDoingBusinessAs] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [carrierProfile, setCarrierProfile] = useState("");
  const [safetyFitnessCertificate, setSafetyFitnessCertificate] = useState("");
  const [canadianCarrierCode, setCanadianCarrierCode] = useState("");
  const [nationalSafetyCode, setNationalSafetyCode] = useState("");
  const [wcb, setWcb] = useState("");
  const [website, setWebsite] = useState("");

  // Error Hooks
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessNumberError, setBusinessNumberError] = useState("");
  const [carrierProfileError, setCarrierProfileError] = useState("");
  const [safetyFitnessCertificateError, setSafetyFitnessCertificateError] =
    useState("");
  const [canadianCarrierCodeError, setCanadianCarrierCodeError] = useState("");
  const [nationalSafetyCodeError, setNationalSafetyCodeError] = useState("");
  const [wcbError, setWcbError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  // Next Handle
  const handleNext = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setBusinessNameError("");
    setBusinessNumberError("");
    setCarrierProfileError("");
    setSafetyFitnessCertificateError("");
    setNationalSafetyCodeError("");
    setWcbError("");
    setCanadianCarrierCodeError("");
    setWebsiteError("");

    // Validations Checks
    const businessNameError = EmptyValidation("Business Name", businessName);
    const businessNumberError = EmptyValidation(
      "Business Number",
      businessNumber
    );
    const carrierProfileError = DocumentValidation(
      "Carrier Profile",
      carrierProfile
    );
    const safetyFitnessCertificateError = DocumentValidation(
      "Safety Fitness Certificate",
      safetyFitnessCertificate
    );
    const nationalSafetyCodeError = EmptyValidation(
      "National Safety Code",
      nationalSafetyCode
    );
    const wcbError = EmptyValidation("WCB", wcb);
    const canadianCarrierCodeError = EmptyValidation(
      "Canadian Carrier Code",
      canadianCarrierCode
    );
    const websiteError = WebsiteValidation(website);

    // Set Error
    setBusinessNameError(businessNameError);
    setBusinessNumberError(businessNumberError);
    setCarrierProfileError(carrierProfileError);
    setSafetyFitnessCertificateError(safetyFitnessCertificateError);
    setNationalSafetyCodeError(nationalSafetyCodeError);
    setWcbError(wcbError);
    setCanadianCarrierCodeError(canadianCarrierCodeError);
    setWebsiteError(websiteError);

    // Produce Error
    if (
      businessNameError ||
      businessNumberError ||
      carrierProfileError ||
      safetyFitnessCertificateError ||
      nationalSafetyCodeError ||
      wcbError ||
      canadianCarrierCodeError ||
      websiteError
    ) {
      return;
    }

    // Form Data
    const formData = new FormData();
    formData.append("businessName", businessName);
    formData.append("doingBusinessAs", doingBusinessAs);
    formData.append("businessNumber", businessNumber);
    formData.append("nationalSafetyCode", nationalSafetyCode);
    formData.append("wcb", wcb);
    formData.append("canadianCarrierCode", canadianCarrierCode);
    formData.append("website", website);

    if (carrierProfile) {
      formData.append("carrierProfile", carrierProfile);
    }
    if (safetyFitnessCertificate) {
      formData.append("safetyFitnessCertificate", safetyFitnessCertificate);
    }
    // Start of PUT Method
    try {
      const carrierBusinessDetailsResponse = await axios.put(
        "/api/carrierbusinessdetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );

      if (carrierBusinessDetailsResponse.status === 200) {
        navigate("/carriersubmission");
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
            id={"doingBusinessAs"}
            label={"Doing Business As"}
            value={doingBusinessAs}
            onChange={(e) => {
              setDoingBusinessAs(e.target.value);
            }}
            type={"text"}
            mt={8}
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

          <CustomInput
            id={"canadianCarrierCode"}
            label={"Canadian Carrier Code"}
            value={canadianCarrierCode}
            onChange={(e) => {
              setCanadianCarrierCode(e.target.value);
              setCanadianCarrierCodeError("");
            }}
            isError={!!canadianCarrierCodeError}
            errorMessage={canadianCarrierCodeError}
            isRequired={true}
            type={"text"}
            mt={8}
          />

          <CustomInput
            id={"nationalSafetyCode"}
            label={"National Safety Code"}
            value={nationalSafetyCode}
            onChange={(e) => {
              setNationalSafetyCode(e.target.value);
              setNationalSafetyCodeError("");
            }}
            isError={!!nationalSafetyCodeError}
            errorMessage={nationalSafetyCodeError}
            isRequired={true}
            type={"text"}
            mt={8}
          />

          <CustomInput
            id={"wcb"}
            label={"WCB Number"}
            value={wcb}
            onChange={(e) => {
              setWcb(e.target.value);
              setWcbError("");
            }}
            isError={!!wcbError}
            errorMessage={wcbError}
            isRequired={true}
            type={"text"}
            mt={8}
          />

          <CustomUpload
            id="carrierProfile"
            label="Carrier Profile"
            required={true}
            isError={!!carrierProfileError}
            errorMessage={carrierProfileError}
            mt={8}
            setError={setCarrierProfileError}
            setFileState={setCarrierProfile}
          />

          <CustomUpload
            id="safetyFitnessCertificate"
            label="Safety Business Certificate"
            required={true}
            isError={!!safetyFitnessCertificateError}
            errorMessage={safetyFitnessCertificateError}
            mt={8}
            setError={setSafetyFitnessCertificateError}
            setFileState={setSafetyFitnessCertificate}
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
