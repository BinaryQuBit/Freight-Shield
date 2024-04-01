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
import axios from "axios"
import CustomButton from "../../components/buttons/customButton.js";
import { IoMdAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineEdit } from "react-icons/md";
import AddUnit from "../../components/addButton/addUnit.js";
import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js";
import { useData } from "../../components/utils/methods/getters/dataContext.js";
import CustomLink from "../../components/buttons/customLink.js";
import EditUnit from "../../components/editButton/editUnit.js";

export default function UnitProfile() {
  Protector("/api/unitprofiles");
  const { colorMode } = useColorMode();
  const { data } = useData();
  const { units } = data;
  const { firstName, lastName, status, notification } = data.user || {};
  const backendPort = process.env.REACT_APP_BACKEND_PORT;

  const sortedUnits = (units || []).filter(unit => unit && unit.unitNumber !== undefined).sort((a, b) => {
    const unitANumber = a.unitNumber.toString();
    const unitBNumber = b.unitNumber.toString();
    return unitANumber.localeCompare(unitBNumber, undefined, { numeric: true });
  });
  

  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const openAddUnitModal = () => setIsAddUnitModalOpen(true);
  const closeAddUnitModal = () => setIsAddUnitModalOpen(false);
  const [searchField, setSearchField] = useState("unitNumber");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditUnitModalOpen, setIsEditUnitModalOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState(null);

  const filteredUnits = sortedUnits.filter((unit) => {
    const fieldValue = unit[searchField]
      ? unit[searchField].toString().toLowerCase()
      : "";
    return fieldValue.includes(searchQuery.toLowerCase());
  });

  const openEditUnitModal = (unit) => {
    setCurrentUnit(unit);
    setIsEditUnitModalOpen(true);
  };

  const closeEditUnitModal = () => {
    setIsEditUnitModalOpen(false);
    setCurrentUnit(null);
  };

  const deleteUnit = async (unitNumber) => {
    try {
      await axios.delete(`/api/units/${unitNumber}`);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting unit:', error);
    }
  };


  return (
    <>
      <AddUnit isOpen={isAddUnitModalOpen} onClose={closeAddUnitModal} />
      <CarrierSideBar activePage="unitProfile" Status = { status }/>
      <EaseOut>
        <UserHeader title="Unit Profiles" userInfo={{ firstName, lastName, notification }} Status={status} />
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
                              href={`http://${backendPort}${unit.unitRegistration}`}
                              children="View Registration"
                            />
                            <CustomLink
                              href={`http://${backendPort}${unit.unitInsurance}`}
                              children="View Insurance"
                            />
                            <CustomLink
                              href={`http://${backendPort}${unit.unitSafety}`}
                              children="View Safety"
                            />
                          </VStack>
                        </Box>
                      </Flex>
                      {unit.unitStatus !== "In Use" && (
                      <Flex justify={"space-between"}>
                        <CustomButton
                          backgroundColor="#0866FF"
                          w="90px"
                          children="Delete"
                          variant="blueBackwardButton"
                          icon={<RxCrossCircled />}
                          m={"5"}
                          onClick={() => deleteUnit(unit.unitNumber)}
                        />
                        <CustomButton
                          backgroundColor="#0866FF"
                          w="90px"
                          children="Edit"
                          variant="blueForwardButton"
                          icon={<MdOutlineEdit />}
                          m={"5"}
                          onClick={() => openEditUnitModal(unit)}
                        />
                      </Flex>
                       )}
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
      <EditUnit
          isOpen={isEditUnitModalOpen}
          onClose={closeEditUnitModal}
          unit={currentUnit}
          unitNum={currentUnit?.unitNumber} 
        />
    </>
  );
}
