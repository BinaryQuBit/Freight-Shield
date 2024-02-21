// Privacy Policy

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  UnorderedList,
  ListItem,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";

import Logo from "../logo/logo.svg";
import CustomButton from "../buttons/customButton";
import { IoMdCloseCircle } from "react-icons/io";

export default function Privacy({ isPrivacyOpen, onClosePrivacy }) {
  return (
    <Modal size="3xl" isOpen={isPrivacyOpen} onClose={onClosePrivacy}>
      <ModalOverlay />
      <ModalContent p={"30px"} rounded={"none"}>
        <Flex justifyContent="center">
          <Image src={Logo} w="200px" padding="5px" />
        </Flex>
        <ModalHeader textAlign="center">Privacy Policy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList spacing={3}>
            <Text fontWeight="bold" textAlign="center">
              Information We Collect
            </Text>
            <ListItem>
              Registration Data: Information provided during the signup process,
              such as company name, contact person, address, phone number, and
              email address.
            </ListItem>
            <ListItem>
              Load Details: Information about the loads you post, including
              destination, type of cargo, weight, and special handling
              requirements.
            </ListItem>
            <ListItem>
              Payment Information: Details related to any payments made on our
              platform.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Use of Information
            </Text>
            <ListItem>
              Facilitating the posting and matching of loads with appropriate
              carriers.
            </ListItem>
            <ListItem>
              Processing transactions and sending notifications about load
              status.
            </ListItem>
            <ListItem>
              Communicating updates, offers, and platform changes.
            </ListItem>
            <ListItem>
              Improving our platform and user experience based on feedback and
              interactions.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Cookies and Tracking
            </Text>
            <ListItem>
              We may use cookies and similar technologies to optimize platform
              performance, remember your preferences, and provide a streamlined
              experience.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Information Sharing and Disclosure
            </Text>
            <ListItem>
              Carriers: Essential load details are shared with potential
              carriers to facilitate transport agreements.
            </ListItem>
            <ListItem>
              Service Providers: We may collaborate with third-party entities
              for payment processing, analytics, and other services. Only
              necessary information is shared.
            </ListItem>
            <ListItem>
              Legal Necessities: Data may be disclosed when mandated by law or
              to safeguard our users and platform integrity.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Data Retention
            </Text>
            <ListItem>
              Personal and business data is retained to maintain your account,
              ensure proper delivery of services, and comply with legal
              obligations.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Your Choices and Rights
            </Text>
            <ListItem>
              Profile Management: Shippers can access and update their profile
              information at any time.
            </ListItem>
            <ListItem>
              Notifications: You can modify your notification settings within
              your account.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Security
            </Text>
            <ListItem>
              We adopt industry-standard measures to protect your data. While we
              strive to provide top-tier security, the digital nature of our
              services means we cannot guarantee absolute protection against all
              potential breaches.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              External Links
            </Text>
            <ListItem>
              Our platform might provide links to external sites or resources.
              We're not accountable for the practices and policies of these
              third-party entities.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Policy Changes
            </Text>
            <ListItem>
              Periodically, this policy may be revised. Notable changes will be
              communicated, but we advise regularly reviewing this policy for
              updates.
            </ListItem>

            <Text fontWeight="bold" textAlign="center">
              Contact Us
            </Text>
            <ListItem>
              Queries and concerns directed to freightshield@capstone.com /
              123-456-7890.
            </ListItem>
          </UnorderedList>
        </ModalBody>
        <ModalFooter>
          <CustomButton
            variant={"blueForwardButton"}
            w={"90px"}
            onClick={onClosePrivacy}
            children={"Close"}
            icon={<IoMdCloseCircle />}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
