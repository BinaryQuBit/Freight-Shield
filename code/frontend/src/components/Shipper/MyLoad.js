import { Flex, Text } from "@chakra-ui/react";
import Sidebar from "../Sidebar/ShipperSideBar";
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
import GreenButton from "../buttons/greenButton";
import BlueButton from "../buttons/blueButton";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyLoad() {
    return(
        <Sidebar activePage="myLoads" />
    )
}