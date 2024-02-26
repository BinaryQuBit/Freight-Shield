import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../components/ipConfig";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function LogBookScreen2() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [logBooks, setLogBooks] = useState([]);

  useEffect(() => {
    if (!isFocused) return;
    const fetchLogBooks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/getlogbook`, {});
        setLogBooks(response.data);
      } catch (error) {
        console.error("Error fetching logbooks:", error);
        Alert.alert("Error", "Failed to fetch logbooks");
      }
    };
    fetchLogBooks();
  }, [isFocused]);

  const generateAndSharePDF = async (entry) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Driver Logbook</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
          .logbook { padding: 20px; }
          .logbook-header { text-align: center; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="logbook">
          <div class="logbook-header">
            <h2>Driver's Daily Logbook</h2>
          </div>
          <table>
            <tr><th>Date</th><td>${new Date(
              entry.date
            ).toLocaleDateString()}</td></tr>
            <tr><th>Truck Number</th><td>${entry.truckNumber}</td></tr>
            <tr><th>Trailer Number</th><td>${entry.trailerNumber}</td></tr>
            <tr><th>Driver Name</th><td>${entry.driverFirstName} ${
      entry.driverLastName
    }</td></tr>
            <tr><th>Co-Driver Name</th><td>${entry.coDriverFullName}</td></tr>
            <tr><th>Starting Odometer</th><td>${
              entry.startingOdometer
            }</td></tr>
            <tr><th>Ending Odometer</th><td>${entry.endingOdometer}</td></tr>
            <tr><th>Total Distance Driven</th><td>${
              entry.totalDistanceDrivenToday
            }</td></tr>
            <tr><th>Off Duty Hours</th><td>${entry.offDutyHours}</td></tr>
            <tr><th>Sleeper Hours</th><td>${entry.sleeperHours}</td></tr>
            <tr><th>Driving Hours</th><td>${entry.drivingHours}</td></tr>
            <tr><th>On Duty Not Driving Hours</th><td>${
              entry.onDutyNotDrivingHours
            }</td></tr>
          </table>
        </div>
      </body>
      </html>
    `;

    try {
      const { uri: tempUri } = await Print.printToFileAsync({ html });
      const customFileName = `DriversLogbook_${entry._id}.pdf`;
      const customFileUri = `${FileSystem.cacheDirectory}${customFileName}`;

      await FileSystem.copyAsync({ from: tempUri, to: customFileUri });
      await Sharing.shareAsync(customFileUri);
    } catch (error) {
      console.error("Failed to create or share PDF", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LogBookForm")}
        >
          <Text style={styles.buttonText}>Fill Today's LogBook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>History</Text>
        <ScrollView>
          {logBooks
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((entry, index) => (
              <View key={index} style={styles.entryContainer}>
                <Text style={styles.entryDate}>
                  {new Date(entry.date).toLocaleDateString()}
                </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() =>
                      navigation.navigate("LogBookDetails", { entry })
                    }
                  >
                    <Text style={styles.buttonText2}>Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => generateAndSharePDF(entry)}
                  >
                    <Text style={styles.buttonText2}>Create PDF</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f8f9fa",
  },
  dateContainer: {
    marginBottom: 20,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  historySection: {
    flex: 1,
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  historyEntry: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  entryContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  entryDate: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  entryDetails: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  button: {
    backgroundColor: "#0866FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button2: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: "#fff",
  },
});
