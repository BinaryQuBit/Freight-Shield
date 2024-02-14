import CarrierSideBar from "../../components/sidebar/carrierSideBar.js";
import React, { useState } from "react";
import { useTheme } from "@chakra-ui/react";
import CustomButton from "../../components/buttons/customButton.js";
import { IoMdAddCircle } from "react-icons/io";
import AddUnit from "../../components/editButton/unitAdd.js";
import {
  Card,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import EaseOut from "../../components/responsiveness/easeOut.js";
import UserHeader from "../../components/header/userHeader.js";
import Protector from "../../components/utils/methods/getters/protector.js"

export default function UnitProfile() {
Protector("/unitprofiles");
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const [units, setUnits] = useState([]);

  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const openAddUnitModal = () => setIsAddUnitModalOpen(true);
const closeAddUnitModal = () => setIsAddUnitModalOpen(false);

  return (
    <>
    <AddUnit isOpen={isAddUnitModalOpen} onClose={closeAddUnitModal} />
      <CarrierSideBar activePage="unitProfile" />
      <EaseOut>
        <UserHeader title={"Unit Profiles"} />
        <CustomButton
          color={customBlue}
          w="90px"
          children="Add"
          variant="blueForwardButton"
          icon={<IoMdAddCircle />}
          floatSide={"right"}
          m={"5"}
          onClick={openAddUnitModal}
        />
          <Card
            m={"5"}
            rounded={"false"}
            p={"5"}
          >
           <Accordion allowToggle>
             {units.map((unit, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text fontSize="lg" fontWeight="bold">
                          {`Unit Number: ${unit.unitNumber}`}
                        </Text>
                        <Text fontSize="lg" as="em">
                          {`(Status: ${unit.unitStatus})`}
                        </Text>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch">
                    <Text fontSize="md">
                      <strong>Type:</strong> {unit.unitType}
                    </Text>
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
                      <strong>Licence Plate:</strong> {unit.unitLicencePlate}
                    </Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          </Card>
      </EaseOut>
    </>
  );
}