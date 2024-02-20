import React, { useState, useEffect } from "react";
import CustomButton from "../buttons/customButton";
import { FiTruck, FiUpload, FiXCircle } from "react-icons/fi";
import { useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";

// These are REGEX
const websiteRegex =
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

// A validation Function
const validateField = (regex, value) => {
  return value.trim() !== "" && regex.test(value);
};

// Start of Component
export default function ShipperCompanyDetailsForm() {
  // Navigation
  const navigate = useNavigate();

  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue[500];

  // These are states/hooks to be saved in the data base aka Initial Data
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [proofBusiness, setProofBusiness] = useState(null);
  const [proofInsurance, setProofInsurance] = useState(null);
  const [proofBusinessFileName, setProofBusinessFileName] = useState("");
  const [proofInsuranceFileName, setProofInsuranceFileName] = useState("");
  const [website, setWebsite] = useState("");

  // These are Error Hooks
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessNumberError, setBusinessNumberError] = useState("");
  const [proofBusinessError, setProofBusinessError] = useState("");
  const [proofInsuranceError, setProofInsuranceError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  // Another state/hook to check if the data is in correct format on submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // What happens when you click next
  const handleNext = async (event) => {
    event.preventDefault();

    // Setting the error states to null
    setBusinessNameError("");
    setBusinessNumberError("");
    setProofBusinessError("");
    setProofInsuranceError("");
    setWebsiteError("");
    setFormSubmitted(true);
    let allValid = true;

    // Checking if the data is Null
    if (businessName.trim() === "") {
      setBusinessNameError("Business Name is required");
      allValid = false;
    }
    if (businessNumber.trim() === "") {
      setBusinessNumberError("Business Number is required");
      allValid = false;
    }
    if (!proofBusiness && !proofBusinessFileName) {
      setProofBusinessError("Proof of Business is required");
      allValid = false;
    }
    if (!proofInsurance && !proofInsuranceFileName) {
      setProofInsuranceError("Proof of Insurance is required");
      allValid = false;
    }
    if (website && !validateField(websiteRegex, website)) {
      setWebsiteError("Invalid website URL");
      allValid = false;
    }

    // If everything is correct how it is suppose to be
    if (allValid) {
      const formData = new FormData();
      formData.append("businessName", businessName);
      formData.append("businessNumber", businessNumber);
      formData.append("website", website);

      try {
        const response = await axios.put(
          "http://localhost:8080/api/users/shipperbusinessdetails",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          navigate("/shippersubmission");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("All fields must be filled");
    }
  };

  useEffect(() => {
    const fetchShipperBusinessDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/login",
          { withCredentials: true }
        );

        const shipperDetails = response.data[0];
        setBusinessName(shipperDetails.businessName || "");
        setBusinessNumber(shipperDetails.businessNumber || "");
        setWebsite(shipperDetails.website || "");

        // Construct the file URLs
        if (shipperDetails.proofBusiness) {
          setProofBusinessFileName(
            `http://localhost:8080/uploads/${shipperDetails.proofBusiness}`
          );
        }
        if (shipperDetails.proofInsurance) {
          setProofInsuranceFileName(
            `http://localhost:8080/uploads/${shipperDetails.proofInsurance}`
          );
        }
      } catch (error) {
        console.error("Error Fetching Shipper Business Page: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      }
    };

    fetchShipperBusinessDetails();
  }, [navigate]);

  // Handle Proof of Business Upload
  const handleProofBusinessChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProofBusiness(file);

      const formData = new FormData();
      formData.append("proofBusiness", file);

      try {
        const response = await axios.put("/proofBusiness", formData, {
          withCredentials: true,
        });
        if (response.data && response.data.fileName) {
          setProofBusinessFileName(
            `http://localhost:8080/uploads/${response.data.fileName}`
          );
        }
      } catch (error) {
        console.error("Error uploading proof of business file:", error);
      }
    }
  };

  // Handle Proof of Business Remove
  const removeProofBusiness = async (fileUrl) => {
    try {
      // Extracting the filename from the URL
      const filename = fileUrl.split("/").pop();
      if (!filename) {
        console.error("Filename is undefined");
        return;
      }
      console.log(filename);

      const url = `/proofBusiness/${filename}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Proof of Business file deleted successfully.");
        setProofBusiness(null);
        setProofBusinessFileName("");
      }
    } catch (error) {
      console.error("Error deleting proof of business file:", error);
    }
  };

  // Handle Proof of Insurance Upload
  const handleProofInsuranceChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setProofInsurance(file);

      const formData = new FormData();
      formData.append("proofInsurance", file);

      try {
        const response = await axios.put("/proofInsurance", formData, {
          withCredentials: true,
        });
        if (response.data && response.data.fileName) {
          setProofInsuranceFileName(
            `http://localhost:8080/uploads/${response.data.fileName}`
          );
        }
      } catch (error) {
        console.error("Error uploading proof of insurance file:", error);
      }
    }
  };

  // Handle Proof of Insurance Remove
  const removeProofInsurance = async (fileUrl) => {
    try {
      // Extracting the filename from the URL
      const filename = fileUrl.split("/").pop();
      if (!filename) {
        console.error("Filename is undefined");
        return;
      }
      console.log(filename);

      const url = `/proofInsurance/${filename}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("Proof of Insurance file deleted successfully.");
        setProofInsurance(null);
        setProofInsuranceFileName("");
      }
    } catch (error) {
      console.error("Error deleting proof of insurance file:", error);
    }
  };

  return (
    <Box mb={20}>
      <Card
        p="20px"
        m={"20px"}
        maxWidth={{ base: "auto", md: "400px" }}
        mx="auto"
      >
        <Text fontWeight={"bold"} textAlign={"center"} pb={"7"}>
          Business Details
        </Text>
        <form onSubmit={handleNext}>
          {/* This is Business Name */}
          <FormControl
            variant="floating"
            id="businessName"
            isRequired
            isInvalid={formSubmitted && businessNameError}
          >
            <Input
              type="text"
              name="businessName"
              placeholder=" "
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              borderColor={
                formSubmitted && businessNameError ? "red" : "lightgrey"
              }
            />
            <FormLabel>Business Name</FormLabel>
            {businessNameError && (
              <FormErrorMessage>{businessNameError}</FormErrorMessage>
            )}
          </FormControl>

          {/* This is Business Number */}
          <FormControl
            variant="floating"
            mt="7"
            id="businessNumber"
            isRequired
            isInvalid={formSubmitted && businessNumberError}
          >
            <Input
              type="text"
              name="businessNumber"
              placeholder=" "
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
              borderColor={
                formSubmitted && businessNumberError ? "red" : "lightgrey"
              }
            />
            <FormLabel>Business Number</FormLabel>
            {businessNumberError && (
              <FormErrorMessage>{businessNumberError}</FormErrorMessage>
            )}
          </FormControl>

          {/* This is Proof of Business */}
          <FormControl
            mr={"1.5"}
            id="proofBusiness"
            isRequired
            isInvalid={formSubmitted && proofBusinessError}
          >
            <FormLabel
              fontSize={"13.5px"}
              ml={"15px"}
              mt={"10px"}
            >
              Proof of Business
            </FormLabel>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid lightgrey"
              padding="8px"
              borderRadius="4px"
              position="relative"
            >
              {proofBusinessFileName ? (
                <>
                  <a
                    href={proofBusinessFileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "auto", color: customBlue }}
                  >
                    View Proof of Business
                  </a>
                  <FiXCircle
                    color={customBlue}
                    onClick={() => removeProofBusiness(proofBusinessFileName)}
                    cursor="pointer"
                    size="1.25em"
                  />
                </>
              ) : (
                <>
                  <label
                    htmlFor="proofBusinessInput"
                    style={{ marginRight: "auto" }}
                  >
                    Upload Proof of Business
                  </label>
                  <FiUpload style={{ marginRight: "8px", color: "blue" }} />
                  <Input
                    type="file"
                    accept=".pdf, .doc, .docx, .jpg, .png"
                    id="proofBusinessInput"
                    onChange={handleProofBusinessChange}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                </>
              )}
            </Box>
            {proofBusinessError && (
              <FormErrorMessage>{proofBusinessError}</FormErrorMessage>
            )}
          </FormControl>

          {/* This is Proof of Insurance */}
          <FormControl
            mr={"1.5"}
            id="proofInsurance"
            isRequired
            isInvalid={formSubmitted && proofInsuranceError}
          >
            <FormLabel
              fontSize={"13.5px"}
              ml={"15px"}
              mt={"10px"}
            >
              Proof of Insurance
            </FormLabel>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              border="1px solid lightgrey"
              padding="8px"
              borderRadius="4px"
              position="relative"
            >
              {proofInsuranceFileName ? (
                <>
                  <a
                    href={proofInsuranceFileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "auto", color: customBlue }}
                  >
                    View Proof of Insurance
                  </a>
                  <FiXCircle
                    color={customBlue}
                    onClick={() => removeProofInsurance(proofInsuranceFileName)}
                    cursor="pointer"
                    size="1.25em"
                  />
                </>
              ) : (
                <>
                  <label
                    htmlFor="proofInsuranceInput"
                    style={{ marginRight: "auto" }}
                  >
                    Upload Proof of Insurance
                  </label>
                  <FiUpload style={{ marginRight: "8px", color: "blue" }} />
                  <Input
                    type="file"
                    accept=".pdf, .doc, .docx, .jpg, .png"
                    id="proofInsuranceInput"
                    onChange={handleProofInsuranceChange}
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                </>
              )}
            </Box>
            {proofInsuranceError && (
              <FormErrorMessage>{proofInsuranceError}</FormErrorMessage>
            )}
          </FormControl>

          {/* This is Website */}
          <FormControl
            variant="floating"
            mt={"7"}
            id="website"
            isInvalid={formSubmitted && websiteError}
          >
            <Input
              type="text"
              name="website"
              placeholder=" "
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              borderColor={formSubmitted && websiteError ? "red" : "lightgrey"}
            />
            <FormLabel>Website</FormLabel>
            {websiteError && (
              <FormErrorMessage>{websiteError}</FormErrorMessage>
            )}
          </FormControl>
          <Flex justifyContent={"space-between"} mt={"7"}>
            {/* This is Back Button */}
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="90px"
              children="Back"
              variant="blueBackwardButton"
              onClick={() => navigate("/shippercontactdetails")}
            />

            {/* This is Next Button */}
            <CustomButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="90px"
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
