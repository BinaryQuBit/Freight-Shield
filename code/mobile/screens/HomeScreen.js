// React Imports
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// Axios Import
import axios from "axios";

// Icons Imports
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faInfoCircle,
  faUser,
  faMapMarkedAlt,
  faTruckLoading,
  faClock,
  faCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

// Custom Imports
import CustomButton from "../components/customs/customButton";
import SendingLocation from "../components/sendingLocation";
import { useTheme } from "../components/themeContext.js";

// Screens Imports
import PreInspectionScreen from "./PreInspectionScreen";

// Start of the Build
export default function HomeScreen() {
  const ipConfig = process.env.REACT_IP_CONFIG;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  // Hooks
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState("");
  const [currentLoad, setCurrentLoad] = useState("");
  const [load, setLoad] = useState("");
  const [driverLoadStatus, setDriverLoadStatus] = useState("");
  const [declineReason, setDeclineReason] = useState("");

  const styles = getDynamicStyles(isDarkMode);
  // Mounting
  useEffect(() => {
    if (!isFocused) return;
    let isMounted = true;

    // Fetching Data for the Home Screen
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ipConfig}/api/gethomescreen`);
        if (isMounted) {
          setFirstName(response.data.info.firstName);
          setCurrentLoad(response.data.info.currentLoad);
          setStatus(response.data.info.driverStatus);
          setDriverLoadStatus(response.data.info.driverLoadStatus);
          setDeclineReason(response.data.info.declineReason);
          if (!response.data.info.load[0]) {
          } else {
            setLoad(response.data.info.load[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to fetch data");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isFocused]);

  // This needs to go
  const current = {
    workingDayHours: "8 hours",
    workingWeekHours: "40 hours",
  };

  
  const onCurrentLoadPress = () => {};

  const acceptLoad = async () => {
    try {
      const backend = process.env.REACT_IP_CONFIG;
      const response = await axios.put(`${backend}/api/acceptload`, {});
      Alert.alert("Load has been Accepted");
      navigation.navigate(PreInspectionScreen);
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'PreInspectionScreen' }],
      // });
    } catch (error) {
      console.error("Error accepting load:", error);
      Alert.alert("Error", "Failed to accept load");
    }
  };

  // Dynamic Styles
  const statusStyle = {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Lora-SemiBold",
    color: status === "Pending" ? "red" : "#42B72A",
  };
  const statusIcon = {
    alignSelf: "flex-end",
    color: status === "Pending" ? "red" : "#42B72A",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {firstName}</Text>

      <View style={styles.sectionContainer}>
        <View style={styles.currentLoadContainer}>
          <View style={styles.headerStyle}>
            <Text style={styles.subtitle}>Driver Status</Text>
            <FontAwesomeIcon icon={faCircle} size={20} style={statusIcon} />
          </View>
          <View>
            <Text style={statusStyle}>{status}</Text>
            {status === "Declined" && (
              <View style={styles.declineReasonContainer}>
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size={16}
                  style={styles.declineReasonIcon}
                />
                <Text style={styles.declineReasonText}>
                  Reason: {declineReason}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.currentLoadContainer}
          onPress={() => {
            navigation.navigate("WorkingHoursScreen", { load: load });
          }}
          activeOpacity={0.7}
        >
          <View style={styles.headerStyle}>
            <Text style={styles.subtitle}>Working Hours</Text>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size={20}
              style={styles.infoIcon}
            />
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon icon={faClock} size={20} style={styles.icon} />
            <Text style={styles.locationText}>
              Day: {current.workingDayHours}
            </Text>
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon icon={faClock} size={20} style={styles.icon} />
            <Text style={styles.locationText}>
              Week: {current.workingWeekHours}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.preInspectionButton}
        onPress={() => {
          navigation.navigate(PreInspectionScreen);
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.PreInspectionButtonText}>Start Pre-Inspection</Text>
      </TouchableOpacity>

      {status === "Approved" &&
      currentLoad &&
      driverLoadStatus === "Assigned" ? (
        <>
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.currentLoadContainer}
              onPress={() =>
                navigation.navigate("LoadDetailsScreen", { load: load })
              }
              activeOpacity={0.7}
            >
              <View style={styles.headerStyle}>
                <Text style={styles.subtitle}>New Load</Text>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size={20}
                  style={styles.infoIcon}
                />
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon icon={faUser} size={20} style={styles.icon} />
                <Text style={styles.locationText}>
                  Shipper: {load.shipperCompanyName}
                </Text>
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>
                  Pickup: {load.pickUpCity}
                </Text>
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon
                  icon={faTruckLoading}
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>
                  Drop: {load.dropOffCity}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.acceptButtonContainer}>
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={acceptLoad}
              activeOpacity={0.7}
            >
              <Text style={styles.PreInspectionButtonText}>
                Start Pre-Inspection
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : status === "Approved" &&
        !currentLoad &&
        driverLoadStatus === "Available" ? (
        <>
          <View
            style={styles.currentLoadContainer}
            onPress={onCurrentLoadPress}
            activeOpacity={0.7}
          >
            <View style={styles.headerStyle}>
              <Text style={styles.subtitle}>Load</Text>
            </View>
            <View>
              <Text style={styles.noLoad}>There is no Load yet</Text>
            </View>
          </View>
        </>
      ) : status === "Approved" &&
        driverLoadStatus === "Accepted" &&
        currentLoad ? (
        <>
          <View style={styles.sectionContainer}>
            <TouchableOpacity
              style={styles.currentLoadContainer}
              onPress={() =>
                navigation.navigate("LoadDetailsScreen", { load: load })
              }
              activeOpacity={0.7}
            >
              <View style={styles.headerStyle}>
                <Text style={styles.subtitle}>Current Load</Text>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  size={20}
                  style={styles.infoIcon}
                />
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon icon={faUser} size={20} style={styles.icon} />
                <Text style={styles.locationText}>
                  Shipper: {load.shipperCompanyName}
                </Text>
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>
                  Pickup: {load.pickUpCity}
                </Text>
              </View>
              <View style={styles.loadDetailRow}>
                <FontAwesomeIcon
                  icon={faTruckLoading}
                  size={20}
                  style={styles.icon}
                />
                <Text style={styles.locationText}>
                  Drop: {load.dropOffCity}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <SendingLocation load_id={load._id} />
        </>
      ) : (
        <></>
      )}
    </View>
  );
}
const getDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: isDarkMode ? "#222" : "#FFF",
      paddingTop: 20,
      flex: 1,
    },
    headerStyle: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 15,
      width: "90%",
    },
    title: {
      fontSize: 26,
      fontFamily: "Lora-SemiBold",
      color: isDarkMode ? "#FFF" : "#0866FF",
      marginBottom: 20,
    },
    sectionContainer: {
      width: "100%",
      alignItems: "center",
      marginBottom: 20,
    },
    subtitle: {
      fontSize: 20,
      color: isDarkMode ? "#E0E0E0" : "#3949AB",
      fontFamily: "Lora-Bold",
    },
    currentLoadContainer: {
      backgroundColor: isDarkMode ? "#333" : "#E8EAF6",
      padding: 20,
      borderRadius: 10,
      elevation: isDarkMode ? 0 : 4,
      width: "90%",
    },
    infoIcon: {
      color: isDarkMode ? "#BBB" : "#3949AB",
    },
    noLoad: {
      color: isDarkMode ? "#E0E0E0" : "#3949AB",
      fontFamily: "Lora-Bold",
      textAlign: "center",
      fontSize: 15,
    },
    loadDetailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
    },
    icon: {
      marginRight: 10,
      color: isDarkMode ? "#BBB" : "#3949AB",
    },
    locationText: {
      fontSize: 16,
      fontFamily: "Lora-Regular",
      color: isDarkMode ? "#DDD" : "#000",
    },
    acceptButtonContainer: {
      width: "100%",
      alignItems: "center",
      marginTop: 20,
    },
    acceptButton: {
      backgroundColor: "#42B72A",
      padding: 10,
      borderRadius: 10,
      elevation: isDarkMode ? 0 : 4,
      width: "90%",
    },
    PreInspectionButtonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
    },
    preInspectionButton: {
      backgroundColor: "#0866FF",
      padding: 10,
      borderRadius: 10,
      elevation: isDarkMode ? 0 : 4,
      width: "90%",
      marginBottom: 20,
    },
    declineStyle: {
      color: "red",
      fontFamily: "Lora-Regular",
    },
    declineReasonContainer: {
      marginTop: 20, 
      padding: 10, 
      backgroundColor: isDarkMode ? "#442222" : "#FFE8E8", 
      borderRadius: 5,
    },
    declineReasonText: {
      color: isDarkMode ? "#FFCCCC" : "#D22B2B",
      fontSize: 16,
      fontFamily: "Lora-Regular",
      textAlign: "left",
    },
    declineReasonIcon: {
      color: isDarkMode ? "#FFCCCC" : "#D22B2B",
      marginRight: 5,
    },
  });
