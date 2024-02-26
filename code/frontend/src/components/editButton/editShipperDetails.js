// Edit Shipper Details

// React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import CustomUpload from "../buttons/customUpload";
import CustomButton from "../buttons/customButton";
import { EmptyValidation } from "../utils/validation/emptyValidation.js";
import { PhoneNumberValidation } from "../utils/validation/phoneNumberValidation.js";
import { PostalCodeValidation } from "../utils/validation/postalCodeValidation.js";
import { WebsiteValidation } from "../utils/validation/websiteValidation.js";
import { DocumentValidation } from "../utils/validation/documentValidation.js";

// Start of the Build
export default function EditShipperDetails({ isOpen, onClose, data }) {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const backendUrl = "http://localhost:8080";

  // Hooks
  const [streetAddress, setStreetAddress] = useState("");
  const [apptNumber, setApptNumber] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [mailingStreetAddress, setMailingStreetAddress] = useState("");
  const [mailingApptNumber, setMailingApptNumber] = useState("");
  const [mailingCity, setMailingCity] = useState("");
  const [mailingProvince, setMailingProvince] = useState("");
  const [mailingPostalCode, setMailingPostalCode] = useState("");
  const [mailingCountry, setMailingCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessNumber, setBusinessNumber] = useState("");
  const [proofBusiness, setProofBusiness] = useState("");
  const [proofInsurance, setProofInsurance] = useState("");
  const [website, setWebsite] = useState("");

  // Error Hooks
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [mailingStreetAddressError, setMailingStreetAddressError] =
    useState("");
  const [mailingCityError, setMailingCityError] = useState("");
  const [mailingProvinceError, setMailingProvinceError] = useState("");
  const [mailingPostalCodeError, setMailingPostalCodeError] = useState("");
  const [mailingCountryError, setMailingCountryError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [companyPhoneNumberError, setCompanyPhoneNumberError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [businessNumberError, setBusinessNumberError] = useState("");
  const [proofBusinessError, setProofBusinessError] = useState("");
  const [proofInsuranceError, setProofInsuranceError] = useState("");
  const [websiteError, setWebsiteError] = useState("");

  // Render Saved Data
  useEffect(() => {
    setFirstName(data.firstName || '');
    setLastName(data.lastName || '');
    setCompanyPhoneNumber(data.companyPhoneNumber || '');
    setStreetAddress(data.streetAddress || '');
    setApptNumber(data.apptNumber || '');
    setCity(data.city || '');
    setProvince(data.province || '');
    setPostalCode(data.postalCode || '');
    setCountry(data.country || '');
    setMailingStreetAddress(data.mailingStreetAddress || '');
    setMailingApptNumber(data.mailingApptNumber || '');
    setMailingCity(data.mailingCity || '');
    setMailingProvince(data.mailingProvince || '');
    setMailingPostalCode(data.mailingPostalCode || '');
    setMailingCountry(data.mailingCountry || '');
    setBusinessName(data.businessName || '');
    setBusinessNumber(data.businessNumber || '');
    setProofBusiness(data.proofBusiness || '');
    setProofInsurance(data.proofInsurance || '');
    setWebsite(data.website || '');
  }, [data]);

  // Functions
  const handleCloseClick = () => {
    onClose();
  };

  // Edit Handle
  const handleSave = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setStreetAddressError("");
    setCityError("");
    setProvinceError("");
    setPostalCodeError("");
    setCountryError("");
    setMailingStreetAddressError("");
    setMailingCityError("");
    setMailingProvinceError("");
    setMailingPostalCodeError("");
    setMailingCountryError("");
    setFirstNameError("");
    setLastNameError("");
    setCompanyPhoneNumberError("");
    setBusinessNameError("");
    setBusinessNumberError("");
    setProofBusinessError("");
    setProofInsuranceError("");
    setWebsiteError("");

    // Validation Checks
    const firstNameError = EmptyValidation("First Name", firstName);
    const lastNameError = EmptyValidation("Last Name", lastName);
    const companyPhoneNumberError = PhoneNumberValidation(companyPhoneNumber);
    const streetAddressError = EmptyValidation("Street Address", streetAddress);
    const cityError = EmptyValidation("City", city);
    const provinceError = EmptyValidation("Province", province);
    const postalCodeError = PostalCodeValidation(postalCode);
    const countryError = EmptyValidation("Country", country);
    const mailingStreetAddressError = EmptyValidation(
      "Street Address",
      streetAddress
    );
    const mailingCityError = EmptyValidation("City", city);
    const mailingProvinceError = EmptyValidation("Province", province);
    const mailingPostalCodeError = PostalCodeValidation(postalCode);
    const mailingCountryError = EmptyValidation("Country", country);
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

    // Set Errors
    setFirstNameError(firstNameError);
    setLastNameError(lastNameError);
    setCompanyPhoneNumberError(companyPhoneNumberError);
    setStreetAddressError(streetAddressError);
    setCityError(cityError);
    setProvinceError(provinceError);
    setPostalCodeError(postalCodeError);
    setCountryError(countryError);
    setMailingStreetAddressError(mailingStreetAddressError);
    setMailingCityError(mailingCityError);
    setMailingProvinceError(mailingProvinceError);
    setMailingPostalCodeError(mailingPostalCodeError);
    setMailingCountryError(mailingCountryError);
    setBusinessNameError(businessNameError);
    setBusinessNumberError(businessNumberError);
    setProofBusinessError(proofBusinessError);
    setProofInsuranceError(proofInsuranceError);
    setWebsiteError(websiteError);

    // Checking Errors
    if (
      firstNameError ||
      lastNameError ||
      companyPhoneNumberError ||
      streetAddressError ||
      cityError ||
      provinceError ||
      postalCodeError ||
      countryError ||
      mailingStreetAddressError ||
      mailingCityError ||
      mailingProvinceError ||
      mailingPostalCodeError ||
      mailingCountryError ||
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
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("companyPhoneNumber", companyPhoneNumber);
    formData.append("streetAddress", streetAddress);
    formData.append("apptNumber", apptNumber);
    formData.append("city", city);
    formData.append("province", province);
    formData.append("postalCode", postalCode);
    formData.append("country", country);
    formData.append("mailingStreetAddress", mailingStreetAddress);
    formData.append("mailingApptNumber", mailingApptNumber);
    formData.append("mailingCity", mailingCity);
    formData.append("mailingProvince", mailingProvince);
    formData.append("mailingPostalCode", mailingPostalCode);
    formData.append("mailingCountry", mailingCountry);
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
      const shipperSubmissionDetailsResponse = await axios.put(
        "/api/shippersubmissiondetails",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            withCredentials: true,
          },
        }
      );

      if (shipperSubmissionDetailsResponse.status === 200) {
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

            <CustomInput
              id={"companyPhoneNumber"}
              label={"Phone Number"}
              value={companyPhoneNumber}
              onChange={(e) => {
                setCompanyPhoneNumber(e.target.value);
                setCompanyPhoneNumberError("");
              }}
              isError={!!companyPhoneNumberError}
              errorMessage={companyPhoneNumberError}
              isRequired={true}
              type={"tel"}
              mt={8}
            />

            <CustomInput
              id={"streetAddress"}
              label={"Street Address"}
              value={streetAddress}
              onChange={(e) => {
                setStreetAddress(e.target.value);
                setStreetAddressError("");
              }}
              isError={!!streetAddressError}
              errorMessage={streetAddressError}
              isRequired={true}
              type={"text"}
              mt={8}
            />

            <CustomInput
              id={"apptNumber"}
              label={"Apartment Number"}
              value={apptNumber}
              onChange={(e) => {
                setApptNumber(e.target.value);
              }}
              type={"text"}
              mt={8}
            />

            <Flex>
              <CustomInput
                id={"city"}
                label={"City"}
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setCityError("");
                }}
                isError={!!cityError}
                errorMessage={cityError}
                isRequired={true}
                type={"text"}
                mt={8}
                mr={2}
              />

              <CustomInput
                id={"province"}
                label={"Province"}
                value={province}
                onChange={(e) => {
                  setProvince(e.target.value);
                  setProvinceError("");
                }}
                isError={!!provinceError}
                errorMessage={provinceError}
                isRequired={true}
                type={"text"}
                mt={8}
                ml={2}
              />
            </Flex>

            <Flex>
              <CustomInput
                id={"postalCode"}
                label={"Postal Code"}
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  setPostalCodeError("");
                }}
                isError={!!postalCodeError}
                errorMessage={postalCodeError}
                isRequired={true}
                type={"text"}
                mt={8}
                mr={2}
              />

              <CustomInput
                id={"country"}
                label={"Country"}
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCountryError("");
                }}
                isError={!!countryError}
                errorMessage={countryError}
                isRequired={true}
                type={"text"}
                mt={8}
                ml={2}
              />
            </Flex>
            <CustomInput
              id={"mailingStreetAddress"}
              label={"Street Address"}
              value={mailingStreetAddress}
              onChange={(e) => {
                setMailingStreetAddress(e.target.value);
                setMailingStreetAddressError("");
              }}
              isError={!!mailingStreetAddressError}
              errorMessage={mailingStreetAddressError}
              isRequired={true}
              type={"text"}
              mt={8}
            />

            <CustomInput
              id={"mailingApptNumber"}
              label={"Apartment Number"}
              value={mailingApptNumber}
              onChange={(e) => {
                setMailingApptNumber(e.target.value);
              }}
              type={"text"}
              mt={8}
            />

            <Flex>
              <CustomInput
                id={"mailingCity"}
                label={"City"}
                value={mailingCity}
                onChange={(e) => {
                  setMailingCity(e.target.value);
                  setMailingCityError("");
                }}
                isError={!!mailingCityError}
                errorMessage={mailingCityError}
                isRequired={true}
                type={"text"}
                mt={8}
                mr={2}
              />

              <CustomInput
                id={"mailingProvince"}
                label={"Province"}
                value={mailingProvince}
                onChange={(e) => {
                  setMailingProvince(e.target.value);
                  setMailingProvinceError("");
                }}
                isError={!!mailingProvinceError}
                errorMessage={mailingProvinceError}
                isRequired={true}
                type={"text"}
                mt={8}
                ml={2}
              />
            </Flex>

            <Flex>
              <CustomInput
                id={"mailingPostalCode"}
                label={"Postal Code"}
                value={mailingPostalCode}
                onChange={(e) => {
                  setMailingPostalCode(e.target.value);
                  setMailingPostalCodeError("");
                }}
                isError={!!mailingPostalCodeError}
                errorMessage={mailingPostalCodeError}
                isRequired={true}
                type={"text"}
                mt={8}
                mr={2}
              />

              <CustomInput
                id={"mailingCountry"}
                label={"Country"}
                value={mailingCountry}
                onChange={(e) => {
                  setMailingCountry(e.target.value);
                  setMailingCountryError("");
                }}
                isError={!!mailingCountryError}
                errorMessage={mailingCountryError}
                isRequired={true}
                type={"text"}
                mt={8}
                ml={2}
              />
            </Flex>
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
              mt={"8"}
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
              fileUrl={`${backendUrl}/${data.proofBusiness}`}
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
              fileUrl={`${backendUrl}/${data.proofInsurance}`} 
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
                icon={<IoMdCloseCircle />}
                mt="4"
                w="100px"
                children="Close"
                variant="blueBackwardButton"
                onClick={handleCloseClick}
              />
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
