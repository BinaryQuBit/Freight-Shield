// React Import
import React from "react";

// Chakra UI Imports
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

// Icon Imports
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Start of the Build
export default function CustomInput({
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
  min,
  customComponent: CustomComponent,
  ...customComponentProps
}) {
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
        {CustomComponent ? (
          <CustomComponent
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder=""
            rounded="none"
            {...customComponentProps}
          />
        ) : (
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
            min={min}
          />
        )}
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
        <FormLabel htmlFor={id} className="form-label">
          {label}
        </FormLabel>
      </InputGroup>
      {isError && <FormErrorMessage ml={4}>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
}
