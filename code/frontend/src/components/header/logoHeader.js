import { Box, Center } from "@chakra-ui/react";
import logo from "../assets/logo.svg";


function LogoHeader () {
  return (
    <Box
        margin= "10"
    >
        <Center>
            <img src={logo} alt="logo" height="200" width="200" display="flex"/>
        </Center>
        <Center fontFamily= "Lora" fontWeight= "700" fontSize= "18">
            Connecting Shippers and Truckers Seamlessly
        </Center>
    </Box>
  );
};

export default LogoHeader;
