// React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Icon Import
import { FaCheck } from "react-icons/fa";

// Chakra UI Imports
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";

// Axios Import
import axios from "axios";

// Custom Imports
import Logo from "../../logo/logo.svg";
import CustomButton from "../../buttons/customButton";

// Start of the Build
export default function OTPModal({
  isOTPOpen,
  onCloseOTP,
  email,
  password,
  confirmPassword,
  onModalClose,
}) {
  const navigate = useNavigate();

  // Hooks
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(599);
  const [otpError, setOtpError] = useState("");

  // Timer
  useEffect(() => {
    let interval;
    if (isOTPOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer <= 0) {
      onCloseOTP();
    }
    return () => clearInterval(interval);
  }, [isOTPOpen, timer, onCloseOTP]);

  // Handling Change
  const handleOtpChange = (element, index) => {
    const value = element.value;
    const newOtp = [...otp];
    if (/^[0-9]$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) {
        element.nextSibling?.focus();
      }
    } else if (value === "") {
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  // Reset on close
  const resetClose = () => {
    onCloseOTP();
    onModalClose();
    setTimer(599);
  };

  // Handling Backspace on the input
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.value === "" && index > 0) {
        const prevSibling = e.target.previousElementSibling;
        if (prevSibling) {
          prevSibling.focus();
        }
      }
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const otpNumber = otp.join("");
    // Start of the Post Method
    try {
      await axios.post("/verifyOTP", {
        email,
        password,
        confirmPassword,
        otpNumber,
      });
      onCloseOTP();
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Error: ", error.response.data.message);
        if (error.response.data.message.includes("Invalid OTP")) {
          setOtpError("Invalid Code");
        }
      } else {
        console.error("Error submitting form:", error);
      }
    }
  };

  // Timer
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Modal isOpen={isOTPOpen} onClose={resetClose}>
      <ModalOverlay />
      <ModalContent p={"30px"} rounded={"none"}>
        <Flex justifyContent="center">
          <Image src={Logo} w="200px" padding="5px" />
        </Flex>
        <ModalHeader textAlign="center">OTP Verification</ModalHeader>
        <ModalCloseButton onClick={resetClose} />
        <ModalBody>
          <Flex justifyContent="space-between" pb={4}>
            {otp.map((item, index) => (
              <Input
                key={index}
                value={item}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1"
                size="lg"
                width="45px"
                textAlign="center"
                pattern="[0-9]*"
                inputMode="numeric"
                autoFocus={index === 0}
                isInvalid={item !== "" && !/^[0-9]$/.test(item)}
              />
            ))}
          </Flex>
          <Flex justifyContent="center" mb="4">
            <Text fontSize="lg">OTP expires in {formatTimer()}</Text>
          </Flex>
          {otpError && (
            <Text color="red.500" textAlign="center" mb="4">
              {otpError}
            </Text>
          )}
        </ModalBody>
        <ModalFooter>
          <CustomButton
            variant={"blueForwardButton"}
            w={"90px"}
            onClick={verifyOtp}
            children={"Verify"}
            icon={<FaCheck />}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
