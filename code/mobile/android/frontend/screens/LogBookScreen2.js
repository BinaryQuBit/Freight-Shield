import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default function LogBookScreen2() {
  const navigation = useNavigation();
  const [logBooks, setLogBooks] = useState([]);

  useEffect(() => {
    axios.get('http://142.3.84.67:8080/api/users/getlogbook')
      .then(response => {
        setLogBooks(response.data);
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to fetch logbooks');
      });
  }, []);
  
  const createHTML = (entry) => `
    <h1>${entry.date}</h1>
    <p>hello</p>
    <!-- Add more fields as necessary -->
  `;

  const createPDF = async (entry) => {
    let options = {
      html: createHTML(entry),
      fileName: 'logbook',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // file.filePath contains the path to the created PDF
  };

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
                  onPress={() => createPDF(entry)}
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
    backgroundColor: '#1E90FF',
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
