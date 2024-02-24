import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { API_BASE_URL } from '../components/ipConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';



export default function LogBookScreen2() {
  const navigation = useNavigation();
  const [logBooks, setLogBooks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    const fetchLogBooks = async () => {
      try {
        const storedDriverId = await AsyncStorage.getItem('driverId');
        if (storedDriverId !== null) {
          const driverId = JSON.parse(storedDriverId);
          
          axios.get(`${API_BASE_URL}/getlogbook`, {
            params: {
              driverId: driverId, 
            }
          })
          .then(response => {
            setLogBooks(response.data);
          })
          .catch(error => {
            console.error('Failed to fetch logbooks', error);
            Alert.alert('Error', 'Failed to fetch logbooks');
          });
        }
      } catch (error) {
        console.error('Failed to fetch driver ID from storage', error);
      }
    };
  
    fetchLogBooks();
  }, [isFocused]);

  const generateAndSharePDF = async () => {
    // Define logbook data directly in the template for simplicity
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Driver Logbook</title>
          <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              .logbook { padding: 20px; }
              .logbook-header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .logbook-logo {
                  max-width: 100px; /* Adjust based on your logo size */
                  margin-bottom: 20px;
              }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
          </style>
      </head>
      <body>
          <div class="logbook">
              <div class="logbook-header">
                  <img src="https://yourwebsite.com/logo.png" alt="FreightShieldLogo" class="logbook-logo">
                  <h2>Driver's Daily Logbook</h2>
              </div>
              <table>
                  <tr><th>Date</th><td>2023-01-30</td></tr>
                  <tr><th>Truck Number</th><td>ABC123</td></tr>
                  <tr><th>Trailer Number</th><td>XYZ789</td></tr>
                  <tr><th>Driver Name</th><td>John Doe</td></tr>
                  <tr><th>Co-Driver Name</th><td>Mohammad Alharbi</td></tr>
                  <tr><th>Starting Odometer</th><td>10000</td></tr>
                  <tr><th>Ending Odometer</th><td>10500</td></tr>
                  <tr><th>Total Distance Driven</th><td>500</td></tr>
                  <tr><th>Off Duty Hours</th><td>8</td></tr>
                  <tr><th>Sleeper Hours</th><td>6</td></tr>
                  <tr><th>Driving Hours</th><td>8</td></tr>
                  <tr><th>On Duty Not Driving Hours</th><td>2</td></tr>
              </table>
          </div>
      </body>
      </html>
    `;

    try {
       
      const { uri: tempUri } = await Print.printToFileAsync({ html });

      
      const customFileName = `DriversLogbook_${"2023-01-30"}.pdf`;
      const customFileUri = `${FileSystem.cacheDirectory}${customFileName}`;

      await FileSystem.copyAsync({
          from: tempUri,
          to: customFileUri,
      });

      await Sharing.shareAsync(customFileUri);
  } catch (error) {
      console.error(error);
  }
  };


  // const createPDF = async (entry) => {
  //   const html = createHTML(entry);
  //   const canvas = await html2canvas(document.body);
  //   const imgData = canvas.toDataURL('image/png');
  //   const pdf = new jsPDF();
  //   pdf.addImage(imgData, 'PNG', 0, 0);
  //   pdf.save('logbook.pdf');
  // };

  // const createHTML = (entry) => `
  //   <h1>${entry.date}</h1>
  //   <p>hello</p>
  // `;

  return (
    <View style={styles.container}>
      {/* Current Date Display */}
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LogBookForm')}
        >
          <Text style={styles.buttonText}>Fill Today's LogBook</Text>
        </TouchableOpacity>
      </View>
      
      {/* History Section */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>History</Text>
        <ScrollView>
          {logBooks.sort((a, b) => new Date(b.date) - new Date(a.date)).map((entry, index) => (
            <View key={index} style={styles.entryContainer}>
              <Text style={styles.entryDate}>{new Date(entry.date).toLocaleDateString()}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity 
                  style={styles.button2}
                  onPress={() => navigation.navigate('LogBookDetails', { entry })}
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
    backgroundColor: '#f8f9fa', // A light grey background
  },
  dateContainer: {
    marginBottom: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff', // White background for the date
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#2c3e50', // Dark blue color for the date text
  },
  historySection: {
    flex: 1,
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e', // A darker grey color for the title
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  historyEntry: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
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
    borderBottomColor: '#ccc',
  },
  entryDate: {
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  entryDetails: {
    fontSize: 14,
    color: '#7f8c8d', // A softer color for details
  },
  button: {
    backgroundColor: '#0866FF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 30, // Add some space above the button
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button2: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText2: {
    color: '#fff',
  },
});
