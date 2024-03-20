import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../components/customs/customButton";
import LogBookStructure from "../components/logBook/logBookStructure";
import CustomInput from "../components/customs/customInput";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function EditLogBookScreen({ route }) {
  const navigation = useNavigation();
  const log = route.params;
  const ipConfig = process.env.REACT_IP_CONFIG;
  const [entries, setEntries] = useState([
    { status: "OFF", startTime: "", endTime: "", key: Math.random() },
  ]);

  const addEntry = () => {
    setEntries([
      ...entries,
      { status: "OFF", startTime: "", endTime: "", key: Math.random() },
    ]);
  };

  const updateEntry = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  const handleEdit = async () => {
    const formattedData = entries.reduce((acc, entry) => {
      if (!acc[entry.status]) {
        acc[entry.status] = [];
      }

      const startTimeInMinutes = parseFloat(entry.startTime) * 60;
      const endTimeInMinutes = parseFloat(entry.endTime) * 60;

      acc[entry.status].push({
        start: startTimeInMinutes,
        end: endTimeInMinutes,
      });
      return acc;
    }, {});

    try {
      const response = await axios.put(
        `${ipConfig}/api/editlogbook/${log.logEntry._id}`,
        formattedData
      );
      Alert.alert("Success", "Logbook updated successfully.");
      navigation.navigate("LogBook");
    } catch (error) {
      console.error("Editing error:", error);
      Alert.alert(
        "Edit Failed",
        "There was a problem editing the logbook. Please try again."
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Logbook</Text>
        <Text style={styles.subtitle}>
          {log.logEntry.date}
          {" ("}
          {log.logEntry.day}
          {")"}
        </Text>
        {log && <LogBookStructure fetchedLogbook={log.logEntry.status} />}

        {entries.map((entry, index) => (
          <View key={entry.key} style={styles.pickerContainer}>
            <Picker
              selectedValue={entry.status}
              onValueChange={(itemValue) =>
                updateEntry(index, "status", itemValue)
              }
              style={styles.picker}
            >
              <Picker.Item label="OFF" value="OFF" />
              <Picker.Item label="SB" value="SB" />
              <Picker.Item label="D" value="D" />
              <Picker.Item label="ON" value="ON" />
            </Picker>
            <View style={styles.inputsContainer}>
              <View style={styles.customInputContainer}>
                <CustomInput
                  label="Start Time"
                  value={entry.startTime}
                  onChangeText={(text) => updateEntry(index, "startTime", text)}
                  required={true}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.customInputContainer}>
                <CustomInput
                  label="End Time"
                  value={entry.endTime}
                  onChangeText={(text) => updateEntry(index, "endTime", text)}
                  required={true}
                  keyboardType="numeric"
                  autoCapitalize="none"
                />
              </View>
            </View>
          </View>
        ))}

        <View style={styles.buttonContainer}>
          <CustomButton pH={15} children={"Add Time"} onPress={addEntry} />
          <CustomButton pH={20} children={"Submit"} onPress={handleEdit} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: "#0866FF",
    marginBottom: 20,
    fontFamily: "Lora-SemiBold",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Lora-Bold",
    fontSize: 18,
    padding: 10,
    color: "#0866FF",
  },
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "white",
    marginTop: 10,
  },
  picker: {
    width: 110,
    marginLeft: 5,
  },
  inputsContainer: {
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    paddingTop: 20,
  },
  customInputContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});
