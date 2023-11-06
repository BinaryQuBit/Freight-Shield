import { Box, Center, Divider, Text } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import LogoHeader from "../header/logoHeader";
import GreenButton from "../buttons/greenButton";



const Register = () => {
  return (  
<>
  <LogoHeader></LogoHeader>
  <Center>
    <Box display="flex">
      <Box width= "30%" margin="auto" display="flex" flexDirection="column" alignItems="center">
        <Box fontFamily= "Lora" fontSize= "18">
          Register with our platform to secure a reliable shipping service that guarantees timely delivery of your consignment.
        </Box>
        <GreenButton mt = {10}>For Carriers</GreenButton>
      </Box>
      
      <Divider display= "flex" orientation='vertical' height='300px' borderColor="blackAlpha.500" />

      <Box width="30%" margin="auto" display="flex" flexDirection="column" alignItems="center">
        <Box fontFamily= "Lora" fontSize= "18">
          Register with our platform to offer your timely and dependable shipping services to a wide range of clientele.
        </Box>
        <GreenButton mt = {10}>For Shippers</GreenButton>
      </Box>
    </Box>
  </Center>
  <Center mt={5} mb={10}>
    <Text fontFamily= "Lora" fontSize= "18" mr={10}> Have an Account?</Text>
    <GreenButton>Login</GreenButton>
  </Center>
</>
  );
};

export default Register;
