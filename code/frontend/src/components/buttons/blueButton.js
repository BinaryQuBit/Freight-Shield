import { Button } from "@chakra-ui/react";

function BlueButton({ children }) {
  return (
    <Button
      textColor={"white"}
      type="submit"
      style={{ backgroundColor: "#0866FF", fontWeight: "bold" }}
    >
      {children}
    </Button>
  );
}

export default BlueButton;
