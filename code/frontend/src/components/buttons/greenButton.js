import { Button } from "@chakra-ui/react";

function GreenButton({ children, mt, width }) {
  return (
    <Button
      text
      textColor={"white"}
      mt={mt}
      width={width}
      style={{ backgroundColor: "#42B72A", fontWeight: "bold" }}
      fontFamily= "Lora"
      fontWeight= "700"
      fontSize= "18"
    >
        { children }
    </Button>
  );
}

export default GreenButton;
