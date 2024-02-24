import React, { useCallback } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

const TestScreen = () => {


  useFocusEffect(
    useCallback(() => {
      console.log('Screen was focused, refresh or update state here.');

      return () => console.log('Screen was unfocused, cleanup actions here.');
    }, [])
  );


  const generateAndSharePDF = async () => {
    // Define logbook data directly in the template for simplicity
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Driver Logbook</title>
          <style>
              body { font-family: Arial, sans-serif; }
              .logbook { padding: 20px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ddd; padding: 8px; }
              th { background-color: #f2f2f2; }
          </style>
      </head>
      <body>
          <div class="logbook">
              <h2>Driver's Daily Logbook</h2>
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

        
        const customFileName = `DriversLogbook_${new Date().toISOString()}.pdf`;
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

  return (
    <View style={styles.container} >
      <Button title="Generate and Share PDF" onPress={generateAndSharePDF} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestScreen;
