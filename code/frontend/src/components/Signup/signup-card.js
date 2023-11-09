import { Card, Input, Stack, Link, Center } from "@chakra-ui/react";
import BlueButton from "../buttons/blueButton";
import GreenButton from "../buttons/greenButton";


function SignupCard() {
  return (
    <Card p={10}>
      <Stack spacing={4}>
      <Input type="text" placeholder="First Name" />
      <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email or Phone Number" />
        <Input type="password" placeholder="Password" />
        <BlueButton>Sign In</BlueButton>
        <Link color="blue.500" style={{ textAlign: "center" }}>
          Already have an account ?
        </Link>
        <Center>
          <GreenButton>Log in</GreenButton>
        </Center>
      </Stack>
    </Card>
  );
}

export default SignupCard;
