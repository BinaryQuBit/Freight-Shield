// Custom Select 

import React from 'react';
import {
  FormControl,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
const CustomSelectMultiple = ({
    mt,
    id,
    isRequired,
    isError,
    placeholder,
    value,
    onChange,
    options,
    errorMessage,
    ml,
  }) => {
    return (
      <FormControl mt={mt} id={id} isRequired={isRequired} isInvalid={isError} ml={ml}>
        <Select
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          borderColor={isError ? "red" : "gray.200"}
          rounded={"none"}
          autoComplete="on"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.children}
            </option>
          ))}
        </Select>
        {isError && <FormErrorMessage ml={4}>{errorMessage}</FormErrorMessage>}
      </FormControl>
    );
  };
  
  export default CustomSelectMultiple;