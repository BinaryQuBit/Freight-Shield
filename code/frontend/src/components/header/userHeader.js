// React Imports
import React, { useState, useEffect } from "react";

// Chakra UI Imports
import {
  Flex,
  Text,
  useColorMode,
  useMediaQuery,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

// Icon Import
import { MdNotifications } from "react-icons/md";

// Axios Import
import axios from "axios";

// Start of the Build
export default function UserHeader({ title, userInfo, Status }) {
  // Theme
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#343541" : "#E4E9F7";
  const textColor = colorMode === "dark" ? "white" : "#0866FF";
  const iconColor = colorMode === "dark" ? "white" : "#0866FF";

  // Screen Breakpoints
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 992px)");

  // Initials
  const firstNameInitial = userInfo.firstName
    ? userInfo.firstName.charAt(0)
    : "";
  const lastNameInitial = userInfo.lastName ? userInfo.lastName.charAt(0) : "";

  const initials = firstNameInitial + lastNameInitial;

  // Hooks
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  // Notifications in effect
  useEffect(() => {
    if (userInfo.notification) {
      setNotificationCount(userInfo.notification.length);
    }
  }, [userInfo.notification]);

  // Functions
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Delete Notification Handle
  const deleteNotifications = () => {
    if (notificationCount)
      axios
        .delete("/api/notifications/delete")
        .then(() => {
          setNotificationCount(0);
        })
        .catch((error) =>
          console.error("Error deleting notifications:", error)
        );
  };

  return (
    <Flex
      width="100%"
      bg={bgColor}
      p={15}
      align="center"
      justify="center"
      position="relative"
    >
      <Text fontSize="25px" fontWeight="bold">
        {title}
      </Text>

      {isSmallScreen || isMediumScreen ? (
        <Flex alignItems="center" position="absolute" right="1">
          {Status === "Active" ? (
            <>
              <Text mr={5}>
                <MdNotifications
                  color={iconColor}
                  onClick={openModal}
                  size={20}
                />
              </Text>
              {notificationCount > 0 && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#fff",
                    background: "#ff0000",
                    padding: "1px 5px",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "0",
                    right: "45px",
                  }}
                >
                  {notificationCount}
                </span>
              )}
            </>
          ) : (
            <></>
          )}

          <Flex
            align="center"
            justify="center"
            borderRadius="50%"
            bgColor="#0866FF"
            color="white"
            width="30px"
            height="30px"
            fontWeight="bold"
            fontSize="16px"
            padding="20px"
          >
            {initials}
          </Flex>
        </Flex>
      ) : (
        <Flex alignItems="center" position="absolute" right="50px">
          <Flex position="relative" mr={2}>
            {Status === "Active" ? (
              <>
                <MdNotifications
                  color={iconColor}
                  onClick={openModal}
                  size={20}
                />

                {notificationCount > 0 && (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#fff",
                      background: "#ff0000",
                      padding: "1px 5px",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-8px",
                      right: "-15px",
                    }}
                  >
                    {notificationCount}
                  </span>
                )}
              </>
            ) : (
              <></>
            )}
          </Flex>
          <Text fontSize="18px" ml="4" color={textColor}>
            {userInfo.firstName} {userInfo.lastName}
          </Text>
        </Flex>
      )}

      {/* Notification Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="2xl"
            fontWeight="bold"
            bg="#0866FF"
            color="white"
            textAlign={"center"}
          >
            Notifications
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={5}>
            {userInfo?.notification?.length > 0 ? (
              userInfo.notification.map((note, index) => (
                <Box
                  key={index}
                  p={3}
                  my={2}
                  bg="gray.100"
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor="gray.200"
                  boxShadow="sm"
                >
                  <Text fontSize="md" color="gray.600">
                    {note.description}
                  </Text>
                </Box>
              ))
            ) : (
              <Text fontSize="lg" textAlign="center" color="gray.500">
                No New Notifications
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                deleteNotifications();
                closeModal();
              }}
            >
              Clear All
            </Button>
            <Button variant="ghost" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
