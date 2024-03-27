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
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import {
  faSignOutAlt,
  faHeadset,
  faTruck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../components/themeContext.js";
import { useIsFocused } from "@react-navigation/native";

export default function SettingScreen(props) {
  const { isDarkMode, toggleTheme } = useTheme();
  const ipConfig = process.env.REACT_IP_CONFIG;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Hooks
  const [driverData, setDriverData] = useState("");

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

  return (
    <View
      style={[
        styles.flexContainer,
        { backgroundColor: isDarkMode ? "#333" : "#FFF" },
      ]}
    >
      <ScrollView style={styles.container}>
        <View style={styles.settingItem}>
          <Text
            style={[
              styles.settingText,
              { color: isDarkMode ? "#FFF" : "#333" },
            ]}
          >
            Dark Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
<View>
  <Text>Driver Information</Text>
</View>
        <View>
          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            First Name: {driverData.firstName}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Last Name: {driverData.lastName}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Email: {driverData.email}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Canadian Carrier Code: {driverData.canadianCarrierCode}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Phone Number: {driverData.phoneNumber}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Driver Licence (Front): {driverData.driverLicenceFront}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Driver Licence (Back): {driverData.driverLicenceBack}
          </Text>

          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}>
            Driver Abstract: {driverData.driverAbstract}
          </Text>
          <Text style={{ color: isDarkMode ? "#FFF" : "#333" }}></Text>
        </View>

        <TouchableOpacity onPress={() => handleEdit()}>
          <FontAwesomeIcon
            icon={faEdit}
            size={20}
            style={{ color: isDarkMode ? "#FFF" : "#333" }}
          />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} style={styles.icon} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSupport("Customer")}
        >
          <FontAwesomeIcon icon={faHeadset} style={styles.icon} />
          <Text style={styles.buttonText}>Customer Support</Text>
        </TouchableOpacity>

      </View>
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
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    marginBottom: 20,
  },
  settingText: {
    fontSize: 16,
    color: "#333",
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
    padding: 20,
    paddingBottom: 30,
    marginBottom: 40,
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
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  titleHeader: {
    fontSize: "20px",
  },
});
