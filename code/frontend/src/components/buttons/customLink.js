// React Import
import React from "react";

// Chakra UI Import
import { Button } from "@chakra-ui/react";

// Start of the Build
export default function CustomLink({
  onClick,
  children,
  ml,
  mr,
  fontSize,
  href,
  mt,
}) {
  const handleNavigation = (event) => {
    if (onClick) {
      onClick(event);
    }
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <Button
      variant="link"
      color="#0866FF"
      fontSize={fontSize}
      onClick={handleNavigation}
      ml={ml}
      mr={mr}
      mt={mt}
    >
      {children}
    </Button>
  );
}
