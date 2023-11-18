import {
    Box,
    Flex,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import logo from "../assets/logo.svg";

import ResetCard from "./reset-password-card";
 
  
  const ResetPassword = () => {
    return (
      <Flex alignItems={"center"} justifyContent={"center"} h="100vh">
        <Box>
          <img src={logo} alt="logo" height="300" width="300" />
          <Text fontFamily="Lora" fontWeight={"700"}> Connecting Shippers and Truckers Seamlessly</Text>
        </Box>
        <VStack marginLeft={40}>
        <ResetCard></ResetCard>
        <Text fontFamily="Lora" fontWeight={"700"}> Your Ultimate Loadboard Solution!</Text>
        </VStack>
       
        
      </Flex>
    );
  };
  
  export default ResetPassword;
  