

// React Imports
import React, { useState, useEffect } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { useTheme } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  RadioGroup,
  Radio,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import { EmptyValidation } from "../utils/validation/emptyValidation";
import { YearValidation } from "../utils/validation/yearCalidation";
import { VinValidation } from "../utils/validation/vinValidation";
import CustomInput from "../utils/forms/customInput";
import CustomSelect from "../utils/forms/customSelect";
import CustomUpload from "../buttons/customUpload";
import { DocumentValidation } from "../utils/validation/documentValidation";

export default function EditUnit({ isOpen, onClose, unit, unitNum }) {
  axios.defaults.withCredentials = true;
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const backendUrl = process.env.REACT_APP_BACKEND_PORT;

  // Hooks
  const [unitNumber, setUnitNumber] = useState("");
  const [unitType, setUnitType] = useState("");
  const [trailerType, setTrailerType] = useState("");
  const [unitMake, setUnitMake] = useState("");
  const [unitModel, setUnitModel] = useState("");
  const [unitYear, setUnitYear] = useState("");
  const [unitVIN, setUnitVIN] = useState("");
  const [unitLicencePlate, setUnitLicencePlate] = useState("");
  const [unitStatus, setUnitStatus] = useState("");
  const [unitRegistration, setUnitRegistration] = useState("");
  const [unitInsurance, setUnitInsurance] = useState("");
  const [unitSafety, setUnitSafety] = useState("");

  useEffect(() => {
    if (unit) {
      setUnitNumber(unit.unitNumber || "");
      setUnitType(unit.unitType || "");
      setTrailerType(unit.trailerType || "");
      setUnitMake(unit.unitMake || "");
      setUnitModel(unit.unitModel || "");
      setUnitYear(unit.unitYear || "");
      setUnitVIN(unit.unitVIN || "");
      setUnitLicencePlate(unit.unitLicencePlate || "");
      setUnitStatus(unit.unitStatus || "");
      setUnitRegistration(unit.unitRegistration || "");
      setUnitInsurance(unit.unitInsurance || "");
      setUnitSafety(unit.unitSafety || "");
    }
  }, [unit]);

  // Error Hooks
  const [unitNumberError, setUnitNumberError] = useState("");
  const [unitTypeError, setUnitTypeError] = useState("");
  const [trailerTypeError, setTrailerTypeError] = useState("");
  const [unitMakeError, setUnitMakeError] = useState("");
  const [unitModelError, setUnitModelError] = useState("");
  const [unitYearError, setUnitYearError] = useState("");
  const [unitVINError, setUnitVINError] = useState("");
  const [unitLicencePlateError, setUnitLicencePlateError] = useState("");
  const [unitStatusError, setUnitStatusError] = useState("");
  const [unitRegistrationError, setUnitRegistrationError] = useState("");
  const [unitInsuranceError, setUnitInsuranceError] = useState("");
  const [unitSafetyError, setUnitSafetyError] = useState("");

  // Functions
  const handleCloseClick = () => {
    setUnitNumber("");
    setUnitType("");
    setTrailerType("Dry Van");
    setUnitMake("");
    setUnitModel("");
    setUnitYear("");
    setUnitVIN("");
    setUnitLicencePlate("");
    setUnitStatus("");
    setUnitRegistration("");
    setUnitInsurance("");
    setUnitSafety("");
    setUnitNumberError("");
    setUnitTypeError("");
    setTrailerTypeError("");
    setUnitMakeError("");
    setUnitModelError("");
    setUnitYearError();
    setUnitVINError("");
    setUnitLicencePlateError("");
    setUnitStatusError("");
    setUnitRegistrationError("");
    setUnitInsuranceError("");
    setUnitSafetyError("");
    onClose();
  };

  // Add Unit Handle
  const handleUpdateUnit = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setUnitNumberError("");
    setUnitTypeError("");
    setTrailerTypeError("");
    setUnitMakeError("");
    setUnitModelError("");
    setUnitYearError("");
    setUnitVINError("");
    setUnitLicencePlateError("");
    setUnitStatusError("");
    setUnitRegistrationError("");
    setUnitInsuranceError("");
    setUnitSafetyError("");

    // Validation Checks
    const unitNumberError = EmptyValidation("Unit Number", unitNumber);
    const unitTypeError = EmptyValidation("Unit Type", unitType);
    const unitMakeError = EmptyValidation("Make", unitMake);
    const unitModelError = EmptyValidation("Model", unitModel);
    const unitYearError = YearValidation(unitYear);
    const unitVINError = VinValidation(unitVIN);
    const unitLicencePlateError = EmptyValidation(
      "Licence Plate",
      unitLicencePlate
    );
    const unitStatusError = EmptyValidation("Status", unitStatus);
    const unitRegistrationError = DocumentValidation(
      "Registration",
      unitRegistration
    );
    const unitInsuranceError = DocumentValidation("Insurance", unitInsurance);
    const unitSafetyError = DocumentValidation("Safety", unitSafety);
    let trailerTypeError = "";
    if (unitType === "Trailer") {
      trailerTypeError = EmptyValidation("Trailer Type", trailerType);
    }

    // Set Errors
    setUnitNumberError(unitNumberError);
    setUnitTypeError(unitTypeError);
    setTrailerTypeError(trailerTypeError);
    setUnitMakeError(unitMakeError);
    setUnitModelError(unitModelError);
    setUnitYearError(unitYearError);
    setUnitVINError(unitVINError);
    setUnitLicencePlateError(unitLicencePlateError);
    setUnitStatusError(unitStatusError);
    setUnitRegistrationError(unitRegistrationError);
    setUnitInsuranceError(unitInsuranceError);
    setUnitSafetyError(unitSafetyError);

    // Checking Errors
    if (
      unitNumberError ||
      unitTypeError ||
      trailerTypeError ||
      unitMakeError ||
      unitModelError ||
      unitYearError ||
      unitVINError ||
      unitLicencePlateError ||
      unitStatusError ||
      unitRegistrationError | unitInsuranceError ||
      unitSafetyError
    ) {
      return;
    }

    // Form Data
    const formData = new FormData();
    formData.append("unitNumber", unitNumber);
    formData.append("unitType", unitType);
    if (unitType === "Trailer") {
      formData.append("trailerType", trailerType);
    }
    formData.append("unitMake", unitMake);
    formData.append("unitModel", unitModel);
    formData.append("unitYear", unitYear);
    formData.append("unitVIN", unitVIN);
    formData.append("unitLicencePlate", unitLicencePlate);
    formData.append("unitStatus", unitStatus);
      formData.append("unitRegistration", unitRegistration);
      formData.append("unitInsurance", unitInsurance);
      formData.append("unitSafety", unitSafety);

    // Start of PUT Method
    try {
      const addUnitResponse = await axios.put(`/api/updateunit/${unitNum}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          withCredentials: true,
        },
      });
      if (addUnitResponse.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      if (error.response && error.response.status === 405) {
        console.error("Error: ", error.response.data.message);
        if (
          error.response.data.message.includes(
            "Unit number must be unique within the carrier."
          )
        ) {
          setUnitNumberError("Unit Number Already Exists");
        }
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="3xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader textAlign={"center"}>Edit Unit</ModalHeader>
        <form onSubmit={handleUpdateUnit} noValidate>
          <ModalBody>
            <Flex>
              <CustomInput
                id={"unitNumber"}
                label={"Unit Number"}
                value={unitNumber}
                onChange={(e) => {
                  setUnitNumber(e.target.value);
                  setUnitNumberError("");
                }}
                isError={!!unitNumberError}
                errorMessage={unitNumberError}
                isRequired={true}
                type={"text"}
                mr={2}
                mt={2}
              />
              <CustomSelect
                id={"unitType"}
                isRequired={true}
                isError={!!unitTypeError}
                errorMessage={unitTypeError}
                placeholder={"Select Type"}
                value={unitType}
                onChange={(e) => {
                  setUnitType(e.target.value);
                  setUnitTypeError("");
                }}
                value1={"Truck"}
                children1={"Truck"}
                value2={"Trailer"}
                children2={"Trailer"}
                ml={2}
                mt={2}
              />
            </Flex>
            {unitType === "Trailer" && (
              <div className={unitType === "Trailer" ? "fade-in" : "fade-out"}>
                <RadioGroup
                  onChange={setTrailerType}
                  value={trailerType}
                  columns={{ base: 1, md: 2, lg: 4 }}
                  spacing={4}
                  mt={8}
                >
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                    <Radio color={customBlue} value="Dry Van">
                      Dry Van
                    </Radio>
                    <Radio color={customBlue} value="Flat Bed">
                      Flat Bed
                    </Radio>
                    <Radio color={customBlue} value="Reefer">
                      Reefer
                    </Radio>
                    <Radio color={customBlue} value="Low Boy">
                      Low Boy
                    </Radio>
                    <Radio color={customBlue} value="Step Deck">
                      Step Deck
                    </Radio>
                    <Radio color={customBlue} value="Tank">
                      Tank
                    </Radio>
                    <Radio color={customBlue} value="Conestega">
                      Conestega
                    </Radio>
                    <Radio color={customBlue} value="Double Drop">
                      Double Drop
                    </Radio>
                    <Radio color={customBlue} value="Car Carriers">
                      Car Carriers
                    </Radio>
                    <Radio color={customBlue} value="Side kit">
                      Side kit
                    </Radio>
                    <Radio color={customBlue} value="Dump">
                      Dump
                    </Radio>
                    <Radio color={customBlue} value="Live Floor">
                      Live Floor
                    </Radio>
                    <Radio color={customBlue} value="End Dump">
                      End Dump
                    </Radio>
                    <Radio color={customBlue} value="Side Dump">
                      Side Dump
                    </Radio>
                    <Radio color={customBlue} value="OverLoad">
                      OverLoad
                    </Radio>
                    <Radio color={customBlue} value="Rocky Mountain">
                      Rocky Mountain
                    </Radio>
                    <Radio color={customBlue} value="Twinpike">
                      Twinpike
                    </Radio>
                    <Radio color={customBlue} value="LHV">
                      LHV
                    </Radio>
                    <Radio color={customBlue} value="Super V">
                      Super V
                    </Radio>
                  </SimpleGrid>
                </RadioGroup>
              </div>
            )}
            <Flex>
              <CustomInput
                id={"unitMake"}
                label={"Unit Make"}
                value={unitMake}
                onChange={(e) => {
                  setUnitMake(e.target.value);
                  setUnitMakeError("");
                }}
                isError={!!unitMakeError}
                errorMessage={unitMakeError}
                isRequired={true}
                type={"text"}
                mr={2}
                mt={8}
              />
              <CustomInput
                id={"unitModel"}
                label={"Unit Model"}
                value={unitModel}
                onChange={(e) => {
                  setUnitModel(e.target.value);
                  setUnitModelError("");
                }}
                isError={!!unitModelError}
                errorMessage={unitModelError}
                isRequired={true}
                type={"text"}
                ml={2}
                mt={8}
              />
            </Flex>
            <Flex>
              <CustomInput
                id={"unitYear"}
                label={"Unit Year"}
                value={unitYear}
                onChange={(e) => {
                  setUnitYear(e.target.value);
                  setUnitYearError("");
                }}
                isError={!!unitYearError}
                errorMessage={unitYearError}
                isRequired={true}
                type={"text"}
                mr={2}
                mt={8}
              />
              <CustomInput
                id={"unitVIN"}
                label={"Unit VIN"}
                value={unitVIN}
                onChange={(e) => {
                  setUnitVIN(e.target.value);
                  setUnitVINError("");
                }}
                isError={!!unitVINError}
                errorMessage={unitVINError}
                isRequired={true}
                type={"text"}
                ml={2}
                mt={8}
              />
            </Flex>
            <Flex>
              <CustomInput
                id={"unitLicencePlate"}
                label={"Licence Plate"}
                value={unitLicencePlate}
                onChange={(e) => {
                  setUnitLicencePlate(e.target.value);
                  setUnitLicencePlateError("");
                }}
                isError={!!unitLicencePlateError}
                errorMessage={unitLicencePlateError}
                isRequired={true}
                type={"text"}
                mr={2}
                mt={8}
              />
              <CustomSelect
                id={"unitStatus"}
                isRequired={true}
                isError={!!unitStatusError}
                errorMessage={unitStatusError}
                placeholder={"Select Status"}
                value={unitStatus}
                onChange={(e) => {
                  setUnitStatus(e.target.value);
                  setUnitStatusError("");
                }}
                value1={"active"}
                children1={"Active"}
                value2={"maintenance"}
                children2={"Maintenance"}
                ml={2}
                mt={8}
              />
            </Flex>
            <Flex>
              {unit && unit.unitRegistration && (
                <CustomUpload
                  id="unitRegistration"
                  label="Unit Registration"
                  required={true}
                  isError={!!unitRegistrationError}
                  errorMessage={unitRegistrationError}
                  mt={8}
                  mr={2}
                  setError={setUnitRegistrationError}
                  setFileState={setUnitRegistration}
                  fileUrl={`http://${backendUrl}${unit.unitRegistration}`}
                />
              )}
              {unit && unit.unitInsurance && (
                <CustomUpload
                  id="unitInsurance"
                  label="Unit Insurance"
                  required={true}
                  isError={!!unitInsuranceError}
                  errorMessage={unitInsuranceError}
                  mt={8}
                  ml={2}
                  setError={setUnitInsuranceError}
                  setFileState={setUnitInsurance}
                  fileUrl={`http://${backendUrl}${unit.unitInsurance}`}
                />
              )}
            </Flex>
            {unit && unit.unitSafety && (
              <CustomUpload
                id="unitSafety"
                label="Unit Safety"
                required={true}
                isError={!!unitSafetyError}
                errorMessage={unitSafetyError}
                mt={8}
                setError={setUnitSafetyError}
                setFileState={setUnitSafety}
                fileUrl={`http://${backendUrl}${unit.unitSafety}`}
              />
            )}
            <Flex justifyContent="space-between">
              <CustomButton
                color={customBlue}
                icon={<IoMdCloseCircle />}
                mt="8"
                w="90px"
                children="Close"
                variant="blueBackwardButton"
                onClick={handleCloseClick}
              />
              <CustomButton
                color={customBlue}
                icon={<IoMdAddCircle />}
                mt="8"
                w="90px"
                type="submit"
                children="Save"
                variant="blueForwardButton"
              />
            </Flex>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}
