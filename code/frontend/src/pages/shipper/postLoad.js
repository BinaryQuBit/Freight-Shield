// Post Load Form

// React Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";

// Axios Import
import axios from "axios";

// Chakra UI Imports
import { useTheme } from "@chakra-ui/react";
import {
  Flex,
  FormControl,
  SimpleGrid,
  Radio,
  Stack,
  Textarea,
  Box,
  Card,
  RadioGroup,
  FormLabel,
  Divider,
} from "@chakra-ui/react";

// Custom Imports
import Protector from "../../components/utils/methods/getters/protector";
import EaseOut from "../../components/responsiveness/easeOut";
import AutoCompletePlaces from "../../components/google/autoCompletePlaces";
import Sidebar from "../../components/sidebar/shipperSideBar";
import UserHeader from "../../components/header/userHeader";
import CustomButton from "../../components/buttons/customButton";
import { EmptyValidation } from "../../components/utils/validation/emptyValidation.js";
import { LoadSizeValidation } from "../../components/utils/validation/loadSizeValidation.js";
import CustomInput from "../../components/utils/forms/customInput";
import CustomUpload from "../../components/buttons/customUpload.js";
import DistanceCalculator from "../../components/google/distanceCalculator.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";

// Start of the Build
export default function PostLoad() {
  axios.defaults.withCredentials = true;
  Protector("/api/postload");
  const navigate = useNavigate();
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const today = new Date().toISOString().split("T")[0];
  const { data } = useData();
  const firstName = data && data.user ? data.user.firstName : "";
  const lastName = data && data.user ? data.user.lastName : "";
  const notification = data && data ? data.notification : "";
  const status = data && data.user ? data.user.status : "";

  // Hooks
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [unitRequested, setUnitRequested] = useState("Dry Van");
  const [typeLoad, setTypeLoad] = useState("Full Load");
  const [sizeLoad, setSizeLoad] = useState("47");
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

  // Functions
  const handlePickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
  };

  // Post Handle
  const handlePost = async (event) => {
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
    const pickUpCityError = EmptyValidation("Proper Address", pickUpCity);
    const dropoffCityError = EmptyValidation("Proper Address", dropOffCity);
    const priceError = LoadSizeValidation(price);

    // Set Error
    setPickUpLocationError(pickUpLocationError);
    setPickUpLocationError(pickUpCityError);
    setPickUpDateError(pickUpDateError);
    setPickUpTimeError(pickUpTimeError);
    setDropOffDateError(dropOffDateError);
    setDropOffTimeError(dropOffTimeError);
    setDropOffLocationError(dropOffLocationError);
    setDropOffLocationError(dropoffCityError);
    setSizeLoadError(sizeLoadError);
    setPriceError(priceError);

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
      pickUpCityError ||
      dropoffCityError
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

    // Start of POST Method
    try {
      const response = await axios.post("/api/postload", formData);
      navigate("/activeloads");
    } catch (error) {
      console.error("Error posting load:", error);
    }
  };

  // Reset Handle
  const resetForm = () => {
    setPickUpLocation("");
    setPickUpDate("");
    setPickUpTime("");
    setDropOffDate("");
    setDropOffTime("");
    setDropOffLocation("");
    setUnitRequested("Dry Van");
    setTypeLoad("Full Load");
    setSizeLoad("47");
    setAdditionalInformation("");
    setAdditionalDocument("");
    setPickUpCity("");
    setDropOffCity("");
    setPickUpLAT("");
    setPickUpLNG("");
    setDropOffLAT("");
    setDropOffLNG("");
    setPickUpLocationError("");
    setDropOffLocationError("");
    setSizeLoadError("");
    setPrice("");
  };

  return (
    <>
      <Sidebar activePage="postLoad" Status = { status }/>
      <EaseOut>
      <UserHeader title="Post Load" userInfo={{ firstName, lastName, notification }} Status={status}/>
        <Box w="100%" p={5}>
          <Card p={5} rounded={"no"}>
            <form onSubmit={handlePost} noValidate>
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
                      setPickUpLocation(data.address);
                      setPickUpCity(data.city);
                      setPickUpLAT(data.lat);
                      setPickUpLNG(data.lng);
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
                      setDropOffLocation(data.address);
                      setDropOffCity(data.city);
                      setDropOffLAT(data.lat);
                      setDropOffLNG(data.lng);
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
                <FormControl isRequired>
                  <FormLabel htmlFor="unitRequested" ml={"15px"}>
                    Select Unit
                  </FormLabel>
                  <RadioGroup
                    onChange={setUnitRequested}
                    value={unitRequested}
                    columns={{ base: 1, md: 2, lg: 4 }}
                    spacing={4}
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
                      <Radio color={customBlue} value="Super B">
                        Super B
                      </Radio>
                    </SimpleGrid>
                  </RadioGroup>
                </FormControl>
                <Divider />

                <FormControl isRequired>
                  <FormLabel htmlFor="typeLoad" ml={"15px"}>
                    Type of Load
                  </FormLabel>
                  <RadioGroup
                    onChange={setTypeLoad}
                    value={typeLoad}
                    spacing={4}
                  >
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
                      <Radio color={customBlue} value="Full Load">
                        Full Load
                      </Radio>
                      <Radio color={customBlue} value="LTL">
                        LTL
                      </Radio>
                    </SimpleGrid>
                  </RadioGroup>
                </FormControl>

                {typeLoad === "LTL" ? (
                  <div className="fade-in">
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
                ) : (
                  <>
                    <Divider />
                    <DistanceCalculator
                      origin={{ lat: pickUpLAT, lng: pickUpLNG }}
                      destination={{ lat: dropOffLAT, lng: dropOffLNG }}
                      typeLoad={typeLoad}
                      unitRequested={unitRequested}
                      sizeLoad={sizeLoad}
                    />
                  </>
                )}
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
                />
                <Flex justifyContent="space-between">
                  <CustomButton
                    color={customBlue}
                    icon={<GrPowerReset />}
                    mt="8"
                    w="90px"
                    children="Reset"
                    variant="blueBackwardButton"
                    onClick={resetForm}
                  />

                  <CustomButton
                    color={customBlue}
                    icon={<FiTruck />}
                    mt="8"
                    w="90px"
                    type="submit"
                    children="Post"
                    variant="blueForwardButton"
                  />
                </Flex>
              </Stack>
            </form>
          </Card>
        </Box>
      </EaseOut>
    </>
  );
}
