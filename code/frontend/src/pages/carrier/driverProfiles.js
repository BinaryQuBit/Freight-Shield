// Driver Profiles Page

// React Imports
import React from "react";
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
  Stack,
  VStack,
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

// Start of Build
export default function DriverProfiles() {
  const { data } = useData();
  const { firstName, lastName } = data.user || {};
  Protector("/api/driverprofiles");
  const driverData = data.driverData || [];

  const pendingDrivers = driverData.filter(
    (driver) => driver.driverStatus === "Pending"
  );
  const approvedDrivers = driverData.filter(
    (driver) => driver.driverStatus === "Approved"
  );
  const backendUrl = process.env.REACT_APP_BACKEND_PORT;

  // Hooks
  const { colorMode } = useColorMode();
  // Functions
  const handleDecline = async (driverId, event) => {
    event.preventDefault();
    try {
      const driverStatusResponse = await axios.put(
        `/api/updatedriverstatus/${driverId}`,
        {
          status: "decline",
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
      <Sidebar activePage={"driverProfile"} />
      <EaseOut>
        <UserHeader
          title="Driver Profiles"
          userInfo={{ firstName, lastName }}
        />
        <Flex pt="4" direction="column">
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
                <Card
                  overflowX="auto"
                  width="full"
                  flex={1}
                  p="2"
                  mx="1"
                >
                  <Text
                    fontSize={{ base: "17", md: "17", lg: "20" }}
                    mb="2"
                    textAlign={"center"}
                  >
                    <strong>Pending</strong>
                  </Text>
                  <Accordion allowToggle>
                    {pendingDrivers.map((driver) => (
                      <DriverProfileItem
                        key={driver.email}
                        driver={driver}
                        colorMode={colorMode}
                        handleDecline={handleDecline}
                        handleAccept={handleAccept}
                        backendUrl={backendUrl}
                      />
                    ))}
                  </Accordion>
                </Card>
              )}

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
                  {approvedDrivers.map((driver) => (
                    <DriverProfileItem
                      key={driver.email}
                      driver={driver}
                      colorMode={colorMode}
                    />
                  ))}
                </Accordion>
              </Card>
            </Flex>
          )}
        </Flex>
      </EaseOut>
    </>
  );
}

function DriverProfileItem({
  driver,
  colorMode,
  handleDecline,
  handleAccept,
  backendUrl,
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
              onClick={(e) => handleDecline(driver.driver_id, e)}
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
