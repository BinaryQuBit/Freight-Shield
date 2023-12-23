import {
  Box,
  Flex,
  Text,
  VStack,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import LoginCard from "./login-card";

const Login = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} h="100vh">
      <Box>
        <img src={logo} alt="logo" height="300" width="300" />
        <Text> Connecting Shippers and Truckers Seamlessly</Text>
      </Box>
      <VStack marginLeft={40}>
      <LoginCard></LoginCard>
      <Text> Your Ultimate Loadboard Solution!</Text>
      </VStack>
    </Flex>
  );
};

export default Login;
