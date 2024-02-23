// Carrier Contact Detail Form

// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { Box, Flex, Text, Card, RadioGroup, Radio } from "@chakra-ui/react";

// Custom Imports
import { PhoneNumberValidation } from "../utils/validation/phoneNumberValidation.js";
import { PostalCodeValidation } from "../utils/validation/postalCodeValidation.js";
import { EmptyValidation } from "../utils/validation/emptyValidation.js";
import CustomInput from "../utils/forms/customInput.js";
import CustomButton from "../buttons/customButton";
import logout from "../methods/logout";

// Start of the Build
export default function CarrierCompanyDetailsForm() {
  const navigate = useNavigate();

  // Hooks
  const [sameAsMailing, setSameAsMailing] = useState("yes");
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

  // Next Handle
  const handleNext = async (event) => {
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

    // Validations Checks
    const firstNameError = EmptyValidation("First Name", firstName);
    const lastNameError = EmptyValidation("Last Name", lastName);
    const companyPhoneNumberError = PhoneNumberValidation(companyPhoneNumber);
    const streetAddressError = EmptyValidation("Street Address", streetAddress);
    const cityError = EmptyValidation("City", city);
    const provinceError = EmptyValidation("Province", province);
    const postalCodeError = PostalCodeValidation(postalCode);
    const countryError = EmptyValidation("Country", country);
    let mailingStreetAddressError = "";
    let mailingCityError = "";
    let mailingProvinceError = "";
    let mailingPostalCodeError = "";
    let mailingCountryError = "";

    if (sameAsMailing === "no") {
      mailingStreetAddressError = EmptyValidation("Street Address", mailingStreetAddress);
      mailingCityError = EmptyValidation("City", mailingCity);
      mailingProvinceError = EmptyValidation("Province", mailingProvince);
      mailingPostalCodeError = PostalCodeValidation(mailingPostalCode);
      mailingCountryError = EmptyValidation("Country", mailingCountry);
    }

    // Set Error
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

    // Produce Error
    if (
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
      firstNameError ||
      lastNameError ||
      companyPhoneNumberError
    ) {
      console.log(
        streetAddressError,
        cityError,
        provinceError,
        postalCodeError,
        countryError,
        mailingStreetAddressError,
        mailingCityError,
        mailingProvinceError,
        mailingPostalCodeError,
        mailingCountryError,
        firstNameError,
        lastNameError,
        companyPhoneNumberError
      );
      return;
    }
    // Start of PUT Method
    try {
      const shipperContactDetailsResponse = await axios.put(
        "/api/carriercontactdetails",
        {
          sameAsMailing,
          streetAddress,
          apptNumber,
          city,
          province,
          postalCode,
          country,
          mailingStreetAddress,
          mailingApptNumber,
          mailingCity,
          mailingProvince,
          mailingPostalCode,
          mailingCountry,
          firstName,
          lastName,
          companyPhoneNumber,
        },
        {
          withCredentials: true,
        }
      );

      if (shipperContactDetailsResponse.status === 200) {
        navigate("/carrierbusinessdetails");
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
          Contact Details
        </Text>
        <form onSubmit={handleNext} noValidate>
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

          <Flex alignItems="center" mt="7">
            <Text as={"b"} mb={"1"} mr={"2"} fontSize={"12"}>
              Mailing Address is the same as above:
            </Text>
            <RadioGroup
              onChange={setSameAsMailing}
              value={sameAsMailing}
              colorScheme="customBlue"
            >
              <Flex>
                <Radio value="yes" mr={2}>
                  Yes
                </Radio>
                <Radio value="no">No</Radio>
              </Flex>
            </RadioGroup>
          </Flex>
          {sameAsMailing === "no" && (
            <>
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
            </>
          )}

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