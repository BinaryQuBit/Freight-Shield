import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faInfoCircle,
  faUser,
  faMapMarkedAlt,
  faTruckLoading,
  faClock,
} from '@fortawesome/free-solid-svg-icons';

const ICON_SIZE = 20;

export default function HomeScreen() {
  const [firstName, setFirstName] = useState('');
  const isFocused = useIsFocused();
  const [pickUpCity, setPickUpCity] = useState('');
  const [dropOffCity, setDropOffCity] = useState('');
  const [shipperCompanyName, setShipperCompanyName] = useState('');
  const [loadAccepted, setLoadAccepted] = useState(false);


  useEffect(() => {
    if (!isFocused) return;
    const fetchData = async () => {
      try {
        const API_BASE_URL = 'http://142.3.84.37:8080';
        const nameResponse = await axios.get(`${API_BASE_URL}/api/getFirstName`);
        setFirstName(nameResponse.data.firstName);

        if (nameResponse.data.loads && nameResponse.data.loads.length > 0) {
          setPickUpCity(nameResponse.data.loads[0].pickUpCity);
          setDropOffCity(nameResponse.data.loads[0].dropOffCity);
          setShipperCompanyName(nameResponse.data.loads[0].shipperCompanyName);
        } else {
          console.log("No loads found");
          setPickUpCity('');
          setDropOffCity("");
          setShipperCompanyName("");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data');
      }
    };
    fetchData();
  }, [isFocused]);

  const currentLoad = {
    workingDayHours: "8 hours",
    workingWeekHours: "40 hours",
  };

  const onCurrentLoadPress = () => {
    console.log("Current load pressed");
  };

  const acceptLoad = async () => {
    try {
      const API_BASE_URL = 'http://142.3.84.37:8080';
      // Add the appropriate endpoint and data for your PUT request
      const response = await axios.put(`${API_BASE_URL}/api/acceptload`, {
        // Your request payload here, if needed
      });
      Alert.alert('Success', 'Load accepted successfully');
      setLoadAccepted(true); // Update state to reflect that the load has been accepted
    } catch (error) {
      console.error('Error accepting load:', error);
      Alert.alert('Error', 'Failed to accept load');
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {firstName}</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>New Load</Text>
        <TouchableOpacity
          style={styles.currentLoadContainer}
          onPress={onCurrentLoadPress}
          activeOpacity={0.7}
        >
          <FontAwesomeIcon
            icon={faInfoCircle}
            size={ICON_SIZE}
            style={styles.infoIcon}
          />
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon
              icon={faUser}
              size={ICON_SIZE}
              style={styles.icon}
            />
            <Text style={styles.locationText}>
              Shipper: {shipperCompanyName}
            </Text>
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon
              icon={faMapMarkedAlt}
              size={ICON_SIZE}
              style={styles.icon}
            />
            <Text style={styles.locationText}>
              Pickup: {pickUpCity}
            </Text>
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon
              icon={faTruckLoading}
              size={ICON_SIZE}
              style={styles.icon}
            />
            <Text style={styles.locationText}>
              Drop: {dropOffCity}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Working Hours</Text>
        <View style={styles.workingHoursContainer}>
          <View style={styles.workingHoursDetail}>
            <FontAwesomeIcon
              icon={faClock}
              size={ICON_SIZE}
              style={styles.icon}
            />
            <Text style={styles.workingHoursText}>
              Day: {currentLoad.workingDayHours}
            </Text>
          </View>
          <View style={styles.workingHoursDetail}>
            <FontAwesomeIcon
              icon={faClock}
              size={ICON_SIZE}
              style={styles.icon}
            />
            <Text style={styles.workingHoursText}>
              Week: {currentLoad.workingWeekHours}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.acceptButtonContainer}>
  {!loadAccepted && ( // This line checks if loadAccepted is false
    <TouchableOpacity
      style={styles.acceptButton}
      onPress={acceptLoad}
      activeOpacity={0.7}
    >
      <Text style={styles.acceptButtonText}>Accept</Text>
    </TouchableOpacity>
  )}
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0866FF",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#0866FF",
    textAlign: "left",
    width: "100%",
    paddingLeft: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  currentLoadContainer: {
    backgroundColor: "#e8eaf6",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%", // Adjust width
  },
  loadDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationText: {
    fontSize: 18,
  },
  infoIcon: {
    color: "#3949ab",
    alignSelf: "flex-end",
  },
  icon: {
    marginRight: 10,
  },
  workingHoursContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  workingHoursDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  workingHoursText: {
    fontSize: 18,
    marginLeft: 5,
  },
  acceptButtonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: "#4CAF50", // Green background
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "90%", // Match the width of other containers for consistency
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});

