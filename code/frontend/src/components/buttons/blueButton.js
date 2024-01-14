import { Button } from "@chakra-ui/react";

export default function BlueButton({ mt, w, children, type }) {
  return (
    <Button
      color="white"
      _hover={{ bg: "#42B72A" }}
      bg="#0866FF"
      mt={mt}
      w={w}
      type={type}
    >
      {children}
    </Button>
  );
}
