import {
    Box,
    Flex,
    Text,
    VStack,
  } from "@chakra-ui/react";
  import logo from "../assets/logo.svg";
import SignupCard from "./signup-card";

  
  const Signin = () => {
    return (
      <Flex alignItems={"center"} justifyContent={"center"} h="100vh">
        <Box>
          <img src={logo} alt="logo" height="300" width="300" />
          <Text fontFamily="Lora" fontWeight={"700"}> Connecting Shippers and Truckers Seamlessly</Text>
        </Box>
        <VStack marginLeft={40}>
        <SignupCard></SignupCard>
        <Text fontFamily="Lora" fontWeight={"700"}> Your Ultimate Loadboard Solution!</Text>
        </VStack>
       
        
      </Flex>
    );
  };
  
  export default Signin;
  