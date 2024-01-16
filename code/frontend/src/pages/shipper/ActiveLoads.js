import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import axios from 'axios';
import {
  Flex,
  Input,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Badge,
  Stack,
  Select,
  Card,
} from "@chakra-ui/react";
import ShipperSideBar from "../../components/sidebar/ShipperSideBar";
import UserHeader from "../../components/header/UserHeader";
import { SidebarContext } from "../../components/responsiveness/Context";

export default function ActiveLoads() {
  const { navSize } = useContext(SidebarContext);
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');
  const [statusSearchTerm, setStatusSearchTerm] = useState('');
  const [filteredLoads, setFilteredLoads] = useState([]);
  const [loads, setLoads] = useState([]); 

  useEffect(() => {
    fetchActiveLoads();
  }, [])

  const fetchActiveLoads = async () => {
    try {
      const response = await axios.get('/activeloads');
      setLoads(response.data);
    } catch (error) {
      console.error('Error fetching active loads:', error);
    }
  };

  useEffect(() => {
    const filtered = loads.filter(load =>
      load?.pickUpLocation?.toLowerCase().includes(fromSearchTerm.toLowerCase()) &&
      load?.dropOffLocation?.toLowerCase().includes(toSearchTerm.toLowerCase()) &&
      (statusSearchTerm === '' || load?.status?.toLowerCase() === statusSearchTerm.toLowerCase())
    );
    setFilteredLoads(filtered);
  }, [fromSearchTerm, toSearchTerm, statusSearchTerm, loads]);
  
  
  

  return (
    <>
      <ShipperSideBar activePage="activeLoads" />
      <Flex
        ml={navSize === "small" ? "50px" : "200px"}
        transition="margin 0.3s ease-in-out"
        justifyContent="center"
        direction={"column"}
      >
        <UserHeader title="Active Loads" />
        <Flex pt={"10"} direction={"column"} alignItems={"center"} padding={"10"}>
          <Stack spacing={4} direction={"row"} mb="4">
            <Input
              placeholder="From..."
              onChange={(e) => setFromSearchTerm(e.target.value)}
            />
            <Input
              placeholder="To..."
              onChange={(e) => setToSearchTerm(e.target.value)}
            />
            <Select
              placeholder="Select Status"
              onChange={(e) => setStatusSearchTerm(e.target.value)}
            >
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
              <option value="Pending">Pending</option>
            </Select>
          </Stack>
          <Card overflowX="auto" width="full" p="4">
            <Accordion allowToggle>
              {filteredLoads.map((load, index) => (
                <AccordionItem key={load.id} my="2">
                  <h2>
                    <AccordionButton _expanded={{ bg: "gray.100", color: "black" }}>
                      <Box flex="1" textAlign="center">
                        <Text fontSize="lg">
                            <strong>From:</strong> {load.pickUpLocation}
                            <Box as="span" ml="4" mr="4"></Box>
                            <strong>To:</strong> {load.dropOffLocation}
                        </Text>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Text fontSize="md" mb="2">
                      <strong>Pickup Location:</strong> {load.pickUpLocation}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Pick Up Date:</strong> {load.pickUpDate}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Pick Up Time:</strong> {load.pickUpTime}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Drop Off Location:</strong> {load.dropOffLocation}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Drop Off Date:</strong> {load.dropOffDate}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Drop Off Time:</strong> {load.dropOffTime}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Unit Requested:</strong> {load.unitRequested}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Addtional Information:</strong> {load.additionalInformation}
                    </Text>
                    <Text fontSize="md" mb="2">
                      <strong>Additional Documents:</strong> {load.additionalDocument}
                    </Text>
                    {/* <Badge colorScheme={getStatusColor(load.status)} p="1">
                      {load.status}
                    </Badge> */}


                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Flex>
      </Flex>
    </>
  );
}

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'in transit':
      return 'blue';
    case 'delivered':
      return 'green';
    case 'pending':
      return 'orange';
    default:
      return 'gray';
  }
}








// const navigate = useNavigate();

// useEffect(() => {
//   axios
//     .get("/activeloads", { withCredentials: true })
//     .then((response) => {
//       console.log("Active Loads Fetched Successfully");
//     })
//     .catch((error) => {
//       console.error("Error Fetching Loads: ", error);
//       if (
//         error.response &&
//         (error.response.status === 401 || error.response.status === 403)
//       ) {
//         navigate("/login");
//       }
//     });
// }, [navigate]);

// import React, { useContext, useEffect, useState } from "react";
// import { SidebarContext } from "../../components/Context.js";
// import { Flex, Text, Table, Thead, Tbody, Tr, Th, Td, Link } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ShipperSideBar from "../../components/sidebar/ShipperSideBar.js";

// export default function ActiveLoads() {
//   const { navSize } = useContext(SidebarContext);
//   const navigate = useNavigate();
//   const [loads, setLoads] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/activeloads", { withCredentials: true })
//       .then((response) => {
//         console.log("Active Loads Fetched Successfully");
//         setLoads(response.data); // Assuming the response data is the array of loads
//       })
//       .catch((error) => {
//         console.error("Error Fetching Loads: ", error);
//         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//           navigate("/login");
//         }
//       });
//   }, [navigate]);

//   return (
//     <>
//       <ShipperSideBar activePage="activeLoads" />
//       <Flex
//         flex={1}
//         justifyContent="center"
//         alignItems="center"
//         marginLeft={navSize === 'small' ? '75px' : '200px'}
//         transition="margin 0.3s ease-in-out"
//         direction="column"
//       >
//         <Text fontSize="xl" marginBottom="20px">Active Loads</Text>
//         <Table variant="simple">
//           <Thead>
//             <Tr>
//               <Th>Driver Name</Th>
//               <Th>Company Name</Th>
//               <Th>Due Date</Th>
//               <Th>Time Remaining</Th>
//               <Th>Track Load</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {loads.map((load) => (
//               <Tr key={load.id}>
//                 <Td>{load.driverName}</Td>
//                 <Td>{load.companyName}</Td>
//                 <Td>{load.dueDate}</Td>
//                 <Td>{/* Logic to calculate time remaining */}</Td>
//                 <Td><Link href={load.trackLink} isExternal>Track</Link></Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       </Flex>
//     </>
//   );
// }
