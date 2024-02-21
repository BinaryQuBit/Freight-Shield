// Test to update name 
import React from 'react';
import { Button, Box } from '@chakra-ui/react';

export default function BlueButton({ mt, w, children, type, onClick, icon, variant, backgroundColor, floatSide, m }) {
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
    >
      <div className="icon-wrapper">{icon}</div>
      <div className="content-wrapper">{children}</div>
    </Button>
    </Box>
    
  );
}



