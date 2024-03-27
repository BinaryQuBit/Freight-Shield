import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import axios from "axios";
import {
  faSignOutAlt,
  faHeadset,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingScreen(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const ipConfig = process.env.REACT_IP_CONFIG;
  const navigation = useNavigation();
  const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);
  const toggleNotifications = () =>
    setIsNotificationsEnabled((previousState) => !previousState);

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

  return (
    <View style={styles.flexContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Notifications</Text>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
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

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSupport("Carrier")}
        >
          <FontAwesomeIcon icon={faTruck} style={styles.icon} />
          <Text style={styles.buttonText}>Carrier Support</Text>
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
});