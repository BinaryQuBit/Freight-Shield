// React Import
import React from "react";

// Chakra UI Import
import { Button, Box, Text } from "@chakra-ui/react";

// Start of the Build
export default function BlueButton({
  mt,
  w,
  children,
  type,
  onClick,
  icon,
  variant,
  backgroundColor,
  floatSide,
  m,
  mb,
  fontSize,
}) {
  return (
    <Box>
      <Button
        rounded={"no"}
        variant={variant}
        mt={mt}
        w={w}
        type={type}
        onClick={onClick}
        colorvariant={backgroundColor}
        float={floatSide}
        m={m}
        mb={mb}
      >
        <Text className="icon-wrapper">{icon}</Text>
        <Text fontSize={fontSize} className="content-wrapper">
          {children}
        </Text>
      </Button>
    </Box>
  );
}
