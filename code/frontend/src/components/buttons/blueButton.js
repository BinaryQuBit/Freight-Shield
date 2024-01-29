import React from 'react';
import { Button } from '@chakra-ui/react';

export default function BlueButton({ mt, w, children, type, onClick, icon, variant, backgroundColor }) {
  return (
    <Button
      variant={variant}
      mt={mt}
      w={w}
      type={type}
      onClick={onClick}
      colorVariant={backgroundColor}
    >
      <div className="icon-wrapper">{icon}</div>
      <div className="content-wrapper">{children}</div>
    </Button>
  );
}




