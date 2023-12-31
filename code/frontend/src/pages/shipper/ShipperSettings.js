import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../../components/sidebar/ShipperSideBar";
import {
  Card,
  Input,
  Stack,
  Center,
  HStack,
  Spacer,
  VStack,
  Checkbox,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import GreenButton from "../../components/buttons/GreenButton";
import BlueButton from "../../components/buttons/BlueButton";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  return <Sidebar activePage="shipperSettings" />;
}