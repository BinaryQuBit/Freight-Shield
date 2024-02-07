// import React, { useState, useEffect } from 'react';
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Box,
//   Text,
//   VStack,
//   HStack
// } from '@chakra-ui/react';
// import CarrierSideBar from "../../components/sidebar/CarrierSideBar";
// import EaseOut from "../../components/responsiveness/EaseOut";
// import UserHeader from "../../components/header/UserHeader";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function UnitProfile() {
//   const navigate = useNavigate();
//   const [units, setUnits] = useState([]);

//   useEffect(() => {
//     // Replace with the actual API call
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/unitprofile", { withCredentials: true });
//         setUnits(response.data.units);
//       } catch (error) {
//         console.error("Error Fetching Unit Profile: ", error);
//         if (
//           error.response &&
//           (error.response.status === 401 || error.response.status === 403)
//         ) {
//           navigate("/login");
//         }
//       }
//     };
    
//     fetchData();
//   }, [navigate]);

//   return (
//     <>
//       <CarrierSideBar activePage="unitProfile" />
//       <EaseOut>
//         <UserHeader title={"Unit Profiles"} />
//         {/* ... other components ... */}
//         <Box m={"5"} rounded={"false"} p={"5"}>
//           <Accordion allowToggle>
//             {units.map((unit, index) => (
//               <AccordionItem key={index}>
//                 <h2>
//                   <AccordionButton>
//                     <Box flex="1" textAlign="left">
//                       <HStack>
//                         <Text fontSize="lg" fontWeight="bold">
//                           {`Unit Number: ${unit.unitNumber}`}
//                         </Text>
//                         <Text fontSize="lg" as="em">
//                           {`(Status: ${unit.unitStatus})`}
//                         </Text>
//                       </HStack>
//                     </Box>
//                     <AccordionIcon />
//                   </AccordionButton>
//                 </h2>
//                 <AccordionPanel pb={4}>
//                   <VStack align="stretch">
//                     <Text fontSize="md">
//                       <strong>Type:</strong> {unit.unitType}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Make:</strong> {unit.unitMake}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Model:</strong> {unit.unitModel}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Year:</strong> {unit.unitYear}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>VIN:</strong> {unit.unitVIN}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Status:</strong> {unit.unitStatus}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Created At:</strong> {new Date(unit.createdAt).toLocaleString()}
//                     </Text>
//                     <Text fontSize="md">
//                       <strong>Updated At:</strong> {new Date(unit.updatedAt).toLocaleString()}
//                     </Text>
//                   </VStack>
//                 </AccordionPanel>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </Box>
//       </EaseOut>
//     </>
//   );
// }

import CarrierSideBar from "../../components/sidebar/CarrierSideBar";
import React, { useState, useEffect } from "react";
import { useTheme } from "@chakra-ui/react";
import CustomButton from "../../components/buttons/CustomButton";
import { IoMdAddCircle } from "react-icons/io";
import AddUnit from "../../components/editButton/UnitAdd";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/EaseOut";
import UserHeader from "../../components/header/UserHeader";

export default function UnitProfile() {
  const navigate = useNavigate();
  // Using Theme
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;
  const [units, setUnits] = useState([]);

  const [isAddUnitModalOpen, setIsAddUnitModalOpen] = useState(false);
  const openAddUnitModal = () => setIsAddUnitModalOpen(true);
const closeAddUnitModal = () => setIsAddUnitModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/unitprofile", { withCredentials: true });
        setUnits(response.data.units);
      } catch (error) {
        console.error("Error Fetching Unit Profile: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      }
    };
    
    fetchData();
  }, [navigate]);

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