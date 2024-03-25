// Custom Link

import React from "react";
import { Button } from "@chakra-ui/react";

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
