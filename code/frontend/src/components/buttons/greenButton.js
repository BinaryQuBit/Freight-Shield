import { Button } from "@chakra-ui/react";

function GreenButton({ children,mt }) {
  return (
    <Button
      textColor={"white"}
      mt={mt}
      width={"200px"}
      style={{ backgroundColor: "#42B72A", fontWeight: "bold" }}
    >
        { children }
    </Button>
  );
}

export default GreenButton;
