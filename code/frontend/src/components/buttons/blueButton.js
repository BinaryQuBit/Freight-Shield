import { Button } from "@chakra-ui/react";

export default function BlueButton({ mt, w, children, type, onClick }) {
  return (
    <Button
      color="white"
      _hover={{ bg: "#42B72A" }}
      bg="#0866FF"
      mt={mt}
      w={w}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
