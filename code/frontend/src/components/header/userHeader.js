import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { MdNotifications } from "react-icons/md";

function UserHeader({ title, userInfo }) {
  const { colorMode } = useColorMode();
  const bgColor = colorMode === "dark" ? "#343541" : "#E4E9F7";
  const textColor = colorMode === "dark" ? "white" : "#0866FF";
  const iconColor = colorMode === "dark" ? "white" : "#0866FF";

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");
  const [isMediumScreen] = useMediaQuery("(max-width: 992px)");

  const firstNameInitial = userInfo.firstName
    ? userInfo.firstName.charAt(0)
    : "";
  const lastNameInitial = userInfo.lastName ? userInfo.lastName.charAt(0) : "";

  const initials = firstNameInitial + lastNameInitial;

  const [notificationCount, setNotificationCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const incrementNotificationCount = () => {
    setNotificationCount((prevCount) => prevCount + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
          <Text mr={5}>
            <MdNotifications
              color={iconColor}
              onClick={() => {
                incrementNotificationCount();
                openModal();
              }}
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
            <MdNotifications
              color={iconColor}
              onClick={() => {
                incrementNotificationCount();
                openModal();
              }}
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
          </Flex>
          <Text fontSize="18px" ml="4" color={textColor}>
            {userInfo.firstName} {userInfo.lastName}
          </Text>
        </Flex>
      )}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Notification 1</Text>
            <Text>Notification 2</Text>
            <Text>Notification 3</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default UserHeader;
