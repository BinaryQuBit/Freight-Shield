// React Imports
import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
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
import { Picker } from "@react-native-picker/picker";
import moment from "moment-timezone";

// Screens Imports
import PreInspectionScreen from "./PreInspectionScreen";

// Start of the Build
export default function HomeScreen() {
  const ipConfig = "https://freightshield.ca";
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();

  const currentTimeInMinutes =
    moment().tz("America/Regina").hours() * 60 +
    moment().tz("America/Regina").minutes();

  // Hooks
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState("");
  const [currentLoad, setCurrentLoad] = useState("");
  const [load, setLoad] = useState("");
  const [driverLoadStatus, setDriverLoadStatus] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [todayDrivingHRS, setTodayDrivingHrs] = useState("");
  const [weekDrivingHRS, setWeekDrivingHrs] = useState("");
  const [weekHRS, setWeekHRS] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("OFF");

  const postData = async () => {
    const dataToPost = {
      currentTime: currentTimeInMinutes,
      status: selectedOption,
    };

    try {
      const postResponse = await axios.put(
        `${ipConfig}/api/posttime`,
        dataToPost
      );
      console.log("Data posted successfully:", postResponse.data);
    } catch (postError) {
      console.error("Failed to post data:", postError);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
          if (response.data.info.load) {
            setCurrentLoad(response.data.info.currentLoad);
          } else {
            setCurrentLoad(null);
          }
          setStatus(response.data.info.driverStatus);
          setDriverLoadStatus(response.data.info.driverLoadStatus);
          setDeclineReason(response.data.info.declineReason);
          setTodayDrivingHrs(response.data.info.todayHours.D);
          setWeekDrivingHrs(response.data.info.weekHours.D);
          setWeekHRS(response.data.info.weekHours);
          if (!response.data.info.load) {
          } else {
            setLoad(response.data.info.load);
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

  const onCurrentLoadPress = () => {};

  const acceptLoad = async () => {
    if (!load) {
      return;
    }
    try {
      const backend = "https://freightshield.ca";
      await axios.put(`${backend}/api/acceptload`, {});
      Alert.alert("Load has been Accepted");
    } catch (error) {
      console.error("Error accepting load:", error);
      Alert.alert("Error", "Failed to accept load");
    }
  };

  const confirmDelivery = () => {
    Alert.alert(
      "Confirm Delivery",
      "Are you sure you delivered this load?",
      [
        {
          text: "No",
          onPress: () => console.log("Delivery not confirmed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => deliverLoad(),
        },
      ],
      { cancelable: false }
    );
  };

  const deliverLoad = async () => {
    if (!load) {
      Alert.alert("No load selected", "Please select a load first.");
      return;
    }
    try {
      const backend = "https://freightshield.ca";
      await axios.put(`${backend}/api/deliverload`, {});
    } catch (error) {
      console.error("Error delivering load:", error);
      Alert.alert("Error", "Failed to deliver load");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFA500";
      case "Approved":
        return "#42B72A";
      case "Declined":
        return "#FF0000";
      default:
        return "#000";
    }
  };

  // Dynamic Styles
  const statusStyle = {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Lora-SemiBold",
    color: getStatusColor(status),
  };
  const statusIcon = {
    alignSelf: "flex-end",
    color: getStatusColor(status),
  };
  const handleSubmit = () => {
    Alert.alert("Status has been changed");
    postData();
    setIsModalVisible(false);
  };

  return (
    <ScrollView style={styles.scrollStyle}>
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
              navigation.navigate("WorkingHoursScreen", { weekHours: weekHRS });
            }}
            activeOpacity={0.7}
          >
            <View style={styles.headerStyle}>
              <Text style={styles.subtitle}>Driving Hours</Text>
              <FontAwesomeIcon
                icon={faInfoCircle}
                size={20}
                style={styles.infoIcon}
              />
            </View>
            <View style={styles.loadDetailRow}>
  <FontAwesomeIcon icon={faClock} size={20} style={styles.icon} />
  <Text style={styles.locationText}>Day: {Math.round(todayDrivingHRS)}</Text>
</View>
            <View style={styles.loadDetailRow}>
              <FontAwesomeIcon icon={faClock} size={20} style={styles.icon} />
              <Text style={styles.locationText}>Week: {weekDrivingHRS}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
                  <FontAwesomeIcon
                    icon={faUser}
                    size={20}
                    style={styles.icon}
                  />
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
                <Text style={styles.PreInspectionButtonText}>Accept Load</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : status === "Approved" &&
          !currentLoad &&
          driverLoadStatus === "Available" ? (
          <>
            <View
              style={styles.currentContainer}
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
                  <FontAwesomeIcon
                    icon={faUser}
                    size={20}
                    style={styles.icon}
                  />
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
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={confirmDelivery}
              activeOpacity={0.7}
            >
              <Text style={styles.PreInspectionButtonText}>Deliver Load</Text>
            </TouchableOpacity>
          </>
        ) : (
          <></>
        )}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.preInspectionButton, styles.leftButton]}
            onPress={() => {
              toggleModal();
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.PreInspectionButtonText}>Change Status</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.preInspectionButton, styles.rightButton]}
            onPress={() => {
              navigation.navigate(PreInspectionScreen);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.PreInspectionButtonText}>Start Inspection</Text>
          </TouchableOpacity>
        </View>

        {load && <SendingLocation load_id={load._id} />}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Change Status</Text>
              <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => setSelectedOption(itemValue)}
                style={{ width: 200, height: 160 }}
              >
                <Picker.Item label="Off Duty" value="OFF" />
                <Picker.Item label="Sleeper Berth" value="SB" />
                <Picker.Item label="Driving" value="D" />
                <Picker.Item label="On Duty" value="ON" />
              </Picker>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

// Styles
const getDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    scrollStyle: {
      backgroundColor: isDarkMode ? "#222" : "#FFF",
      paddingBottom: 20,
    },
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
    },
    currentContainer: {
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
      marginTop: 10,
    },
    acceptButton: {
      backgroundColor: "#42B72A",
      padding: 10,
      borderRadius: 10,
      elevation: isDarkMode ? 0 : 4,
      width: "90%",
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
    },
    leftButton: {
      marginRight: 10, // add space between buttons
    },
    rightButton: {
      marginLeft: 10, // add space between buttons
    },
    buttonsContainer: {
      flexDirection: "row", // positions children in a horizontal row
      justifyContent: "space-evenly", // or 'space-between' to add space between buttons
    },
    PreInspectionButtonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontFamily: "Lora-Bold",
    },
    preInspectionButton: {
      backgroundColor: "#0866FF",
      padding: 15,
      borderRadius: 10,
      elevation: isDarkMode ? 0 : 4,
      marginBottom: 20,
      marginTop: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    },
    pickerStyle: {
      width: 200,
      height: 50,
      color: "#000",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
