import React, { useState, useEffect } from "react";
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
import axios from "axios";

function UserHeader({ title, userInfo, Status }) {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (userInfo.notification) {
      setNotificationCount(userInfo.notification.length);
    }
  }, [userInfo.notification]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNotificationCount(0); // Reset notification count on modal close
  };

  const deleteNotifications = () => {
    axios
      .delete("/api/notifications/delete")
      .then((response) => {
        console.log(response.data);
        setNotificationCount(0); // Reset notification count on successful deletion
      })
      .catch((error) => console.error("Error deleting notifications:", error));
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notifications</ModalHeader>
          <ModalCloseButton onClick={deleteNotifications} />
          <ModalBody>
            {userInfo?.notification?.length > 0 ? (
              userInfo.notification.map((note, index) => (
                <Text key={index}>{note.description}</Text>
              ))
            ) : (
              <Text>No New Notification</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default UserHeader;
