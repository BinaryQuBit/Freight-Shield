// Add Unit Button

// React Imports
import React, { useState } from "react";
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
} from "@chakra-ui/react";

// Custom Imports
import CustomButton from "../buttons/customButton";
import CustomSelectMultiple from "../buttons/customSelectMultiple";
import { SelectValidation } from "../utils/validation/selectValidation";

export default function AssignUnitDriver({ isOpen, onClose, units, driverData, selectedLoadId }) {
  axios.defaults.withCredentials = true;
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  
  // Hooks
  const [unit, setUnit] = useState("");
  const [driver, setDriver] = useState("");

  // Error Hooks
  const [unitError, setUnitError] = useState("");
  const [driverError, setDriverError] = useState("");

  // Functions
  const handleCloseClick = () => {
    setUnit("");
    setDriver("");
    setUnitError("");
    setDriverError("");
    onClose();
  };

    const unitOptions = units.map(unit => ({
    value: unit.unitNumber,
    children: `Unit ${unit.unitNumber}`
  }));

  const driverOptions = driverData.map(driver => ({
    value: driver.driverId,
    children: `${driver.firstName} ${driver.lastName}`
  }));

  // Add Unit Handle
  const handleAddUnit = async (event) => {
    event.preventDefault();
    // Reset Error Hooks
    setUnitError("");
    setDriverError("");

    // Validation Check
    const unitError = SelectValidation(unit);
    const driverError = SelectValidation(driver);

    // Set Errors
    setUnitError(unitError);
    setDriverError(driverError);

    if (unitError || driverError) {
      return;
    }

    // Form Data
    const formData = new FormData();
    formData.append("unitNumber", unit);
    formData.append("driverId", driver);
    formData.append("loadId", selectedLoadId)

    // Start of PUT Method
    try {
      const response = await axios.put(
          "/api/updatedriverstatusload",
          {
              unitNumber: unit,
              driverId: driver,
              loadId: selectedLoadId
          },
          {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          }
      );
      console.log(unit, driver, selectedLoadId);
      if (response.status === 200) {
          window.location.reload();
      }
  } catch (error) {
      if (error.response && error.response.status === 405) {
          console.error("Error: ", error.response.data.message);
      } else {
          console.error("Error submitting form:", error);
      }
  }
  
  };
  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="3xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent padding={2}>
        <ModalHeader textAlign={"center"}>Assign Unit and Driver</ModalHeader>
        <form onSubmit={handleAddUnit} noValidate>
          <ModalBody>
            <Flex>
              <CustomSelectMultiple
                id={"unit"}
                isRequired={true}
                isError={!!unitError}
                errorMessage={unitError}
                placeholder={"Select Unit"}
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  setUnitError("");
                }}
                options={unitOptions}
                ml={2}
                mt={2}
              />
              <CustomSelectMultiple
                id={"driver"}
                isRequired={true}
                isError={!!driverError}
                errorMessage={driverError}
                placeholder={"Select Driver"}
                value={driver}
                onChange={(e) => {
                  setDriver(e.target.value);
                  setDriverError("");
                }}
                options={driverOptions}
                ml={2}
                mt={2}
              />
            </Flex>

            <Flex justifyContent="space-between">
              <CustomButton
                color={customBlue}
                icon={<IoMdCloseCircle />}
                mt="8"
                w="100px"
                children="Close"
                variant="blueBackwardButton"
                onClick={handleCloseClick}
              />
              <CustomButton
                color={customBlue}
                icon={<IoMdAddCircle />}
                mt="8"
                w="100px"
                type="submit"
                children="Assign"
                variant="blueForwardButton"
              />
            </Flex>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}
