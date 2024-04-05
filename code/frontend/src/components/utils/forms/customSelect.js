// React Import
import React from "react";

// Chakra UI Imports
import { FormControl, Select, FormErrorMessage } from "@chakra-ui/react";

// Start of the Build
export default function CustomSelect({
  mt,
  id,
  isRequired,
  isError,
  placeholder,
  value,
  onChange,
  value1,
  children1,
  value2,
  children2,
  errorMessage,
  ml,
}) {
  return (
    <FormControl
      mt={mt}
      id={id}
      isRequired={isRequired}
      isInvalid={isError}
      ml={ml}
    >
      <Select
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        borderColor={isError ? "red" : "gray.200"}
        rounded={"none"}
        autoComplete="on"
      >
        <option value={value1}>{children1}</option>
        <option value={value2}>{children2}</option>
      </Select>
      {isError && <FormErrorMessage ml={4}>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
}
