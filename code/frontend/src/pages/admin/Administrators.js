import Sidebar from "../../components/sidebar/AdminSideBar";
import React, { useEffect } from "react";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Flex, Text, VStack, Card, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Administrators() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/administrators", { withCredentials: true })
      .then((response) => {
        console.log("Administrators Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Administrators: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  //return <Sidebar activePage="administrators" />;

  return (
    <Flex>
      <Sidebar activePage="administrators" />
      <Flex flex={1} justifyContent="center">
        <VStack mt={10}>

        <Text fontFamily="Lora" fontSize={25} fontWeight={"1000"} mt={2}>
          Sorry, I first put this on the wrong page. ~ Alok
            </Text>

            <Card
              width="100%"
              mb={200}
              alignItems={"center"}
              justifyContent={"center"}
              p={10}
            >
              <Stack spacing={4}>
                    <Text fontFamily="Lora" fontWeight={"500"}>
                      Pick Up Location
                    </Text>

                    <Button colorScheme='green'>Approve</Button>
                    <Button colorScheme='red'>Deny</Button>


              </Stack>

            </Card> 


        </VStack>
       
      </Flex>
      
    </Flex>

    

  );
}
