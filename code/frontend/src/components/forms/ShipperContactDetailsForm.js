import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  FormControl,
  Input,
  Text,
  Card,
  RadioGroup,
  Radio,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import BlueButton from "../buttons/BlueButton";
import logout from "../methods/logout";
import { FiTruck } from "react-icons/fi";

// These are REGEX
const phoneNumberRegex = /^[0-9]{10}$/;
const postalCodeRegex = /^[A-Za-z0-9]{5,6}$/;

// A validation Function
const validateField = (regex, value) => {
  return value.trim() !== "" && regex.test(value);
};

// Start of Component
export default function ShipperCompanyDetailsForm() {
  const navigate = useNavigate();

  // These are states/hooks to be saved in the data base aka Initial Data
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

  // These are Error Hooks
  const [streetAddressError, setStreetAddressError] = useState("");
  const [cityError, setCityError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Another state/hook to check if the data is in correct format on submit
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle Next ~ what happens when the Next Button is clicked
  const handleNext = async (event) => {
    event.preventDefault();

    // Setting the error states to null
    setStreetAddressError("");
    setCityError("");
    setProvinceError("");
    setPostalCodeError("");
    setCountryError("");
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setFormSubmitted(true);
    let allValid = true;

    // Checking if the data is Null
    if (streetAddress.trim() === "") {
      setStreetAddressError("Street Address is required");
      allValid = false;
      return;
    }
    if (city.trim() === "") {
      setCityError("City is required");
      allValid = false;
      return;
    }
    if (province.trim() === "") {
      setProvinceError("Province is required");
      allValid = false;
      return;
    }
    if (!validateField(postalCodeRegex, postalCode)) {
      setPostalCodeError("Invalid or empty Postal Code");
      allValid = false;
      return;
    }
    if (country.trim() === "") {
      setCountryError("Country is required");
      allValid = false;
      return;
    }
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required");
      allValid = false;
      return;
    }
    if (lastName.trim() === "") {
      setLastNameError("Last Name is required");
      allValid = false;
      return;
    }
    if (!validateField(phoneNumberRegex, companyPhoneNumber)) {
      setPhoneError("Invalid or empty phone number");
      allValid = false;
      return;
    }

    // If everything is correct how it is suppose to be
    if (allValid) {
      try {
        // Make a PUT request and with the data
        const response = await axios.put(
          "http://localhost:8080/api/users/shippercontactdetails",
          {
            firstName,
            lastName,
            companyPhoneNumber,
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
            sameAsMailing,
          },
          {
            withCredentials: true,
          }
        );

        // If everything is goood route it to the next form
        if (response.status === 200) {
          navigate("/shipperbusinessdetails");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("All fields must be filled");
    }
  };

  useEffect(() => {
    const fetchShipperContactDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/login",
          { withCredentials: true }
        );
        console.log("Shipper Contact Page Fetched Successfully", response.data);

        const shipperDetails = response.data[0];

        setFirstName(shipperDetails.firstName || "");
        setLastName(shipperDetails.lastName || "");
        setCompanyPhoneNumber(shipperDetails.companyPhoneNumber || "");
        setStreetAddress(shipperDetails.streetAddress || "");
        setApptNumber(shipperDetails.apptNumber || "");
        setCity(shipperDetails.city || "");
        setProvince(shipperDetails.province || "");
        setPostalCode(shipperDetails.postalCode || "");
        setCountry(shipperDetails.country || "");
        setMailingStreetAddress(shipperDetails.mailingStreetAddress || "");
        setMailingApptNumber(shipperDetails.mailingApptNumber || "");
        setMailingCity(shipperDetails.mailingCity || "");
        setMailingProvince(shipperDetails.mailingProvince || "");
        setMailingPostalCode(shipperDetails.mailingPostalCode || "");
        setMailingCountry(shipperDetails.mailingCountry || "");
      } catch (error) {
        console.error("Error Fetching Shipper Contact Page: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      }
    };

    fetchShipperContactDetails();
  }, [navigate]);

  return (
    <Box mb={20}>
      <Card
        p="20px"
        m={"20px"}
        maxWidth={{ base: "auto", md: "400px" }}
        mx="auto"
      >
        <Text fontWeight={"bold"} textAlign={"center"} pb={"7"}>
          Contact Details
        </Text>
        <form onSubmit={handleNext}>
          <Flex>
            {/* This is First Name */}
            <FormControl
              variant="floating"
              mr={"1.5"}
              id="firstName"
              isRequired
              isInvalid={formSubmitted && firstNameError}
            >
              <Input
                type="text"
                name="firstName"
                placeholder=" "
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                borderColor={
                  formSubmitted && firstNameError ? "red" : "lightgrey"
                }
              />
              <FormLabel>First Name</FormLabel>
              {firstNameError && (
                <FormErrorMessage>{firstNameError}</FormErrorMessage>
              )}
            </FormControl>

            {/* This is Last Name */}
            <FormControl
              variant="floating"
              ml={"1.5"}
              id="lastName"
              isRequired
              isInvalid={formSubmitted && lastNameError}
            >
              <Input
                type="text"
                name="lastName"
                placeholder=" "
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                borderColor={
                  formSubmitted && lastNameError ? "red" : "lightgrey"
                }
              />
              <FormLabel>Last Name</FormLabel>
              {lastNameError && (
                <FormErrorMessage>{lastNameError}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          {/* This is Phone Number */}
          <FormControl
            variant="floating"
            mt={"7"}
            id="companyPhoneNumber"
            isRequired
            isInvalid={formSubmitted && phoneError}
          >
            <Input
              type="tel"
              name="companyPhoneNumber"
              placeholder=" "
              value={companyPhoneNumber}
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
              borderColor={formSubmitted && phoneError ? "red" : "lightgrey"}
            />
            <FormLabel>Phone Number</FormLabel>
            {phoneError && <FormErrorMessage>{phoneError}</FormErrorMessage>}
          </FormControl>

          {/* This is Street Address */}
          <FormControl
            variant="floating"
            mt={"7"}
            id="streetAddress"
            isRequired
            isInvalid={formSubmitted && streetAddressError}
          >
            <Input
              type="text"
              name="streetAddress"
              placeholder=" "
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              borderColor={
                formSubmitted && streetAddressError ? "red" : "lightgrey"
              }
            />
            <FormLabel>Street Address</FormLabel>
            {streetAddressError && (
              <FormErrorMessage>{streetAddressError}</FormErrorMessage>
            )}
          </FormControl>

          {/* This is Apartment Number */}
          <FormControl variant="floating" mt={"7"} id="apptNumber">
            <Input
              type="text"
              name="apptNumber"
              placeholder=" "
              value={apptNumber}
              onChange={(e) => setApptNumber(e.target.value)}
            />
            <FormLabel>Apartment Number</FormLabel>
          </FormControl>

          <Flex>
            {/* This is City */}
            <FormControl
              variant="floating"
              mt={"7"}
              mr={"1.5"}
              id="city"
              isRequired
              isInvalid={formSubmitted && cityError}
            >
              <Input
                type="text"
                name="city"
                placeholder=" "
                value={city}
                onChange={(e) => setCity(e.target.value)}
                borderColor={formSubmitted && cityError ? "red" : "lightgrey"}
              />
              <FormLabel>City</FormLabel>
              {cityError && <FormErrorMessage>{cityError}</FormErrorMessage>}
            </FormControl>

            {/* This is Province */}
            <FormControl
              variant="floating"
              mt={"7"}
              ml={"1.5"}
              id="province"
              isRequired
              isInvalid={formSubmitted && provinceError}
            >
              <Input
                type="text"
                name="province"
                placeholder=" "
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                borderColor={
                  formSubmitted && provinceError ? "red" : "lightgrey"
                }
              />
              <FormLabel>Province</FormLabel>
              {provinceError && (
                <FormErrorMessage>{provinceError}</FormErrorMessage>
              )}
            </FormControl>
          </Flex>

          <Flex>
            {/* This is Postal Code */}
            <FormControl
              variant="floating"
              mt={"7"}
              mr={"1.5"}
              id="postalCode"
              isRequired
              isInvalid={formSubmitted && postalCodeError}
            >
              <Input
                type="text"
                name="postalCode"
                placeholder=" "
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                borderColor={
                  formSubmitted && postalCodeError ? "red" : "lightgrey"
                }
              />
              <FormLabel>Postal Code</FormLabel>
              {postalCodeError && (
                <FormErrorMessage>{postalCodeError}</FormErrorMessage>
              )}
            </FormControl>

            {/* This is Country */}
            <FormControl
              variant="floating"
              mt={"7"}
              ml={"1.5"}
              id="country"
              isRequired
              isInvalid={formSubmitted && countryError}
            >
              <Input
                type="text"
                name="country"
                placeholder=" "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                borderColor={
                  formSubmitted && countryError ? "red" : "lightgrey"
                }
              />
              <FormLabel>Country</FormLabel>
              {countryError && (
                <FormErrorMessage>{countryError}</FormErrorMessage>
              )}
            </FormControl>

            {/* This is to check if the Mailing Address is the same as the above address */}
          </Flex>
          <Flex alignItems="center" mt="7">
            <Text as={"b"} mb={"1"} mr={"2"} fontSize={"12"}>
              Same as Mailing Address:
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
              {/* This is Mailing Street Address */}
              <FormControl
                variant="floating"
                mt={"7"}
                id="mailingStreetAddress"
                isRequired
                isInvalid={formSubmitted && streetAddressError}
              >
                <Input
                  type="text"
                  name="mailingStreetAddress"
                  placeholder=" "
                  value={mailingStreetAddress}
                  onChange={(e) => setMailingStreetAddress(e.target.value)}
                  borderColor={
                    formSubmitted && streetAddressError ? "red" : "lightgrey"
                  }
                />
                <FormLabel>Street Address</FormLabel>
                {streetAddressError && (
                  <FormErrorMessage>{streetAddressError}</FormErrorMessage>
                )}
              </FormControl>

              {/* This is Mailing Apartment Number */}
              <FormControl variant="floating" mt={"7"} id="mailingApptNumber">
                <Input
                  type="text"
                  name="mailingApptNumber"
                  placeholder=" "
                  value={mailingApptNumber}
                  onChange={(e) => setMailingApptNumber(e.target.value)}
                />
                <FormLabel>Apartment Number</FormLabel>
              </FormControl>

              <Flex>
                {/* This is Mailing City */}
                <FormControl
                  variant="floating"
                  mt={"7"}
                  mr={"1.5"}
                  id="mailingCity"
                  isRequired
                  isInvalid={formSubmitted && cityError}
                >
                  <Input
                    type="text"
                    name="mailingCity"
                    placeholder=" "
                    value={mailingCity}
                    onChange={(e) => setMailingCity(e.target.value)}
                    borderColor={
                      formSubmitted && cityError ? "red" : "lightgrey"
                    }
                  />
                  <FormLabel>City</FormLabel>
                  {cityError && (
                    <FormErrorMessage>{cityError}</FormErrorMessage>
                  )}
                </FormControl>

                {/* This is Mailing Province */}
                <FormControl
                  variant="floating"
                  mt={"7"}
                  ml={"1.5"}
                  id="mailingProvince"
                  isRequired
                  isInvalid={formSubmitted && provinceError}
                >
                  <Input
                    type="text"
                    name="mailingProvince"
                    placeholder=" "
                    value={mailingProvince}
                    onChange={(e) => setMailingProvince(e.target.value)}
                    borderColor={
                      formSubmitted && provinceError ? "red" : "lightgrey"
                    }
                  />
                  <FormLabel>Province</FormLabel>
                  {provinceError && (
                    <FormErrorMessage>{provinceError}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex>
                {/* This is Mailing Postal Code */}
                <FormControl
                  variant="floating"
                  mt={"7"}
                  mr={"1.5"}
                  id="mailingPostalCode"
                  isRequired
                  isInvalid={formSubmitted && postalCodeError}
                >
                  <Input
                    type="text"
                    name="mailingPostalCode"
                    placeholder=" "
                    value={mailingPostalCode}
                    onChange={(e) => setMailingPostalCode(e.target.value)}
                    borderColor={
                      formSubmitted && postalCodeError ? "red" : "lightgrey"
                    }
                  />
                  <FormLabel>Postal Code</FormLabel>
                  {postalCodeError && (
                    <FormErrorMessage>{postalCodeError}</FormErrorMessage>
                  )}
                </FormControl>

                {/* This is Mailing Country */}
                <FormControl
                  variant="floating"
                  mt={"7"}
                  ml={"1.5"}
                  id="mailingCountry"
                  isRequired
                  isInvalid={formSubmitted && countryError}
                >
                  <Input
                    type="text"
                    name="mailingCountry"
                    placeholder=" "
                    value={mailingCountry}
                    onChange={(e) => setMailingCountry(e.target.value)}
                    borderColor={
                      formSubmitted && countryError ? "red" : "lightgrey"
                    }
                  />
                  <FormLabel>Country</FormLabel>
                  {countryError && (
                    <FormErrorMessage>{countryError}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
            </>
          )}

          <Flex justifyContent={"space-between"} mt={"7"}>
            {/* This is Logout Button */}
            <BlueButton
              backgroundColor="#0866FF"
              icon={<FiTruck />}
              mt="4"
              w="100px"
              children="Logout"
              variant="blueBackwardButton"
              onClick={() => logout(navigate)}
            />

            {/* This is Next Button */}
            <BlueButton
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
