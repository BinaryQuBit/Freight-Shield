// Test to update name
import React from 'react';
import {
  FormControl,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';

const CustomSelect = ({
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
}) => {
  return (
    <FormControl mt={mt} id={id} isRequired={isRequired} isInvalid={isError}>
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
};

export default CustomSelect;
