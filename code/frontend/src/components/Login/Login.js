import { Box, Card, Button, Input, Stack, Flex } from "@chakra-ui/react";
import logo from "../assets/logo.svg";

const Login = () => {
  return (
    <Box marginTop={40}>
    <Card
      align="center"
      p={5}
      justify="center"
      borderRadius="md"
      maxW="1000px"
      margin="0 auto"
    >
      <Flex>
        <Box>
          <img src={logo} alt="logo" height="300" width="300" />
        </Box>
        <Box marginLeft={40}>
          <Stack spacing={4}>
            <Input width={80} type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button  width={20} colorScheme="blue">Login</Button>
          </Stack>
        </Box>
      </Flex>
    </Card>
    </Box>
  );
};

export default Login;
