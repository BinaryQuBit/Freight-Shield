import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBuilding,
  faClock,
  faMapMarkedAlt,
  faInfoCircle,
  faPhone,
  faEnvelope,
  faUser,
  faTruckLoading,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollView } from "react-native-gesture-handler";

export default function LoadDetailsScreen({ route }) {
  const { load } = route.params;

  const handlePhone = async () => {
    const phoneNumber = load.shipperPhoneNumber;
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleEmail = async () => {
    const email = load.shipperEmail;
    const url = `mailto:${email}`;
  
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };
  
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.section, styles.card]}>
          <Text style={styles.title}>Shipper Details:</Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faBuilding} style={styles.iconStyle} size={16} />{" "}
            {load.shipperCompanyName}
          </Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faUser} style={styles.iconStyle} size={16} /> {load.shipperFirstName}{" "}
            {load.shipperLastName}
          </Text>
          <TouchableOpacity onPress={() => handlePhone()}>
            <Text style={styles.link}>
              <FontAwesomeIcon icon={faPhone} style={styles.iconStyle} size={16} />{" "}
              {load.shipperPhoneNumber}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { handleEmail() }}
          >
            <Text style={styles.link}>
              <FontAwesomeIcon icon={faEnvelope} style={styles.iconStyle} size={16} />{" "}
              {load.shipperEmail}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, styles.card]}>
          <Text style={styles.title}>Pickup & Dropoff:</Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faMapMarkedAlt} style={styles.iconStyle} size={16} />{" "}
            {load.pickUpLocation}
          </Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faClock} style={styles.iconStyle} size={16} /> Date: {load.pickUpDate}{" "}
            Time: {load.pickUpTime}
          </Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faTruckLoading}  style={styles.iconStyle} size={16} />{" "}
            {load.dropOffLocation}
          </Text>
          <Text style={styles.content}>
            <FontAwesomeIcon icon={faClock} style={styles.iconStyle} /> Date:{" "}
            {load.dropOffDate} Time: {load.dropOffTime}
          </Text>
        </View>

        {/* Enhanced Load Specifications */}
        <View style={[styles.section, styles.card]}>
          <Text style={styles.title}>Load Specifications:</Text>
          <Text style={styles.content}>Type: {load.typeLoad}</Text>
          <Text style={styles.content}>Size: {load.sizeLoad} ft</Text>
          <Text style={styles.content}>Unit: {load.unitRequested}</Text>
          <Text style={styles.content}>Status: {load.status}</Text>
        </View>

        {load.additionalInformation && (
          <View style={[styles.section, styles.card]}>
            <Text style={styles.title}>
              <FontAwesomeIcon icon={faInfoCircle}  style={styles.iconStyle}  size={25} /> Additional
              Information:
            </Text>
            <Text style={styles.content}>{load.additionalInformation}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F2F2F7",
  },
  card: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 20,
    elevation: 3,
    marginBottom: 20,
  },
  iconStyle: {
    color: "#0866FF",
  },
  title: {
    fontSize: 20,
    fontFamily: "Lora-Bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#0866FF",
  },
  content: {
    fontSize: 18,
    marginBottom: 5,
    paddingLeft: 30,
    fontFamily: "Lora-Regular",
  },
  link: {
    fontSize: 18,
    color: "#007BFF",
    marginBottom: 5,
    paddingLeft: 30,
    fontFamily: "Lora-Regular",
  },
});
