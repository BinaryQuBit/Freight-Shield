import React, { useEffect, useState } from "react";
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
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import {
  faSignOutAlt,
  faHeadset,
  faTruck,
  faEdit,
  faSave,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../components/themeContext.js";
import { useIsFocused } from "@react-navigation/native";
import CustomUpload from "../components/customs/customUpload.js";

export default function SettingScreen(props) {
  const { isDarkMode, toggleTheme } = useTheme();
  const ipConfig = process.env.REACT_IP_CONFIG;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

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

  const toggleEdit = (field) => {
    setEditableFields((currentFields) => ({
      ...currentFields,
      [field]: !currentFields[field],
    }));
  };

  useEffect(() => {
    if (!isFocused) return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${ipConfig}/api/driversettings`);
        if (isMounted) {
          setDriverData(response.data.data);
          console.log("This is a data for driver", driverData);
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

  const handleSupport = async (type) => {
    let phoneNumber = "";
    if (type === "Customer") {
      phoneNumber = "4037026157";
    } else if (type === "Carrier") {
      phoneNumber = "3065813000";
    }

    const url = `tel:${phoneNumber}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  const handleEdit = () => {
    Alert.alert("Edit", `Edit`);
  };

  const handleChange = (field, value) => {
    setDriverData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  };
  const handleFileSelected = (field, file) => {
    
    setDriverData((currentData) => ({
      ...currentData,
      [field]: file.uri, 
    }));
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
                <View style={styles.uploadContainer}>
                  {editableFields[key] ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <View style={{ flex: 4, marginRight: 8 }}>
                        <CustomUpload
                          label={`Upload New File`}
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
                          <FontAwesomeIcon
                            icon={faSave}
                            size={20}
                            style={{ color: isDarkMode ? "#FFF" : "#0866FF" }}
                          />
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
                      <Image
                        source={{ uri: `${ipConfig}/${driverData[key]}` }}
                        style={styles.imageStyle}
                      />
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
              ) : (
                <>
                  <Text
                    style={{
                      color: isDarkMode ? "#FFF" : "#333",
                      marginRight: 5,
                    }}
                  >
                    {`${key.charAt(0).toUpperCase() + key.slice(1)}:`}
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
    </View>
  );
}

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
    fontWeight: "bold",
    marginBottom: 20,
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
    elevation: 5,
  },
  uploadContainer: {
    width: "100%",
    minHeight: 150,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",

    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
  editableInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
