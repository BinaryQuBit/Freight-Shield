import React, { useState } from "react";
import CustomButton from "../buttons/customButton";
import { useTheme } from "@chakra-ui/react";
import { FiUpload, FiXCircle } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Select,
} from "@chakra-ui/react";

function AddUnit({ isOpen, onClose }) {
  const theme = useTheme();
  const customBlue = theme.colors.customBlue;

  // State for each input field
  const [unitNumber, setUnitNumber] = useState('');
  const [unitType, setUnitType] = useState('');
  const [unitMake, setUnitMake] = useState('');
  const [unitModel, setUnitModel] = useState('');
  const [unitYear, setUnitYear] = useState('');
  const [unitVIN, setUnitVIN] = useState('');
  const [unitLicencePlate, setUnitLicensePlate] = useState('');
  const [unitStatus, setUnitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'unitNumber':
        setUnitNumber(value);
        break;
      case 'unitType':
        setUnitType(value);
        break;
      case 'unitMake':
        setUnitMake(value);
        break;
      case 'unitModel':
        setUnitModel(value);
        break;
      case 'unitYear':
        setUnitYear(value);
        break;
      case 'unitVIN':
        setUnitVIN(value);
        break;
      case 'unitLicencePlate':
        setUnitLicensePlate(value);
        break;
      case 'unitStatus':
        setUnitStatus(value);
        break;
      default:
        break;
    }
  };

  const handleAddUnit = async (event) => {
    event.preventDefault();
    
    const unitData = {
      unitNumber,
      unitType,
      unitMake,
      unitModel,
      unitYear: Number(unitYear),
      unitVIN,
      unitLicencePlate,
      unitStatus,
    };

    try {
      const response = await axios.post('/addUnit', unitData);
      console.log('Unit added successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error adding unit:', error);
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  

  return (
    <Modal isOpen={isOpen} onClose={() => {}} size="3xl" isClosable={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Add New Unit</ModalHeader>
        <form onSubmit={handleAddUnit}>
          <ModalBody>
            <Flex>
              <FormControl
                mr={{ lg: 2 }}
                mt={"4"}
                variant="floating"
                isRequired
              >
                <Input
                  type="text"
                  name="unitNumber"
                  placeholder=" "
                  rounded={"no"}
                  value={unitNumber}
                    onChange={handleChange}
                />
                <FormLabel>Unit Number</FormLabel>
              </FormControl>
              <FormControl
                mr={{ lg: 2 }}
                mt={"4"}
                variant="floating"
                isRequired
              >
                <Select
                  placeholder="Select type"
                  name="unitType"
                  rounded={"none"}
                  isRequired
                  value={unitType}
                  onChange={handleChange}
                >
                  <option value="tractor">Tractor</option>
                  <option value="trailer">Trailer</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex>
            <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Input
                  type="text"
                  name="unitMake"
                  placeholder=" "
                  rounded={"no"}
                  value={unitMake}
                  onChange={handleChange}
                />
                <FormLabel>Make</FormLabel>
                </FormControl>
                <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Input
                  type="text"
                  name="unitModel"
                  placeholder=" "
                  rounded={"no"}
                  value={unitModel}
                  onChange={handleChange}
                />
                <FormLabel>Model</FormLabel>
                </FormControl>
            </Flex>
            <Flex>
            <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Input
                  type="number"
                  name="unitYear"
                  placeholder=" "
                  rounded={"no"}
                  value={unitYear}
                  onChange={handleChange}
                />
                <FormLabel>Year</FormLabel>
                </FormControl>
                <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Input
                  type="text"
                  name="unitVIN"
                  placeholder=" "
                  rounded={"no"}
                  value={unitVIN}
                  onChange={handleChange}
                />
                <FormLabel>VIN Number</FormLabel>
                </FormControl>
            </Flex>
            <Flex>
            <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Input
                  type="text"
                  name="unitLicencePlate"
                  placeholder=" "
                  rounded={"no"}
                  value={unitLicencePlate}
                  onChange={handleChange}
                />
                <FormLabel>Licence Plate</FormLabel>
                </FormControl>
                <FormControl
                mr={{ lg: 2 }}
                mt={"10"}
                variant="floating"
                isRequired
              >
                <Select
                  placeholder="Select Status"
                  name="unitStatus"
                  rounded={"none"}
                  value={unitStatus}
                  onChange={handleChange}
                >
                  <option value="active">Active</option>
                  <option value="inActive">In Active</option>
                  <option value="Maintenance">In Maintenance</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between">
                {/* This is Close Button */}
                <CustomButton
                  color={customBlue}
                  icon={<IoMdCloseCircle />}
                  mt="4"
                  w="90px"
                  children="Close"
                  variant="blueBackwardButton"
                  onClick={handleCloseClick}
                />

                {/* This is Add Button */}
                <CustomButton
                  color={customBlue}
                  icon={<IoMdAddCircle />}
                  mt="4"
                  w="100px"
                  type="submit"
                  children="Add"
                  variant="blueForwardButton"
                />
              </Flex>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddUnit;
