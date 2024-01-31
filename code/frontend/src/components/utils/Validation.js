import React from 'react';
import { FormErrorMessage } from "@chakra-ui/react";

const Validation = ({ value, regex, errorMessage, children }) => {
  const isValid = value.trim() !== "" && regex.test(value);
  return (
    <>
      {children}
      {!isValid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </>
  );
};

export default Validation;

