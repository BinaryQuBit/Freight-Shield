import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../components/ipConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const activities = [
  "OFF-DUTY",
  "SLEEPER BERTH",
  "DRIVING",
  "ON-DUTY NOT DRIVING",
];

const CheckBox = ({ isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.checkBox, isSelected && styles.checkBoxSelected]}
    onPress={onPress}
  >
    {isSelected && <View style={styles.checkMark} />}
  </TouchableOpacity>
);

const LogBookForm = () => {
  const currentDate = new Date();
  const navigation = useNavigation();
  const [driverId, setDriverId] = useState("");

  const [logBook, setLogBook] = useState(
    Array.from({ length: 24 }, () => "OFF-DUTY")
  );
  const [totals, setTotals] = useState({
    "OFF-DUTY": 24,
    "SLEEPER BERTH": 0,
    DRIVING: 0,
    "ON-DUTY NOT DRIVING": 0,
  });

  const [formValues, setFormValues] = useState({
    startOdometer: "",
    endOdometer: "",
    totalDistance: "",
    date: currentDate,
    truckNumber: "",
    trailerNumber: "",
    driverFirstName: "",
    driverLastName: "",
    coDriverFullName: "",
  });

  const handleSubmit = async () => {
    try {
      const activityHours = {
        offDutyHours: totals["OFF-DUTY"],
        sleeperHours: totals["SLEEPER BERTH"],
        drivingHours: totals["DRIVING"],
        onDutyNotDrivingHours: totals["ON-DUTY NOT DRIVING"],
      };

      const submissionData = {
        startingOdometer: parseInt(formValues.startOdometer),
        endingOdometer: parseInt(formValues.endOdometer),
        totalDistanceDrivenToday: parseInt(formValues.totalDistance),
        date: formValues.date.toISOString(),
        truckNumber: formValues.truckNumber,
        trailerNumber: formValues.trailerNumber,
        driverFirstName: formValues.driverFirstName,
        driverLastName: formValues.driverLastName,
        coDriverFullName: formValues.coDriverFullName,
        ...activityHours,
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/createlogbook`,
        submissionData
      );

      if (response.status === 201) {
        Alert.alert(
          "LogBook Submission Successful",
          "Your logbook has been saved."
        );

        navigation.navigate("MainApp");
      }
    } catch (error) {
      console.error("LogBook Submission Failed", error);
      Alert.alert(
        "LogBook Submission Failed",
        "Please check your details and try again."
      );
    }
  };

  const handleActivityChange = (hour, activity) => {
    const updatedLogBook = [...logBook];
    const oldActivity = updatedLogBook[hour];
    updatedLogBook[hour] = activity;

    const updatedTotals = { ...totals };
    updatedTotals[oldActivity]--;
    updatedTotals[activity]++;
    setTotals(updatedTotals);

    setLogBook(updatedLogBook);
  };

  const handleInputChange = (name, value) => {
    const updatedFormValues = { ...formValues, [name]: value };

    if (name === "startOdometer" || name === "endOdometer") {
      const startOdometer = parseInt(updatedFormValues.startOdometer, 10) || 0;
      const endOdometer = parseInt(updatedFormValues.endOdometer, 10) || 0;
      const totalDistance = Math.max(endOdometer - startOdometer, 0); // Ensure totalDistance is not negative

      updatedFormValues.totalDistance = totalDistance.toString();
    }

    setFormValues(updatedFormValues);
  };

  return (
    <ScrollView style={styles.formContainer}>
      <View style={styles.dateDisplay}>
        <Text style={styles.dateText}>
          Date: {formValues.date.toDateString()}
        </Text>
      </View>

      <View style={styles.inputRow}>
        <View style={styles.odometerContainer}>
          <Text style={styles.label}>Starting Odometer:</Text>
          <TextInput
            style={[styles.input, styles.odometerInput]}
            placeholder="Starting Odometer"
            keyboardType="numeric"
            value={formValues.startOdometer}
            onChangeText={(text) => handleInputChange("startOdometer", text)}
          />
          <Text style={styles.label}>Ending Odometer:</Text>
          <TextInput
            style={[styles.input, styles.odometerInput]}
            placeholder="Ending Odometer"
            keyboardType="numeric"
            value={formValues.endOdometer}
            onChangeText={(text) => handleInputChange("endOdometer", text)}
          />
        </View>
        <View>
          <Text style={styles.label}>Total Distance:</Text>
          <TextInput
            style={[styles.input, styles.totalDistanceInput]}
            placeholder="Total Distance"
            keyboardType="numeric"
            value={formValues.totalDistance}
            onChangeText={(text) => handleInputChange("totalDistance", text)}
          />
        </View>
      </View>

      <Text style={styles.label}>Truck Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Truck Number"
        value={formValues.truckNumber}
        onChangeText={(text) => handleInputChange("truckNumber", text)}
      />
      <Text style={styles.label}>Trailer Number:</Text>
      <TextInput
        style={styles.input}
        placeholder="Trailer Number"
        value={formValues.trailerNumber}
        onChangeText={(text) => handleInputChange("trailerNumber", text)}
      />
      <Text style={styles.label}>Driver's First Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Driver's First Name"
        value={formValues.driverFirstName}
        onChangeText={(text) => handleInputChange("driverFirstName", text)}
      />
      <Text style={styles.label}>Driver's Last Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Driver's Last Name"
        value={formValues.driverLastName}
        onChangeText={(text) => handleInputChange("driverLastName", text)}
      />
      <Text style={styles.label}>Co-Driver's Full Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Co-Driver's Full Name"
        value={formValues.coDriverFullName}
        onChangeText={(text) => handleInputChange("coDriverFullName", text)}
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Time Schedule</Text>
      </View>

      <View style={styles.activitiesTable}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Hours</Text>
          {activities.map((activity) => (
            <Text key={activity} style={styles.activityHeaderText}>
              {activity}
            </Text>
          ))}
        </View>

        {logBook.map((currentActivity, hour) => (
          <View key={hour} style={styles.activityRow}>
            <Text style={styles.hourText}>{`${hour}:00`}</Text>
            {activities.map((activity, index) => (
              <View key={activity} style={styles.activityColumn}>
                <CheckBox
                  isSelected={currentActivity === activity}
                  onPress={() => handleActivityChange(hour, activity)}
                />
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.totalsDisplay}>
        {Object.entries(totals).map(([activity, totalHours]) => (
          <Text key={activity} style={styles.totalHoursText}>
            {activity}: {totalHours} hrs
          </Text>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit LogBook</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
    fontSize: 16,
  },
  dateDisplay: {
    paddingVertical: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  timeline: {
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
  },
  hourBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },

  activitiesRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10,
  },

  activityText: {
    textAlign: "center",
  },
  totalsDisplay: {
    marginTop: 20,
  },
  totalHoursText: {
    fontSize: 16,
    paddingVertical: 4,
  },
  submitButton: {
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  odometerContainer: {
    flex: 1,
    marginRight: 10,
  },
  odometerInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
    fontSize: 16,
  },
  totalDistanceInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#f7f7f7",
    fontSize: 16,
    height: 22 * 2 + 40,
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f7f7f7",
    borderTopWidth: 1,
    borderTopColor: "#e1e1e1",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e1e1",
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  activitiesTable: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
  },
  tableHeaderText: {
    width: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  activityHeaderContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityHeaderText: {
    flex: 3,
    fontWeight: "bold",
    textAlign: "center",
  },
  hourRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  hourLabel: {
    flex: 1,
    textAlign: "center",
  },
  activityColumn: {
    flex: 1,
    alignItems: "center",
  },
  activityButtonsContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityButton: {
    flex: 1,
    padding: 10,
    margin: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  activityButtonSelected: {
    backgroundColor: "#d0e0fb",
  },
  activityButtonText: {
    textAlign: "center",
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  hourText: {
    width: 50,
    textAlign: "center",
    marginRight: 8,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    backgroundColor: "#fff",
  },
  checkBoxSelected: {
    backgroundColor: "#007bff",
  },
  label: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export default LogBookForm; 
