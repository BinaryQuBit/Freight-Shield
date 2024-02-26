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

  // Hooks
  const { colorMode } = useColorMode();

  // Functions
  const handleDecline = async (driverId, event) => {
    event.preventDefault();
    try {
      const driverStatusResponse = await axios.put(`/api/updatedriverstatus/${driverId}`, {}, {
        withCredentials: true,
      });

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


  const handleAccept = async (event) => {
    event.preventDefault();
  }

  return (
    <>
      <Sidebar activePage={"driverProfile"} />
      <EaseOut>
        <UserHeader title={"Driver Profiles"} />
        <Flex pt="10" direction="column" padding="10">
          <Card overflowX="auto" width="full" p="4">
            <Accordion allowToggle>
              {driverData.filter(driver => !driver.driverStatus || driver.driverStatus === 'pending').map((driver) => (
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
                      <Flex justifyContent="space-between">
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
                            href={`http://localhost:8080/${driver.driverAbstract}`}
                            isExternal
                            color="blue.500"
                          >
                            View Driver Abstract
                          </Link>
                          <Link
                            href={`http://localhost:8080/${driver.driverLicence}`}
                            isExternal
                            color="blue.500"
                            mt={2}
                          >
                            View Driver Licence
                          </Link>
                        </VStack>
                      </Flex>
                    </Stack>
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
                        onClick={(e) => handleAccept(e)}
                        children="Accept"
                        variant="blueForwardButton"
                      />
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Flex>
      </EaseOut>
    </>
  );
}
