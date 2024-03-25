// Edit Button

// React Imports
import React, { useState, useEffect } from "react";
import { useTheme } from "@chakra-ui/react";

// Icon Import
import { FiTruck } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";

// Axios Import
import axios from "axios";

// Chakra UI Import
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Divider,
  RadioGroup,
  SimpleGrid,
  Radio,
  Textarea,
  Select,
} from "@chakra-ui/react";

// Custom Imports
import AutoCompletePlaces from "../google/autoCompletePlaces";
import CustomButton from "../buttons/customButton";
import { EmptyValidation } from "../utils/validation/emptyValidation";
import { LoadSizeValidation } from "../utils/validation/loadSizeValidation";
import { SelectValidation } from "../utils/validation/selectValidation"
import CustomInput from "../utils/forms/customInput";
import CustomUpload from "../buttons/customUpload";
import CustomSelectMultiple from "../buttons/customSelectMultiple"

// Start of the build
export default function PostedLoadEdit({ isOpen, onClose, load }) {
  axios.defaults.withCredentials = true;
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const today = new Date().toISOString().split("T")[0];
  const backendUrl = process.env.REACT_APP_BACKEND_PORT;

  // Constants
  const unitRequestedOptions = [
    { value: "Dry Van", children: "Dry Van" },
    { value: "Flat Bed", children: "Flat Bed" },
    { value: "Reefer", children: "Reefer" },
    { value: "Low Boy", children: "Low Boy" },
    { value: "Step Deck", children: "Step Deck" },
    { value: "Tank", children: "Tank" },
    { value: "Conestega", children: "Conestega" },
    { value: "Double Drop", children: "Double Drop" },
    { value: "Car Carriers", children: "Car Carriers" },
    { value: "Side kit", children: "Side kit" },
    { value: "Dump", children: "Dump" },
    { value: "Live Floor", children: "Live Floor" },
    { value: "End Dump", children: "End Dump" },
    { value: "Side Dump", children: "Side Dump" },
    { value: "OverLoad", children: "OverLoad" },
    { value: "Rocky Mountain", children: "Rocky Mountain" },
    { value: "Twinpike", children: "Twinpike" },
    { value: "LHV", children: "LHV" },
    { value: "Super B", children: "Super B" },
  ];

  // Hooks
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [unitRequested, setUnitRequested] = useState("");
  const [typeLoad, setTypeLoad] = useState("");
  const [sizeLoad, setSizeLoad] = useState("");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [additionalDocument, setAdditionalDocument] = useState("");
  const [pickUpCity, setPickUpCity] = useState("");
  const [dropOffCity, setDropOffCity] = useState("");
  const [pickUpLAT, setPickUpLAT] = useState("");
  const [pickUpLNG, setPickUpLNG] = useState("");
  const [dropOffLAT, setDropOffLAT] = useState("");
  const [dropOffLNG, setDropOffLNG] = useState("");
  const [price, setPrice] = useState("");

  // Error Hooks
  const [pickUpLocationError, setPickUpLocationError] = useState("");
  const [pickUpDateError, setPickUpDateError] = useState("");
  const [pickUpTimeError, setPickUpTimeError] = useState("");
  const [dropOffDateError, setDropOffDateError] = useState("");
  const [dropOffTimeError, setDropOffTimeError] = useState("");
  const [dropOffLocationError, setDropOffLocationError] = useState("");
  const [sizeLoadError, setSizeLoadError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [unitRequestedError, setUnitRequestedError] = useState("");

  // Functions
  const handlePickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
  };

  const handleCloseClick = () => {
    onClose();
  };

  useEffect(() => {
    setPickUpLocation(load.pickUpLocation);
    setPickUpDate(load.pickUpDate);
    setPickUpTime(load.pickUpTime);
    setPickUpCity(load.pickUpCity || '');
    setPickUpLAT(load.pickUpLAT || '');
    setPickUpLNG(load.pickUpLNG || '');
    setDropOffDate(load.dropOffDate);
    setDropOffTime(load.dropOffTime);
    setDropOffLocation(load.dropOffLocation);
    setDropOffCity(load.dropOffCity || '');
    setDropOffLAT(load.dropOffLAT || '');
    setDropOffLNG(load.dropOffLNG || '');
    setUnitRequested(load.unitRequested);
    setTypeLoad(load.typeLoad);
    setSizeLoad(load.sizeLoad);
    setAdditionalInformation(load.additionalInformation);
    setPrice(load.price);
  }, [load]);

  // Edit Handle
  const handleEdit = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setPickUpLocationError("");
    setPickUpDateError("");
    setPickUpTimeError("");
    setDropOffDateError("");
    setDropOffTimeError("");
    setDropOffLocationError("");
    setSizeLoadError("");
    setPriceError("");
    setUnitRequestedError("");

    // Validation Checks
    const pickUpLocationError = EmptyValidation(
      "Pick Up Location",
      pickUpLocation
    );
    const pickUpDateError = EmptyValidation("Pick Up Date", pickUpDate);
    const pickUpTimeError = EmptyValidation("Pick Up Time", pickUpTime);
    const dropOffDateError = EmptyValidation("Drop Off Date", dropOffDate);
    const dropOffTimeError = EmptyValidation("Drop Off Time", dropOffTime);
    const dropOffLocationError = EmptyValidation(
      "Drop Off Location",
      dropOffLocation
    );
    const sizeLoadError = LoadSizeValidation(sizeLoad);
    const priceError = LoadSizeValidation(price);
    const unitRequestedError = SelectValidation(unitRequested);

    // Set Error
    setPickUpLocationError(pickUpLocationError);
    setPickUpDateError(pickUpDateError);
    setPickUpTimeError(pickUpTimeError);
    setDropOffDateError(dropOffDateError);
    setDropOffTimeError(dropOffTimeError);
    setDropOffLocationError(dropOffLocationError);
    setSizeLoadError(sizeLoadError);
    setPriceError(priceError);
    setUnitRequestedError(unitRequestedError);

    // Produce Error
    if (
      pickUpLocationError ||
      pickUpDateError ||
      pickUpTimeError ||
      dropOffDateError ||
      dropOffTimeError ||
      dropOffLocationError ||
      sizeLoadError ||
      priceError ||
      unitRequestedError
    ) {
      return;
    }

    // Form Data
    const formData = new FormData();
    formData.append("pickUpLocation", pickUpLocation);
    formData.append("pickUpDate", pickUpDate);
    formData.append("pickUpTime", pickUpTime);
    formData.append("dropOffDate", dropOffDate);
    formData.append("dropOffTime", dropOffTime);
    formData.append("dropOffLocation", dropOffLocation);
    formData.append("unitRequested", unitRequested);
    formData.append("typeLoad", typeLoad);
    formData.append("sizeLoad", sizeLoad);
    formData.append("additionalInformation", additionalInformation);
    formData.append("pickUpCity", pickUpCity);
    formData.append("dropOffCity", dropOffCity);
    formData.append("pickUpLAT", pickUpLAT);
    formData.append("pickUpLNG", pickUpLNG);
    formData.append("dropOffLAT", dropOffLAT);
    formData.append("dropOffLNG", dropOffLNG);
    formData.append("price", price);
    if (additionalDocument) {
      formData.append("additionalDocument", additionalDocument);
    }

    // Start of the PUT Method
    try {
      console.log("this is file", additionalDocument);
      const response = await axios.put(`/api/postload/${load._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      handleCloseClick();
    } catch (error) {
      console.error("Error updating load:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="4xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Edit Load</ModalHeader>
        <ModalBody>
          <form onSubmit={handleEdit} noValidate>
            <Stack spacing={4}>
              <Flex
                direction={{ base: "column", md: "column", lg: "row" }}
                spacing={4}
              >
                <CustomInput
                  label="Pick Up Location"
                  id="pickup-location"
                  value={pickUpLocation}
                  isRequired={true}
                  onChange={(data) => {
                    setPickUpLocation(data.address || pickUpLocation);
                    setPickUpCity(data.city || pickUpCity);
                    setPickUpLAT(data.lat || pickUpLAT);
                    setPickUpLNG(data.lng || pickUpLNG);
                    setPickUpLocationError("");
                  }}
                  isError={!!pickUpLocationError}
                  errorMessage={pickUpLocationError}
                  mt={{ base: 8, md: 8, lg: 8 }}
                  mr={{ lg: 2 }}
                  mb={{ base: 4, md: 4, lg: 0 }}
                  customComponent={AutoCompletePlaces}
                />

                <CustomInput
                  label="Drop Off Location"
                  id="dropoff-location"
                  value={dropOffLocation}
                  isRequired={true}
                  onChange={(data) => {
                    setDropOffLocation(data.address || dropOffLocation);
                    setDropOffCity(data.city || dropOffCity);
                    setDropOffLAT(data.lat || dropOffLAT);
                    setDropOffLNG(data.lng || dropOffLNG);
                    setDropOffLocationError("");
                  }}
                  isError={!!dropOffLocationError}
                  errorMessage={dropOffLocationError}
                  mt={{ base: 8, md: 8, lg: 8 }}
                  mr={{ lg: 2 }}
                  mb={{ base: 4, md: 4, lg: 0 }}
                  customComponent={AutoCompletePlaces}
                />
              </Flex>
              <Flex
                direction={{ base: "column", md: "column", lg: "row" }}
                spacing={4}
              >
                <CustomInput
                  id={"pick-up-date"}
                  label={"Pick Up Date"}
                  value={pickUpDate}
                  mr={{ lg: 2 }}
                  mb={{ base: 4, md: 4 }}
                  isRequired={true}
                  type={"date"}
                  onChange={(event) => {
                    handlePickUpDateChange(event);
                    setPickUpDate(event.target.value);
                    setPickUpDateError("");
                  }}
                  isError={!!pickUpDateError}
                  errorMessage={pickUpDateError}
                  mt={8}
                  min={today}
                />

                <CustomInput
                  id={"pick-up-time"}
                  label={"Pick Up Time"}
                  value={pickUpTime}
                  mr={{ lg: 2 }}
                  ml={{ lg: 2 }}
                  mb={{ base: 4, md: 4 }}
                  isRequired={true}
                  type={"time"}
                  onChange={(event) => {
                    setPickUpTime(event.target.value);
                    setPickUpTimeError("");
                  }}
                  isError={!!pickUpTimeError}
                  errorMessage={pickUpTimeError}
                  mt={8}
                />

                <CustomInput
                  id={"drop-off-date"}
                  label={"Drop Off Date"}
                  value={dropOffDate}
                  mr={{ lg: 2 }}
                  ml={{ lg: 2 }}
                  mb={{ base: 4, md: 4 }}
                  isRequired={true}
                  type={"date"}
                  onChange={(event) => {
                    setDropOffDate(event.target.value);
                    setDropOffDateError("");
                  }}
                  isError={!!dropOffDateError}
                  errorMessage={dropOffDateError}
                  mt={8}
                  min={today}
                />

                <CustomInput
                  id={"drop-off-time"}
                  label={"Drop Off Time"}
                  ml={{ lg: 2 }}
                  mb={{ base: 4, md: 4 }}
                  value={dropOffTime}
                  isRequired={true}
                  type={"time"}
                  onChange={(event) => {
                    setDropOffTime(event.target.value);
                    setDropOffTimeError("");
                  }}
                  isError={!!dropOffTimeError}
                  errorMessage={dropOffTimeError}
                  mt={8}
                />
              </Flex>

              <Divider />

              <CustomSelectMultiple
                id={"unitRequested"}
                isRequired={true}
                isError={!!unitRequestedError}
                errorMessage={unitRequestedError}
                placeholder={"Select Unit"}
                value={unitRequested}
                onChange={(e) => {
                  setUnitRequested(e.target.value);
                  setUnitRequestedError("");
                }}
                options={unitRequestedOptions}
                ml={2}
                mt={2}
              />

              <Divider />

              <FormControl isRequired>
                <FormLabel htmlFor="typeLoad" ml={"15px"}>
                  Type of Load
                </FormLabel>
                <RadioGroup
                  onChange={(e) => setTypeLoad(e)}
                  value={typeLoad}
                  spacing={4}
                >
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                    <Radio color={customBlue} value="Full Load">
                      {" "}
                      Full Load
                    </Radio>
                    <Radio color={customBlue} value="LTL">
                      LTL
                    </Radio>
                  </SimpleGrid>
                </RadioGroup>
              </FormControl>

              {typeLoad === "LTL" && (
                <div className={typeLoad === "LTL" ? "fade-in" : "fade-out"}>
                  <CustomInput
                    mr={{ lg: 2 }}
                    mt={8}
                    isRequired={true}
                    type={"number"}
                    value={sizeLoad}
                    onChange={(e) => setSizeLoad(e.target.value)}
                    isError={!!sizeLoadError}
                    errorMessage={sizeLoadError}
                    label={"Load Size (ft)"}
                  />
                </div>
              )}

              <Divider />

              <CustomInput
                label="Price"
                id="price"
                value={price}
                isRequired={true}
                type={"number"}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setPriceError("");
                }}
                isError={!!priceError}
                errorMessage={priceError}
                mt={{ base: 4, md: 4, lg: 4 }}
                mb={{ base: 4, md: 4, lg: 0 }}
              />
              <Divider />
              <CustomInput
                mb={{ base: 4, md: 4, lg: 4 }}
                mr={{ lg: 2 }}
                mt={"8"}
                customComponent={Textarea}
                label={"Additional Information"}
                value={additionalInformation}
                onChange={(e) => setAdditionalInformation(e.target.value)}
              />
              <CustomUpload
                id="additionalDocument"
                label="Additional Document"
                mt={8}
                setFileState={setAdditionalDocument}
                fileUrl={load.additionalDocument ? `http://${backendUrl}${load.additionalDocument}` : ""}
              />

              <Flex justifyContent="space-between">
                <CustomButton
                  color={customBlue}
                  icon={<IoMdCloseCircle />}
                  mt="4"
                  w="90px"
                  children="Close"
                  variant="blueBackwardButton"
                  onClick={handleCloseClick}
                />

                <CustomButton
                  color={customBlue}
                  icon={<FiTruck />}
                  mt="4"
                  w="100px"
                  type="submit"
                  children="Update"
                  variant="blueForwardButton"
                />
              </Flex>
            </Stack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
