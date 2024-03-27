import React, { useState } from "react";
import {
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  VStack,
  Badge,
  useColorMode,
  Select,
  Input,
  Flex,
  Stack,
} from "@chakra-ui/react";
import CustomButton from "../../components/buttons/customButton.js";
import { IoMdAddCircle } from "react-icons/io";
import AddUnit from "../../components/addButton/addUnit.js";
import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomLink from "../../components/buttons/customLink.js";

export default function UnitProfile() {
  Protector("/api/unitprofiles");
  const { colorMode } = useColorMode();
  const { data } = useData();
  const { units } = data;
  const { firstName, lastName } = data.user || {};
  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  const sortedUnits = (units || []).sort((a, b) => {
    return a.unitNumber.localeCompare(b.unitNumber, undefined, {
      numeric: true,
    });
  });

  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const openAddUnitModal = () => setIsAddUnitModalOpen(true);
  const closeAddUnitModal = () => setIsAddUnitModalOpen(false);
  const [searchField, setSearchField] = useState("unitNumber");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUnits = sortedUnits.filter((unit) => {
    const fieldValue = unit[searchField]
      ? unit[searchField].toString().toLowerCase()
      : "";
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <AddUnit isOpen={isAddUnitModalOpen} onClose={closeAddUnitModal} />
      <CarrierSideBar activePage="unitProfile" />
      <EaseOut>
        <UserHeader title="Unit Profiles" userInfo={{ firstName, lastName }} />
        <CustomButton
          backgroundColor="#0866FF"
          w="90px"
          children="Add"
          variant="blueForwardButton"
          icon={<IoMdAddCircle />}
          floatSide={"right"}
          m={"5"}
          onClick={openAddUnitModal}
        />
        <Flex direction="column" alignItems="center">
          <Stack spacing={4} direction="row" mb="4">
            <Select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            >
              <option value="unitNumber">Unit Number</option>
              <option value="unitType">Type</option>
              <option value="unitMake">Make</option>
              <option value="unitModel">Model</option>
              <option value="unitYear">Year</option>
              <option value="unitVIN">VIN</option>
              <option value="unitLicencePlate">Licence Plate</option>
            </Select>
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Stack>
        </Flex>
        {filteredUnits.length > 0 ? (
        <Card m="5" rounded="lg" p="5">
          <Accordion allowToggle>
            {filteredUnits &&
              filteredUnits.map((unit, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton
                      _expanded={{
                        bg: colorMode === "dark" ? "blue.700" : "blue.100",
                        color: colorMode === "dark" ? "white" : "black",
                      }}
                    >
                      <Box flex="1" textAlign="left">
                        <Text fontSize="lg" fontWeight="bold">
                          Unit Number: {unit.unitNumber}
                          <Badge
                            float={"right"}
                            mr={2}
                            p={2}
                            colorScheme={
                              unit.unitStatus === "active" ? "green" : "red"
                            }
                          >
                            {unit.unitStatus}
                          </Badge>
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Flex justify={"space-between"} align={"center"}>
                      <Box>
                        <Text fontSize="md">
                          <strong>Type:</strong> {unit.unitType}
                        </Text>
                        {unit.trailerType && (
                          <Text fontSize="md">
                            <strong>Trailer Type:</strong> {unit.trailerType}
                          </Text>
                        )}
                        <Text fontSize="md">
                          <strong>Make:</strong> {unit.unitMake}
                        </Text>
                        <Text fontSize="md">
                          <strong>Model:</strong> {unit.unitModel}
                        </Text>
                        <Text fontSize="md">
                          <strong>Year:</strong> {unit.unitYear}
                        </Text>
                        <Text fontSize="md">
                          <strong>VIN:</strong> {unit.unitVIN}
                        </Text>
                        <Text fontSize="md">
                          <strong>Licence Plate:</strong>{" "}
                          {unit.unitLicencePlate}
                        </Text>
                      </Box>
                      <Box>
                        <VStack>
                          <CustomLink
                            href={`${backendPort}${unit.unitRegistration}`}
                            children="View Registration"
                          />
                          <CustomLink
                            href={`${backendPort}${unit.unitInsurance}`}
                            children="View Insurance"
                          />
                          <CustomLink
                            href={`${backendPort}${unit.unitSafety}`}
                            children="View Safety"
                          />
                        </VStack>
                      </Box>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
          </Accordion>
        </Card>
        ) : (
          <Text fontSize="20" textAlign="center" m={5}>
            Chirp... Chirp... No Units Available
          </Text>
        )}
      </EaseOut>
    </>
  );
}
