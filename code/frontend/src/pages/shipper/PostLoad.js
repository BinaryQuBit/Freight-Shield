import React, { useState, useEffect } from "react";
import EaseOut from "../../components/responsiveness/EaseOut";
import AutoCompletePlaces from "../../components/google/AutoCompletePlaces";
import { useTheme } from "@chakra-ui/react";
import { FiTruck, FiUpload, FiXCircle } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Protector from "../../components/utils/methods/getters/Protector";
// import Validation from "../../components/utils/Validation.js";
import {
  Flex,
  FormControl,
  Input,
  SimpleGrid,
  Radio,
  Stack,
  Textarea,
  Box,
  Card,
  RadioGroup,
  FormLabel,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import UserHeader from "../../components/header/UserHeader";
import axios from "axios";
import CustomButton from "../../components/buttons/CustomButton";

const PostLoad = () => {
  Protector("/postload")
  // Navigation
  const navigate = useNavigate();
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;

  // Date Now
  const today = new Date().toISOString().split('T')[0];

  const [pickUpLocation, setPickUpLocation] = useState();
  const [pickUpDate, setPickUpDate] = useState();
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffDate, setDropOffDate] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();
  const [unitRequested, setUnitRequested] = useState("Dry Van");
  const [typeLoad, setTypeLoad] = useState("Full Load");
  const [sizeLoad, setSizeLoad] = useState("47");
  const [additionalInformation, setAdditionalInformation] = useState("");
  const [additionalDocument, setAdditionalDocument] = useState(null);
  const [additionalDocumentFileName, setAdditionalDocumentFileName] =
    useState("");
    const [pickUpCity, setPickUpCity] = useState("");
    const [dropOffCity, setDropOffCity] = useState("");
    const [pickUpLAT, setPickUpLAT] = useState("");
    const [pickUpLNG, setPickUpLNG] = useState("");
    const [dropOffLAT, setDropOffLAT] = useState("");
    const [dropOffLNG, setDropOffLNG] = useState("");

  const [pickUpLocationError, setPickUpLocationError] = useState("");
  const [dropOffLocationError, setDropOffLocationError] = useState("");
  const [sizeLoadError, setSizeLoadError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
  };

  const handlePost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('pickUpLocation', pickUpLocation);
    formData.append('pickUpDate', pickUpDate);
    formData.append('pickUpTime', pickUpTime);
    formData.append('dropOffDate', dropOffDate);
    formData.append('dropOffTime', dropOffTime);
    formData.append('dropOffLocation', dropOffLocation);
    formData.append('unitRequested', unitRequested);
    formData.append('typeLoad', typeLoad);
    formData.append('sizeLoad', sizeLoad);
    formData.append('additionalInformation', additionalInformation);
    formData.append('pickUpCity', pickUpCity);
    formData.append('dropOffCity', dropOffCity);
    formData.append('pickUpLAT', pickUpLAT);
    formData.append('pickUpLNG', pickUpLNG);
    formData.append('dropOffLAT', dropOffLAT);
    formData.append('dropOffLNG', dropOffLNG);
    if (additionalDocument) {
      formData.append('additionalDocument', additionalDocument);
    }
  
    try {
      const response = await axios.post('/postload', formData, {
      });
      navigate("/activeloads")
      
    } catch (error) {
      console.error("Error posting load:", error);
    }
  };

  const handleAdditionalDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdditionalDocument(file);

      const fileURL = URL.createObjectURL(file);
      setAdditionalDocumentFileName(fileURL);
    }
  };

  

  const removeAdditionalDocument = (fileUrl) => {
    try {
      URL.revokeObjectURL(fileUrl);
      setAdditionalDocument(null);
      setAdditionalDocumentFileName("");

      console.log("Additional document removed successfully.");
    } catch (error) {
      console.error("Error removing additional document:", error);
    }
};

  

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
    setAdditionalDocument(null);
    setAdditionalDocumentFileName("");
    setPickUpCity("");
    setDropOffCity("");
    setPickUpLAT("");
    setPickUpLNG("");
    setDropOffLAT("");
    setDropOffLNG("");
  
    setPickUpLocationError("");
    setDropOffLocationError("");
    setSizeLoadError("");
  };

  return (
    <>
      <Sidebar activePage="postLoad" />
      <EaseOut>
        <UserHeader title="Post Load" />
        <Box w="100%" p={5}>
          <Card p={5} rounded={"no"}>
            <form onSubmit={handlePost}>
              <Stack spacing={4}>
                <Flex
                  direction={{ base: "column", md: "column", lg: "row" }}
                  spacing={4}
                >
                  <FormControl
                    mb={{ base: 4, md: 4, lg: 0 }}
                    mr={{ lg: 2 }}
                    mt={{ base: 4, md: 4, lg: 4 }}
                    variant="floating"
                    isRequired
                    isInvalid={formSubmitted && pickUpLocation}
                  >
                    <AutoCompletePlaces
                      type="text"
                      name="pickUpLocation"
                      placeholder=" "
                      value={pickUpLocation}
                      onChange={(data) => {
                        setPickUpLocation(data.address);
                        setPickUpCity(data.city);
                        setPickUpLAT(data.lat);
                        setPickUpLNG(data.lng);
                      }}
                      borderColor={
                        formSubmitted && pickUpLocationError
                          ? "red"
                          : "lightgrey"
                      }
                      id="pickup-location"
                    />
                    <FormLabel>Pick Up Location</FormLabel>
                    {pickUpLocationError && (
                      <FormErrorMessage>{pickUpLocationError}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    mt={{ base: 4, md: 4, lg: 4 }}
                    variant="floating"
                    isRequired
                    isInvalid={formSubmitted && pickUpLocation}
                    ml={{ lg: 2 }}
                  >
                    <AutoCompletePlaces
                      type="text"
                      name="dropOffLocation"
                      placeholder=" "
                      value={dropOffLocation}
                      onChange={(data) => {
                        setDropOffLocation(data.address);
                        setDropOffCity(data.city);
                        setDropOffLAT(data.lat);
                        setDropOffLNG(data.lng);
                      }}
                      borderColor={
                        formSubmitted && dropOffLocationError
                          ? "red"
                          : "lightgrey"
                      }
                      id="dropoff-location"
                    />
                    <FormLabel>Drop Off Location</FormLabel>
                    {dropOffLocationError && (
                      <FormErrorMessage>
                        {dropOffLocationError}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </Flex>
                <Flex
                  direction={{ base: "column", md: "column", lg: "row" }}
                  spacing={4}
                >
                  <FormControl
                    mr={{ lg: 2 }}
                    mb={{ base: 4, md: 4 }}
                    isRequired
                  >
                    <FormLabel
                      htmlFor="pick-up-date"
                      fontSize={"13.5px"}
                      ml={"15px"}
                    >
                      Pick Up Date
                    </FormLabel>
                    <Input
                      type="date"
                      placeholder="Pick Up Date"
                      rounded={"no"}
                      min={today}
                      onChange={(event) => {
                        handlePickUpDateChange(event);
                        setPickUpDate(event.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl
                    ml={{ lg: 2 }}
                    mr={{ lg: 2 }}
                    mb={{ base: 4, md: 4 }}
                    isRequired
                  >
                    <FormLabel
                      htmlFor="pick-up-time"
                      fontSize={"13.5px"}
                      ml={"15px"}
                    >
                      Pick Up Time
                    </FormLabel>
                    <Input
                      type="time"
                      placeholder="Pick Up Time"
                      rounded={"no"}
                      onChange={(event) => setPickUpTime(event.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    ml={{ lg: 2 }}
                    mr={{ lg: 2 }}
                    mb={{ base: 4, md: 4 }}
                    isRequired
                  >
                    <FormLabel
                      htmlFor="drop-off-date"
                      fontSize={"13.5px"}
                      ml={"15px"}
                    >
                      Drop Off Date
                    </FormLabel>
                    <Input
                      type="date"
                      placeholder="Drop Off Date"
                      rounded={"no"}
                      min={pickUpDate}
                      onChange={(event) => setDropOffDate(event.target.value)}
                    />
                  </FormControl>
                  <FormControl
                    ml={{ lg: 2 }}
                    mb={{ base: 4, md: 4 }}
                    isRequired
                  >
                    <FormLabel
                      htmlFor="drop-off-time"
                      fontSize={"13.5px"}
                      ml={"15px"}
                    >
                      Drop Off Time
                    </FormLabel>
                    <Input
                      type="time"
                      placeholder="Drop Off Time"
                      rounded={"no"}
                      onChange={(event) => setDropOffTime(event.target.value)}
                    />
                  </FormControl>
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
                      <Radio color={customBlue} value="Super V">
                        Super V
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

                {typeLoad === "LTL" && (
                  <div className={typeLoad === "LTL" ? "fade-in" : "fade-out"}>
                    <FormControl
                      mr={{ lg: 2 }}
                      mt={"4"}
                      variant="floating"
                      isRequired
                      isInvalid={formSubmitted && sizeLoad}
                    >
                      <Input
                        type="number"
                        name="sizeLoad"
                        placeholder=" "
                        value={sizeLoad}
                        onChange={(e) => setSizeLoad(e.target.value)}
                        borderColor={
                          formSubmitted && sizeLoadError ? "red" : "lightgrey"
                        }
                        rounded={"no"}
                      />
                      <FormLabel>Size of Load</FormLabel>
                      {sizeLoadError && (
                        <FormErrorMessage>{sizeLoadError}</FormErrorMessage>
                      )}
                    </FormControl>
                  </div>
                )}

                <Divider />



                <FormControl
                  mb={{ base: 4, md: 4, lg: 4 }}
                  mr={{ lg: 2 }}
                  mt={"4"}
                  variant="floating"
                >
                  <Textarea
                    type="number"
                    name="additionalInformation"
                    placeholder=" "
                    value={additionalInformation}
                    onChange={(e) => setAdditionalInformation(e.target.value)}
                    rounded={"no"}
                  />
                  <FormLabel>Additional Information</FormLabel>
                </FormControl>

                <FormControl mr={"1.5"} id="additionalDocument"> 
                  <FormLabel fontSize={"13.5px"} ml={"15px"}>
                    Additional Documents
                  </FormLabel>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    border="1px solid lightgrey"
                    padding="8px"
                    borderRadius="4px"
                    position="relative"
                    rounded={"no"}
                  >
                    {additionalDocumentFileName ? (
                      <>
                        <a
                          href={additionalDocumentFileName}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginRight: "auto", color: "blue" }}
                        >
                          View Additional Document
                        </a>
                        <FiXCircle
                          color="blue"
                          onClick={() =>
                            removeAdditionalDocument(additionalDocumentFileName)
                          }
                          cursor="pointer"
                          size="1.25em"
                        />
                      </>
                    ) : (
                      <>
                        <label
                          htmlFor="additionalDocumentInput"
                          style={{ marginRight: "auto" }}
                          color={customBlue}
                        >
                          Upload Additional Document
                        </label>
                        <FiUpload
                          style={{ marginRight: "8px", color: "blue" }}
                        />
                        <Input
                          type="file"
                          accept=".pdf, .doc, .docx, .jpg, .png"
                          id="additionalDocumentInput"
                          onChange={handleAdditionalDocumentChange}
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
                </FormControl>

                <Flex justifyContent="space-between">
                  {/* This is Reset Button */}
                  <CustomButton
                    color={customBlue}
                    icon={<GrPowerReset />}
                    mt="4"
                    w="90px"
                    children="Reset"
                    variant="blueBackwardButton"
                    onClick={resetForm}
                  />

                  {/* This is Post Button */}
                  <CustomButton
                    color={customBlue}
                    icon={<FiTruck />}
                    mt="4"
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
};

export default PostLoad;
