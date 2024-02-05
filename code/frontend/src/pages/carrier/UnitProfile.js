import Sidebar from "../../components/sidebar/CarrierSideBar";
import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EaseOut from "../../components/responsiveness/EaseOut"
import UserHeader from "../../components/header/UserHeader";

export default function UnitProfile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrailerType, setSelectedTrailerType] = useState("");
  const [truckDetails, setTruckDetails] = useState({
    unitNumber: "",
    vin: "",
    model: "",
    year: "",
    // Add more fields as needed
  });

  const handleAddTruck = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrailerType("");
    setTruckDetails({
      unitNumber: "",
      vin: "",
      model: "",
      year: "",
      // Reset additional fields
    });
  };

  const handleSaveTruck = () => {
    // Validate form fields before saving
    if (!selectedTrailerType || !truckDetails.unitNumber || !truckDetails.vin || !truckDetails.model || !truckDetails.year) {
      // Handle validation error (e.g., show an error message)
      console.error("Please fill in all required fields.");
      return;
    }

    // Additional logic to save truck info (e.g., send request to server)
    axios.post("/unitprofile", {
      trailerType: selectedTrailerType,
      ...truckDetails,
    })
    .then((response) => {
      console.log("Truck Details Saved Successfully:", response.data);
      // Optionally, update UI or show a success message
    })
    .catch((error) => {
      console.error("Error Saving Truck Details:", error);
      // Handle errors (e.g., show an error message)
    });

    // Close the modal after saving (whether successful or not)
    handleCloseModal();
  };

  useEffect(() => {
    axios
      .get("/unitprofile", { withCredentials: true })
      .then((response) => {
        console.log("Unit Profile Fetched Successfully");
      })
      .catch((error) => {
        console.error("Error Fetching Unit Profile: ", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          navigate("/login");
        }
      });
  }, [navigate]);

  return (
    <Flex>
      <Sidebar activePage="unitProfile" />
      <Flex flex="1" justifyContent="center">
        <Button onClick={handleAddTruck}>Add New Truck Posting</Button>

        {/* Modal for adding a new truck posting */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Truck Posting</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Form fields for truck posting details */}
              <FormControl>
                <FormLabel>Trailer Type</FormLabel>
                <Select
                  value={selectedTrailerType}
                  onChange={(e) => setSelectedTrailerType(e.target.value)}
                >
                  <option value="Dry Van">Dry Van</option>
                  <option value="Flat Bed">Flat Bed</option>
                  <option value="Reefer">Reefer</option>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Unit Number</FormLabel>
                <Input
                  value={truckDetails.unitNumber}
                  onChange={(e) =>
                    setTruckDetails({ ...truckDetails, unitNumber: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>VIN</FormLabel>
                <Input
                  value={truckDetails.vin}
                  onChange={(e) =>
                    setTruckDetails({ ...truckDetails, vin: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Model</FormLabel>
                <Input
                  value={truckDetails.model}
                  onChange={(e) =>
                    setTruckDetails({ ...truckDetails, model: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Year</FormLabel>
                <Input
                  value={truckDetails.year}
                  onChange={(e) =>
                    setTruckDetails({ ...truckDetails, year: e.target.value })
                  }
                />
              </FormControl>
              {/* Add more form fields as needed */}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveTruck}>
                Save
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Text>Unit Profile</Text>
      </Flex>
    </Flex>
  );
}
