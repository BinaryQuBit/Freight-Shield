// Test to update name
import React from "react";
import {
  Step,
  StepIndicator,
  StepSeparator,
  StepTitle,
  Stepper,
  Box,
} from "@chakra-ui/react";

const StepNumber = ({ number }) => <div>{number}</div>;

const steps = [
  { title: "Contact Details" },
  { title: "Business Details" },
  { title: "Submission" },
];

export const RegistrationProgress = ({ currentStep }) => {
  return (
    <Box width={{ base: "95%", md: "80%", lg: "60%" }} mx="auto">
      <Stepper index={currentStep} colorScheme="customBlue">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepNumber number={index + 1} />
            </StepIndicator>
            <Box>
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};


