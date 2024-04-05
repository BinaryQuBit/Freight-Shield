// React Import
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// Picker Import
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../components/themeContext.js";

// Axios Import
import axios from "axios";

// Start of the Build
export default function PreInspectionScreen() {
  const { isDarkMode } = useTheme();
  const ipConfig = process.env.REACT_IP_CONFIG;
  const navigation = useNavigation();
  const styles = getDynamicStyles(isDarkMode);

  // Hooks
  const [inspectionType, setInspectionType] = useState("Pre");
  const [defectDetails, setDefectDetails] = useState("");
  const [checkedItems, setCheckedItems] = useState([
    { label: "Air Brake System", checked: false },
    { label: "Cab", checked: false },
    { label: "Cargo Securement", checked: false },
    { label: "Coupling Devices", checked: false },
    { label: "Dangerous Goods", checked: false },
    { label: "Driver Controls", checked: false },
    { label: "Driver Seat", checked: false },
    { label: "Electric Brake System", checked: false },
    { label: "Emergency Equipment & Safety Equipment", checked: false },
    { label: "Exhaust Systems", checked: false },
    { label: "Frame Body", checked: false },
    { label: "Fuel System", checked: false },
    { label: "General", checked: false },
    { label: "Glass & Mirrors", checked: false },
    { label: "Heater / Defroster", checked: false },
    { label: "Horn", checked: false },
    { label: "Hydraulic Brake System", checked: false },
    { label: "Lamps and Reflectors", checked: false },
    { label: "Steering", checked: false },
    { label: "Suspension System", checked: false },
    { label: "Tires", checked: false },
    { label: "Wheels, Hubs, & Fasteners", checked: false },
    { label: "Windshields Wipers/Washer", checked: false },
  ]);

  // Toogle Checkbox
  const toggleCheckbox = (index) => {
    setCheckedItems(
      checkedItems.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Handle Submit
  const handleSubmit = async () => {
    const isAnyChecked = checkedItems.some((item) => item.checked);

    // Trim
    if (isAnyChecked && !defectDetails.trim()) {
      Alert.alert(
        "Missing Details",
        "Please provide details for the selected defect(s)."
      );
      return;
    }

    // Construction of the data
    const payload = {
      inspectionType,
      checkedItems: checkedItems
        .filter((item) => item.checked)
        .map((item) => item.label),
      defectDetails,
    };

    // Start of the POST Method
    try {
      console.log("This is Payload", payload);
      const response = await axios.post(`${ipConfig}/api/inspection`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Do you confirm that unit is safe to drive?");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error submitting inspection data:", error);
      Alert.alert("Error", "Failed to submit inspection data.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Inspection Form</Text>
      <Text style={styles.inputLabel}>Type of Inspection</Text>
      <Picker
        selectedValue={inspectionType}
        onValueChange={(itemValue) => setInspectionType(itemValue)}
        style={{ backgroundColor: isDarkMode ? "#333" : "white" }}
      >
        <Picker.Item label="Pre-Inspection" value="Pre" />
        <Picker.Item label="Post-Inspection" value="Post" />
      </Picker>
      <Text style={styles.inputLabel}>Select defect(s):</Text>
      {checkedItems.map((item, index) => (
        <CheckBox
          key={index}
          title={item.label}
          checked={item.checked}
          onPress={() => toggleCheckbox(index)}
          containerStyle={styles.checkbox}
          textStyle={
            isDarkMode ? styles.checkboxLabelDark : styles.checkboxLabelLight
          }
        />
      ))}
      <Text style={styles.inputLabel}>
        Provide details of defect(s) detected:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={setDefectDetails}
        value={defectDetails}
        placeholder="Enter defect details"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Inspection</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// Styles
const getDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: isDarkMode ? "#222" : "white",
    },
    title: {
      fontSize: 22,
      fontFamily: "Lora-Regular",
      marginBottom: 15,
      textAlign: "center",
      color: isDarkMode ? "#FFD700" : "#007BFF",
    },
    checkbox: {
      borderWidth: 0,
      backgroundColor: "transparent",
      marginVertical: 5,
    },
    inputLabel: {
      marginTop: 15,
      fontSize: 18,
      fontWeight: "600",
      fontFamily: "Lora-Bold",
      textAlign: "center",
      color: isDarkMode ? "#FFF" : "#333",
    },
    input: {
      borderWidth: 2,
      borderColor: isDarkMode ? "#888" : "#ccc",
      padding: 12,
      marginVertical: 5,
      borderRadius: 8,
      backgroundColor: isDarkMode ? "#444" : "#FFF",
      color: isDarkMode ? "#FFF" : "#333",
    },
    submitButton: {
      backgroundColor: isDarkMode ? "#FFA07A" : "#007bff",
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    submitButtonText: {
      color: "#ffffff",
      fontSize: 18,
      fontFamily: "Lora-Regular",
    },
    checkboxLabelDark: {
      color: "#FFF",
    },
    checkboxLabelLight: {
      color: "#000",
    },
  });
