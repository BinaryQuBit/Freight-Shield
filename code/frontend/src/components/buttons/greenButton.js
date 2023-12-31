import { Button } from "@chakra-ui/react";

export default function GreenButton({ children, w, mt, onClick, type }) {
  return (
    <Button
      color="white"
      _hover={{ bg: "#42A72A" }}
      bg="#42B72A"
      w={w}
      mt={mt}
      onClick={onClick}
      type = {type}
    >
      {children}
    </Button>
  );
}
