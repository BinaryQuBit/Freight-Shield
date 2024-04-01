// React Import
import React from "react";

// Icon Imports
import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";

// Chakra UI Imports
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Card,
  Box,
  Text,
  Flex,
  useColorMode,
  Link,
  VStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

// Axios Import
import axios from "axios";

// Custom Imports
import Sidebar from "../../components/sidebar/carrierSideBar.js";
import UserHeader from "../../components/header/userHeader.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomButton from "../../components/buttons/customButton.js";

// Start of the Build
export default function DriverProfiles() {

  // Data Context and Extraction
  const { data } = useData();
  const { firstName, lastName, canadianCarrierCode, status, notification } = data.user || {};
  const driverData = data.driverData || [];
  const [searchTerm, setSearchTerm] = React.useState("");

  // Modal Setup
  const {
    isOpen: isDeclineModalOpen,
    onOpen: onDeclineModalOpen,
    onClose: onDeclineModalClose,
  } = useDisclosure();
  const [declineReason, setDeclineReason] = React.useState("");
  const [driverToDecline, setDriverToDecline] = React.useState(null);

  const handleDeclineClick = (driverId) => {
    setDriverToDecline(driverId);
    onDeclineModalOpen();
  };
  const pendingDrivers =
    data.driverData?.filter((driver) => driver.driverStatus === "Pending") ||
    [];

  const approvedDrivers =
    data.driverData?.filter((driver) => driver.driverStatus === "Approved") ||
    [];

  const filterDrivers = (drivers) => {
    return drivers.filter((driver) => {
      const fullName = `${driver.firstName.toLowerCase()} ${driver.lastName.toLowerCase()}`;
      const searchLower = searchTerm.toLowerCase();
      return (
        fullName.includes(searchLower) ||
        driver.phoneNumber.includes(searchTerm) ||
        driver.email.toLowerCase().includes(searchLower)
      );
    });
  };

  const filteredPendingDrivers = filterDrivers(pendingDrivers);
  const filteredApprovedDrivers = filterDrivers(approvedDrivers);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_PORT;
  Protector("/api/driverprofiles", canadianCarrierCode);

  // Hooks
  const { colorMode } = useColorMode();
  // Functions

  const handleDecline = async () => {
    if (!driverToDecline) return;
  
    try {
      const driverStatusResponse = await axios.put(
        `/api/updatedriverstatus/${driverToDecline}`,
        {
          status: "Decline",
          reason: declineReason,
        },
        {
          withCredentials: true,
        }
      );
  
      if (driverStatusResponse.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error submitting form:", error.response?.data.message || error.message);
    } finally {
      onDeclineModalClose();
      setDeclineReason("");
      setDriverToDecline(null);
    }
  };

  const handleAccept = async (driverId, event) => {
    event.preventDefault();
    try {
      const driverStatusResponse = await axios.put(
        `/api/updatedriverstatus/${driverId}`,
        {
          status: "Approved",
        },
        {
          withCredentials: true,
        }
      );

      if (driverStatusResponse.status === 200) {
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

  const noPendingDrivers = pendingDrivers.length === 0;
  const noDrivers = driverData.length === 0;

  return (
    <>
      <Sidebar activePage={"driverProfile"} Status = { status }/>
      <EaseOut>
        <UserHeader
          title="Driver Profiles"
          userInfo={{ notification, firstName, lastName }}
          Status = {status}
        />
        <Flex pt="4" direction="column" m={5}>
          <Input
            placeholder="Search by name, email or phone number"
            value={searchTerm}
            onChange={handleSearchChange}
            my={5}
          />
          {noDrivers ? (
            <Text fontSize="20" textAlign={"center"}>
              Chirp... Chirp... No Drivers Here
            </Text>
          ) : (
            <Flex
              direction={{ base: "column", lg: "row" }}
              justifyContent="space-around"
              gap="4"
              width="full"
            >
              {!noPendingDrivers && (
                <Card overflowX="auto" width="full" flex={1} p="2" mx="1">
                  <Text
                    fontSize={{ base: "17", md: "17", lg: "20" }}
                    mb="2"
                    textAlign={"center"}
                  >
                    <strong>Pending</strong>
                  </Text>
                  <Accordion allowToggle>
                    {filteredPendingDrivers.map((driver) => (
                      <DriverProfileItem
                        key={driver.email}
                        driver={driver}
                        colorMode={colorMode}
                        handleDecline={handleDecline}
                        handleAccept={handleAccept}
                        handleDeclineClick={handleDeclineClick}
                        backendUrl={backendUrl}
                      />
                    ))}
                  </Accordion>
                </Card>
              )}
              {filteredApprovedDrivers.length > 0 && (
                <Card
                  overflowX="auto"
                  width="full"
                  flex={1}
                  p="2"
                  mx="1"
                  mt={{ base: "3", md: "3", lg: "0" }}
                >
                  <Text
                    fontSize={{ base: "17", md: "17", lg: "20" }}
                    textAlign={"center"}
                    mb="2"
                  >
                    <strong>Approved</strong>
                  </Text>
                  <Accordion allowToggle>
                    {filteredApprovedDrivers.map((driver) => (
                      <DriverProfileItem
                        key={driver.email}
                        driver={driver}
                        colorMode={colorMode}
                      />
                    ))}
                  </Accordion>
                </Card>
              )}
            </Flex>
          )}
        </Flex>
      </EaseOut>
      <Modal isOpen={isDeclineModalOpen} onClose={onDeclineModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Decline Reason</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Why are you declining this driver?</FormLabel>
              <Textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Specify a reason" 
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleDecline}>
              Submit
            </Button>
            <Button onClick={onDeclineModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function DriverProfileItem({
  driver,
  colorMode,
  handleAccept,
  backendUrl,
  handleDeclineClick,
}) {
  return (
    <AccordionItem key={driver.email}>
      <h2>
        <AccordionButton
          _expanded={{
            bg: colorMode === "dark" ? "blue.700" : "blue.100",
            color: colorMode === "dark" ? "white" : "black",
          }}
        >
          <Box flex="1" textAlign="left">
            <Text
              fontSize={{ base: "15px", md: "15px", lg: "17px" }}
              textAlign={"center"}
            >
              {driver.firstName.trim()} {driver.lastName}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex
          direction={{ base: "column", md: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Box pr={{ lg: 4 }}>
            <Text fontSize={{ base: "15px", md: "15px", lg: "17px" }} mb="2">
              <strong>Email:</strong> {driver.email}
            </Text>
            <Text fontSize={{ base: "15px", md: "15px", lg: "17px" }} mb="2">
              <strong>Phone Number:</strong> {driver.phoneNumber}
            </Text>
          </Box>
          <VStack align="start" spacing={2}>
            <Link
              href={`${backendUrl}${driver.driverAbstract}`}
              isExternal
              color="blue.500"
            >
              View Driver Abstract
            </Link>
            <Link
              href={`${backendUrl}${driver.driverLicenceFront}`}
              isExternal
              color="blue.500"
            >
              View Driver Licence (Front)
            </Link>
            <Link
              href={`${backendUrl}${driver.driverLicenceBack}`}
              isExternal
              color="blue.500"
            >
              View Driver Licence (Back)
            </Link>
          </VStack>
        </Flex>
        {driver.driverStatus === "Pending" && (
          <Flex justifyContent="space-between" mt="7">
            <CustomButton
              backgroundColor="#D22B2B"
              icon={<IoMdCloseCircle />}
              mt="4"
              w={{ base: "90px", md: "90px", lg: "100px" }}
              children="Decline"
              variant="blueBackwardButton"
              onClick={(e) => {
                handleDeclineClick(driver.driver_id);
              }}
              fontSize={{ base: "13px", md: "13px", lg: "15px" }}
            />
            <CustomButton
              backgroundColor="#42B72A"
              icon={<IoMdAddCircle />}
              mt="4"
              w={{ base: "90px", md: "90px", lg: "100px" }}
              onClick={(e) => handleAccept(driver.driver_id, e)}
              children="Accept"
              variant="blueForwardButton"
              fontSize={{ base: "13px", md: "13px", lg: "15px" }}
            />
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
