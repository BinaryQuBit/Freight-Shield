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

  // Check for no drivers
  const noDrivers = driverData.length === 0;

  // Component rendering
  return (
    <>
      <Sidebar activePage={"driverProfile"} />
      <EaseOut>
        <UserHeader title={"Driver Profiles"} />
        <Flex pt="10" direction="column" padding="10">
          {noDrivers ? (
            <Text fontSize="20" textAlign={"center"}>
              Chirp Chirp, No Drivers Here
            </Text>
          ) : (
            <Card overflowX="auto" width="full" p="4">
              {pendingDrivers.length > 0 && (
                <>
                  <Text fontSize="20" mb="4" textAlign={"center"}>
                    <strong>Pending</strong>
                  </Text>
                  <Accordion allowToggle>
                    {pendingDrivers.map((driver) => (
                      <DriverProfileItem
                        driver={driver}
                        colorMode={colorMode}
                        handleDecline={handleDecline}
                        handleAccept={handleAccept}
                        backendUrl={backendUrl}
                      />
                    ))}
                  </Accordion>
                </>
              )}
              {approvedDrivers.length > 0 && (
                <>
                  <Text fontSize="20" textAlign={"center"} mb="4" mt="5">
                    <strong>Approved</strong>
                  </Text>
                  <Accordion allowToggle>
                    {approvedDrivers.map((driver) => (
                      <DriverProfileItem
                        driver={driver}
                        colorMode={colorMode}
                      />
                    ))}
                  </Accordion>
                </>
              )}
            </Card>
          )}
        </Flex>
      </EaseOut>
    </>
  );
}

function DriverProfileItem({ driver, colorMode, handleDecline, handleAccept, backendUrl }) {
  return (
    <AccordionItem key={driver.email}>
      <h2>
        <AccordionButton
          _expanded={{
            bg: colorMode === "dark" ? "blue.700" : "blue.100",
            color: colorMode === "dark" ? "white" : "black",
          }}
        >
          <Box flex="1">
            <Text fontSize="lg">
              {driver.firstName.trim()} {driver.lastName}
            </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack>
          <Flex justifyContent="space-between" align={"center"}>
            <Box>
              <Text fontSize="md" mb="2">
                <strong>Email:</strong> {driver.email}
              </Text>
              <Text fontSize="md" mb="2">
                <strong>Phone Number:</strong> {driver.phoneNumber}
              </Text>
            </Box>
            <VStack>
              <Link
                href={`http://${backendUrl}${driver.driverAbstract}`}
                isExternal
                color="blue.500"
              >
                View Driver Abstract
              </Link>
              <Link
                href={`http://${backendUrl}${driver.driverLicenceFront}`}
                isExternal
                color="blue.500"
                mt={2}
              >
                View Driver Licence (Front)
              </Link>

              <Link
                href={`http://${backendUrl}${driver.driverLicenceBack}`}
                isExternal
                color="blue.500"
                mt={2}
              >
                View Driver Licence (Back)
              </Link>
            </VStack>
          </Flex>
        </Stack>
        {driver.driverStatus === "Pending" && (
          <Flex justifyContent={"space-between"} mt={"7"}>
            <CustomButton
              backgroundColor="#D22B2B"
              icon={<IoMdCloseCircle />}
              mt="4"
              w="100px"
              children="Decline"
              variant="blueBackwardButton"
              onClick={(e) => handleDecline(driver.driver_id, e)}
            />
            <CustomButton
              backgroundColor="#42B72A"
              icon={<IoMdAddCircle />}
              mt="4"
              w="100px"
              onClick={(e) => handleAccept(driver.driver_id, e)}
              children="Accept"
              variant="blueForwardButton"
            />
          </Flex>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}
