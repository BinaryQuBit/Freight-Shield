import { Card, Input, Stack, Link, Center } from "@chakra-ui/react";
import BlueButton from "../buttons/blueButton";
import GreenButton from "../buttons/greenButton";


function ResetCard() {
  return (
    <Card p={10}>
      <Stack spacing={4}>
        <Input type="email" placeholder="Email or Phone Number" />
        <Input type="password" placeholder="Password" />
        <BlueButton>Log In</BlueButton>
        <Link color="blue.500" style={{ textAlign: "center" }}>
          Forget Password ?
        </Link>
        <Center>
          <GreenButton>Create new account</GreenButton>
        </Center>
      </Stack>
    </Card>
  );
}

export default ResetCard;
