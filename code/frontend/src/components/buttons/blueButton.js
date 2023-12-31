import { Button } from "@chakra-ui/react";

export default function BlueButton({ mt, w, children }) {
  return (
    <Button
      color="white"
      _hover={{ bg: "#42B72A" }}
      bg="#0866FF"
      type="submit"
      mt={mt}
      w={w}
    >
      {children}
    </Button>
  );
}
