// React Imports
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
  Image,
  Modal,
} from "react-native";

// Axios Import
import axios from "axios";

// Icon Imports
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSignOutAlt,
  faHeadset,
  faEdit,
  faSave,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

// Custom Import
import { useTheme } from "../components/themeContext.js";
import CustomUpload from "../components/customs/customUpload.js";

// Function to split the value and make it readable
const humanize = (str) => {
  return (
    str
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

// Start of the Build
export default function SettingScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const ipConfig = "https://freightshield.ca";
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  // Hooks
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // Open Modal Function
  const openModal = (imgUri) => {
    setCurrentImage(imgUri);
    setModalVisible(true);
  };

  // Format Label
  const formatLabel = (key) => {
    const words = key.match(/[A-Z]?[a-z]+/g) || [];

    return words.map(capitalize).join(" ");
  };

  // Captilize
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  // Hooks
  const [driverData, setDriverData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    canadianCarrierCode: "",
    driverLicenceFront: "",
    driverLicenceBack: "",
    driverAbstract: "",
  });
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    canadianCarrierCode: false,
    driverLicenceFront: false,
    driverLicenceBack: false,
    driverAbstract: false,
  });

  // Logout
  const logout = () => {
    axios
      .get(`${ipConfig}/logout`, { withCredentials: true })
      .then(() => {
        navigation.navigate("WelcomeScreen");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // Toggle Edit
  const toggleEdit = (field) => {
    setEditableFields((currentFields) => ({
      ...currentFields,
      [field]: !currentFields[field],
    }));
  };

  useEffect(() => {
    if (!isFocused) return;
    let isMounted = true;

    // Fetch Data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ipConfig}/api/driversettings`);
        if (isMounted) {
          setDriverData(response.data.data);
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

  // Handle Support
  const handleSupport = async (type) => {
    let phoneNumber = "";
    if (type === "Customer") {
      phoneNumber = "4037026157";
    }

    // URL/Link
    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  // Handle Change for Data
  const handleChange = (field, value) => {
    setDriverData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };

  // Handle File Selected
  const handleFileSelected = (field, file) => {
    setDriverData((currentData) => ({
      ...currentData,
      [field]: file,
    }));
  };

  // Handle Save
  const saveDriverData = async () => {
    const formData = new FormData();
    Object.keys(driverData).forEach((key) => {
      if (
        !["driverLicenceFront", "driverLicenceBack", "driverAbstract"].includes(
          key
        )
      ) {
        formData.append(key, driverData[key]);
      }
    });

    const fileKeys = [
      "driverLicenceFront",
      "driverLicenceBack",
      "driverAbstract",
    ];
    fileKeys.forEach((key) => {
      if (
        driverData[key] &&
        driverData[key].assets &&
        driverData[key].assets.length > 0
      ) {
        const file = driverData[key].assets[0];
        formData.append(key, {
          uri: file.uri,
          type: file.mimeType,
          name: file.name,
        });
      }
    });

    try {
       await axios.put(
        `${ipConfig}/api/updateDriverData`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      Alert.alert("Success", "Data updated successfully.");
      setEditableFields({
        firstName: false,
        lastName: false,
        email: false,
        phoneNumber: false,
        canadianCarrierCode: false,
        driverLicenceFront: false,
        driverLicenceBack: false,
        driverAbstract: false,
      });
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save data");
    }
  };

  return (
    <View
      style={[
        styles.flexContainer,
        { backgroundColor: isDarkMode ? "#333" : "#FFF" },
      ]}
    >
      <ScrollView style={styles.container}>
        <View
          style={[
            styles.toggleContainer,
            {
              backgroundColor: isDarkMode ? "#222" : "#EEE",
              marginHorizontal: 20,
            },
          ]}
        >
          <Text
            style={[
              styles.toggleLabel,
              { color: isDarkMode ? "#FFF" : "#333" },
            ]}
          >
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text
            style={[styles.infoTitle, { color: isDarkMode ? "#FFF" : "#333" }]}
          >
            Driver Information
          </Text>
          {Object.keys(driverData).map((key) => (
            <View
              key={key}
              style={[
                styles.infoRow,
                { borderColor: isDarkMode ? "#555" : "#ccc" },
              ]}
            >
              {[
                "driverLicenceFront",
                "driverLicenceBack",
                "driverAbstract",
              ].includes(key) ? (
                <>
                  <View style={styles.uploadContainer}>
                    <Text
                      style={{
                        color: isDarkMode ? "#FFF" : "#333",
                        fontFamily: "Lora-Regular",
                        textAlign: "center",
                      }}
                    >
                      {humanize(key)}
                    </Text>
                    {editableFields[key] ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <View
                          style={{ flex: 4, marginRight: 8, marginTop: 20 }}
                        >
                          <CustomUpload
                            label={humanize(key)}
                            required={true}
                            onFileSelected={(file) =>
                              handleFileSelected(key, file)
                            }
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            justifyContent: "flex-end",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => toggleEdit(key)}
                            style={styles.editButton}
                          >
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => toggleEdit(key)}
                            style={[styles.editButton, { marginLeft: 4 }]}
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              size={25}
                              style={{ color: isDarkMode ? "#FFF" : "#0866FF" }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            openModal(`${ipConfig}/${driverData[key]}`)
                          }
                        >
                          <Image
                            source={{ uri: `${ipConfig}/${driverData[key]}` }}
                            style={styles.imageStyle}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => toggleEdit(key)}
                          style={styles.editButton}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            size={20}
                            style={{ color: isDarkMode ? "#FFF" : "#0866FF" }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </>
              ) : (
                <>
                  <Text
                    style={{
                      color: isDarkMode ? "#FFF" : "#333",
                      marginRight: 5,
                      fontFamily: "Lora-Regular",
                    }}
                  >
                    {`${formatLabel(key)}:`}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      editableFields[key] && styles.editableInput,
                      {
                        backgroundColor: isDarkMode ? "#555" : "#FFF",
                        color: isDarkMode ? "#FFF" : "#333",
                      },
                    ]}
                    onChangeText={(text) => handleChange(key, text)}
                    value={driverData[key]}
                    editable={editableFields[key]}
                  />
                  <TouchableOpacity
                    onPress={() => toggleEdit(key)}
                    style={styles.editButton}
                  >
                    <FontAwesomeIcon
                      icon={editableFields[key] ? faSave : faEdit}
                      size={20}
                      style={{ color: isDarkMode ? "#FFF" : "#0866FF" }}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0866FF" }]}
            onPress={saveDriverData}
          >
            <FontAwesomeIcon icon={faSave} size={20} style={styles.icon} />
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0866FF" }]}
            onPress={logout}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              size={20}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#0866FF" }]}
            onPress={() => handleSupport("Customer")}
          >
            <FontAwesomeIcon icon={faHeadset} size={20} style={styles.icon} />
            <Text style={styles.buttonText}>Customer Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Image
            source={{ uri: currentImage }}
            style={styles.zoomedImageStyle}
          />
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,

    padding: 20,
  },
  icon: {
    color: "#FFFFFF",
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#0866FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomButtons: {
    paddingBottom: 30,
    marginBottom: 60,
  },
  infoContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  infoTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Lora-SemiBold",
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleHeader: {
    fontSize: "20px",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  imageStyle: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  uploadContainer: {
    width: "100%",
    alignItems: "center",
    borderColor: "#ccc",
    borderRadius: 5,
  },
  editableInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  zoomedImageStyle: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
  buttonClose: {
    position: "absolute",
    top: 50,
    right: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
