import React, { useEffect } from "react";
import {EaseOut} from "../../components/responsiveness/EaseOut.js"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShipperSideBar from "../../components/sidebar/ShipperSideBar.js"
import { Text } from "@chakra-ui/react";

export default function ActiveLoads() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/activeloads", { withCredentials: true })
      .then((response) => {
        console.log("Active Loads Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Loads: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <>
      <ShipperSideBar activePage="activeLoads" />
      <EaseOut title="Active Loads"></EaseOut>
    </>
  );
}

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
