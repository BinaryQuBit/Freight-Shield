// Test to update name
import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const CustomInput = ({
  id,
  label,
  value,
  onChange,
  isError,
  errorMessage,
  isRequired,
  mt,
  type,
  isPassword,
  showPassword,
  onToggleShowPassword,
  mr,
  ml,
}) => {
  return (
<FormControl
  variant="floating"
  id={id}
  isRequired={isRequired}
  isInvalid={isError}
  mt={mt}
  mr={mr}
  ml={ml}
>
  <InputGroup size="md">
    <Input
      id={id}
      type={isPassword && !showPassword ? "password" : type}
      name={id}
      placeholder=" " 
      value={value}
      onChange={onChange}
      borderColor={isError ? "red" : "gray.200"} 
      rounded={"none"}
      autoComplete="on"
    />
    {isPassword && (
      <InputRightElement width="3rem">
        <IconButton
          h="2rem"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            onToggleShowPassword();
          }}
          icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
          aria-label={showPassword ? "Hide password" : "Show password"}
        />
      </InputRightElement>
    )}
    <FormLabel htmlFor={id} className="form-label">{label}</FormLabel>
  </InputGroup>
  {isError && <FormErrorMessage ml={4}>{errorMessage}</FormErrorMessage>}
</FormControl>

  );
};

export default CustomInput;
