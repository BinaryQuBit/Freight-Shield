import { Button } from "@chakra-ui/react";

function GreenButton({ children }) {
  return (
    <Button
      text
      textColor={"white"}
      mt={20}
      width={"200px"}
      style={{ backgroundColor: "#42B72A", fontWeight: "bold" }}
    >
        { children }
    </Button>
  );
}

export default GreenButton;
