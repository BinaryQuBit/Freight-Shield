import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
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
  Select,
} from "@chakra-ui/react";
import AutoCompletePlaces from "../google/AutoCompletePlaces";
import { useTheme } from "@chakra-ui/react";
import { FiTruck, FiUpload, FiXCircle } from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";
import CustomButton from "../buttons/CustomButton";

const PostedLoadEdit = ({ isOpen, onClose, load, onLoadUpdate }) => {
  // Navigate
  const navigate = useNavigate();
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;

  // Restrict the calender
  const today = new Date().toISOString().split("T")[0];

  // Initial States
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
  const [currentLoad, setCurrentLoad] = useState(load);

  const [pickUpLocationError, setPickUpLocationError] = useState("");
  const [dropOffLocationError, setDropOffLocationError] = useState("");
  const [sizeLoadError, setSizeLoadError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  // The date change
  const handlePickUpDateChange = (event) => {
    setPickUpDate(event.target.value);
  };

  useEffect(() => {
    setPickUpLocation(load?.pickUpLocation);
    setPickUpDate(load?.pickUpDate);
    setPickUpTime(load?.pickUpTime);
    setDropOffDate(load?.dropOffDate);
    setDropOffTime(load?.dropOffTime);
    setDropOffLocation(load?.dropOffLocation);
    setUnitRequested(load?.unitRequested);
    setTypeLoad(load?.typeLoad);
    setSizeLoad(load?.sizeLoad);
    setAdditionalInformation(load?.additionalInformation);
    setAdditionalDocument(load?.additionalDocument);
    setAdditionalDocumentFileName(load?.additionalDocumentFileName);
    setPickUpCity(load?.pickUpCity);
    setDropOffCity(load?.dropOffCity);
    setPickUpLAT(load?.pickUpLAT);
    setPickUpLNG(load?.pickUpLNG);
    setDropOffLAT(load?.dropOffLAT);
    setDropOffLNG(load?.dropOffLNG);
  }, [load]);

  useEffect(() => {
    setCurrentLoad(load);
  }, [load]);

  const handleEdit = async (event) => {
    event.preventDefault();
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
    if (additionalDocument) {
      formData.append("additionalDocument", additionalDocument);
    }

    try {
      const response = await axios.put(`/postload/${load._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onLoadUpdate();
      navigate("/activeloads");
      
      handleCloseClick();
    } catch (error) {
      console.error("Error updating load:", error);
    }
  };

  const handleAdditionalDocumentChange = (event) => {
    const file = event.target.files[0];
    console.log("This is frontend file: ", file);
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

  // To close the modal
  const handleCloseClick = () => {
    onClose();
  };

  const removeDocument = async () => {
    try {
      const filename = currentLoad.additionalDocument.split("/").pop();
      if (!filename) {
        console.error("Filename is undefined");
        return;
      }
      console.log("Removing file: ", filename);
  
      const url = `/postload/${currentLoad._id}/removeAdditionalDocument/${filename}`;
      const response = await axios.delete(url, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        console.log("Document removed successfully");
        setCurrentLoad(prevLoad => ({
          ...prevLoad,
          additionalDocument: null,
          additionalDocumentFileName: "",
        }));
        setAdditionalDocument(null);
        setAdditionalDocumentFileName("");
      } else {
        console.error("Failed to remove the document");
      }
    } catch (error) {
      console.error("Error removing the document:", error);
    }
  };


  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="3xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Edit Load</ModalHeader>
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
                      formSubmitted && pickUpLocationError ? "red" : "lightgrey"
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
                    <FormErrorMessage>{dropOffLocationError}</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex
                direction={{ base: "column", md: "column", lg: "row" }}
                spacing={4}
              >
                <FormControl mr={{ lg: 2 }} mb={{ base: 4, md: 4 }} isRequired>
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
                    value={pickUpDate}
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
                    value={pickUpTime}
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
                    value={dropOffDate}
                    min={pickUpDate}
                    onChange={(event) => setDropOffDate(event.target.value)}
                  />
                </FormControl>
                <FormControl ml={{ lg: 2 }} mb={{ base: 4, md: 4 }} isRequired>
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
                    value={dropOffTime}
                    onChange={(event) => setDropOffTime(event.target.value)}
                  />
                </FormControl>
              </Flex>

              <Divider />
              <FormControl isRequired>
                <FormLabel htmlFor="unitRequested" ml={"15px"}>
                  Select Unit
                </FormLabel>
                <Select
                  id="unitRequested"
                  onChange={(e) => setUnitRequested(e.target.value)}
                  value={unitRequested}
                  placeholder="Select unit"
                >
                  <option value="Dry Van">Dry Van</option>
                  <option value="Flat Bed">Flat Bed</option>
                  <option value="Reefer">Reefer</option>
                  <option value="Low Boy">Low Boy</option>
                  <option value="Step Deck">Step Deck</option>
                  <option value="Tank">Tank</option>
                  <option value="Conestega">Conestega</option>
                  <option value="Double Drop">Double Drop</option>
                  <option value="Car Carriers">Car Carriers</option>
                  <option value="Side kit">Side kit</option>
                  <option value="Dump">Dump</option>
                  <option value="Live Floor">Live Floor</option>
                  <option value="End Dump">End Dump</option>
                  <option value="Side Dump">Side Dump</option>
                  <option value="OverLoad">OverLoad</option>
                  <option value="Rocky Mountain">Rocky Mountain</option>
                  <option value="Twinpike">Twinpike</option>
                  <option value="LHV">LHV</option>
                  <option value="Super V">Super V</option>
                </Select>
              </FormControl>

              <Divider />

              <FormControl isRequired>
                <FormLabel htmlFor="typeLoad" ml={"15px"}>
                  Type of Load
                </FormLabel>
                <RadioGroup onChange={setTypeLoad} value={typeLoad} spacing={4}>
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
                        onClick={() => {
                          removeAdditionalDocument(additionalDocumentFileName);
                          removeDocument(load.additionalDocument);
                        }}
                        cursor="pointer"
                        size="1.25em"
                      />
                    </>
                  ) : load?.additionalDocument ? (
                    <>
                      <a
                        href={`http://localhost:8080/uploads/${load.additionalDocument}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ marginRight: "auto", color: "blue" }}
                      >
                        View Existing Document
                      </a>
                      <FiXCircle
                        color="blue"
                        onClick={() => {
                          removeAdditionalDocument(additionalDocumentFileName);
                          removeDocument(load.additionalDocument);
                        }}
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
                      <FiUpload style={{ marginRight: "8px", color: "blue" }} />
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
                {/* This is Close Button */}
                <CustomButton
                  color={customBlue}
                  icon={<IoMdCloseCircle />}
                  mt="4"
                  w="90px"
                  children="Close"
                  variant="blueBackwardButton"
                  onClick={handleCloseClick}
                />

                {/* This is Update Button */}
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
};

export default PostedLoadEdit;
