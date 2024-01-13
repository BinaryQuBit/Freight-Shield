import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { IconButton } from "@chakra-ui/react";
import {
  FiMenu,
  FiSettings,
  FiTruck,
  FiCompass,
  FiBook,
  FiLogOut,
  FiHome,
  FiCheckCircle,
  FiXCircle
} from "react-icons/fi";
import { VStack, Card, Stack, HStack } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Pending() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/pending", { withCredentials: true })
      .then((response) => {
        console.log("Pending Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Pending: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);
  
  // return <Sidebar activePage="pending" />;

  return (
    <Flex>
      <Sidebar activePage="pending" />
      <Flex flex={1} justifyContent="center">
        <VStack mt={10}>

        <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
          Pending Users (basic layout)
        </Text>



            <Card
              width="100%"
              mb={200}
              alignItems={"center"}
              justifyContent={"center"}
              p={10}
            >
                      <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
          Carriers
        </Text>
              <HStack spacing={4} p={4}>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Company 1
                    </Text>

                    <IconButton colorScheme='green' aria-label='Approve' icon={<FiCheckCircle/>} />
                    <IconButton colorScheme='red' aria-label='Deny'icon={<FiXCircle/>}  />
              </HStack>

    
              <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
          Shippers
          </Text>

          <HStack spacing={4} p={4}>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Shipper 1
                    </Text>

                    <IconButton colorScheme='green' aria-label='Approve' icon={<FiCheckCircle/>} />
                    <IconButton colorScheme='red' aria-label='Deny'icon={<FiXCircle/>}  />
              </HStack>

          <Text fontFamily="Lora" fontSize={20} fontWeight={"1000"} mt={2}>
          Drivers
          </Text>

          <HStack spacing={4} p={4}>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Driver 1
                    </Text>

                    

                    <IconButton colorScheme='green' aria-label='Approve' icon={<FiCheckCircle/>} />
                    <IconButton colorScheme='red' aria-label='Deny'icon={<FiXCircle/>}  />
              </HStack>

          

            </Card> 




        </VStack>
       
      </Flex>

    </Flex>
    
   
  );
}
