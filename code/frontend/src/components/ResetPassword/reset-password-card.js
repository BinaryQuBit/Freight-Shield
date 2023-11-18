import { Card, Input, Stack, Link, Center } from "@chakra-ui/react";
import BlueButton from "../buttons/blueButton";

function ResetCard() {
  return (
    <Card p={10}>
      <Stack spacing={4}>
        <Input type="email" placeholder="Email or Phone Number" />
        <BlueButton>Reset Password</BlueButton>
        <Link color="blue.500" style={{ textAlign: "center" }}>
          Log In
        </Link>
      </Stack>
    </Card>
  );
}

export default ResetCard;