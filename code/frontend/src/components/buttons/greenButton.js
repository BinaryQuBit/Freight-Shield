import { Button } from "@chakra-ui/react";

function GreenButton({ children, mt, width, onClick }) {
  return (
    <Button
      onClick={onClick}
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
