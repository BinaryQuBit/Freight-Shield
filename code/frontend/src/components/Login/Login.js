import {
  Box,
  Card,
  Button,
  Input,
  Stack,
  Flex,
  Link,
  Center,
  Text,
  VStack,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import GreenButton from "../buttons/greenButton";

const Login = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} h="100vh">
      <Box>
        <img src={logo} alt="logo" height="300" width="300" />
        <Text fontFamily="Lora" fontWeight={"700"}> Connecting Shippers and Truckers Seamlessly</Text>
      </Box>
      <VStack marginLeft={40}>
      <Card  p={10}>
        <Stack spacing={4}>
          <Input type="email" placeholder="Email or Phone Number" />
          <Input type="password" placeholder="Password" />
          <Button textColor={"white"} style={{ backgroundColor: "#0866FF" ,fontWeight: "bold"}}>Log In</Button>
          <Link color="blue.500" style={{ textAlign: "center" }}>
            Forget Password ?
          </Link>
          <Center>
            <GreenButton>
              Create new account
            </GreenButton>
          </Center>
        </Stack>
       
        
        
      </Card>
      <Text fontFamily="Lora" fontWeight={"700"}> Your Ultimate Loadboard Solution!</Text>
      </VStack>
     
      
    </Flex>
  );
};

export default Login;
