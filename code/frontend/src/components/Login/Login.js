import {
  Box,
  Card,
  Button,
  Input,
  Stack,
  Flex,
  Link,
  Center,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import GreenButton from "../buttons/greenButton";

const Login = () => {
  return (
    <Flex alignItems={"center"} justifyContent={"center"} h="100vh">
      <Box>
        <img src={logo} alt="logo" height="300" width="300" />
      </Box>
      <Card marginLeft={40} p={10}>
        <Stack spacing={4}>
          <Input type="email" placeholder="Email or Phone Number" />
          <Input type="password" placeholder="Password" />
          <Button textColor={"white"} style={{ backgroundColor: "#0866FF" ,fontWeight: "bold"}}>Log In</Button>
          <Link color="blue.500" style={{ textAlign: "center" }}>
            Forget Password ?
          </Link>
          <Center>
            <GreenButton mt={20} width={200}>
              Create new account  
            </GreenButton>
          </Center>
        </Stack>
      </Card>
    </Flex>
  );
};

export default Login;
