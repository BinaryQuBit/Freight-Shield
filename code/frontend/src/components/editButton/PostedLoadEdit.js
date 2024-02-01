import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Divider,
  RadioGroup,
  SimpleGrid,
  Radio,
  Textarea,
  Box,



} from "@chakra-ui/react";
import AutoCompletePlaces from "../google/AutoCompletePlaces"
import { useTheme } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiTruck, FiUpload, FiXCircle } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import BlueButton from "../buttons/BlueButton";

const handleEdit = async (event) => {
    event.preventDefault();
}


const PostedLoadEdit = ({ isOpen, onClose, load }) => {
      // Navigation
  const navigate = useNavigate();
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
    const today = new Date().toISOString().split('T')[0];
    const [pickUpLocation, setPickUpLocation] = useState();
  const [pickUpDate, setPickUpDate] = useState();
  const [pickUpTime, setPickUpTime] = useState();
  const [dropOffDate, setDropOffDate] = useState();
  const [dropOffTime, setDropOffTime] = useState();
  const [dropOffLocation, setDropOffLocation] = useState();
  const [unitRequested, setUnitRequested] = useState("Dry Van");
  const [typeLoad, setTypeLoad] = useState("fullLoad");
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

  const handlePickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
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

const handleAdditionalDocumentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAdditionalDocument(file);

      const fileURL = URL.createObjectURL(file);
      setAdditionalDocumentFileName(fileURL);
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
    setTypeLoad("fullLoad");
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

  const [formSubmitted, setFormSubmitted] = useState(false);
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>Edit Load</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <form onSubmit={handleEdit}>
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
                      <Radio color={customBlue} value="fullLoad">
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
                  <BlueButton
                    color={customBlue}
                    icon={<GrPowerReset />}
                    mt="4"
                    w="90px"
                    children="Reset"
                    variant="blueBackwardButton"
                    onClick={resetForm}
                  />

                  {/* This is Post Button */}
                  <BlueButton
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
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>Close</Button>
                    <Button colorScheme="teal">Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default PostedLoadEdit;



