import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#ffffff', // You can change the background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3949ab', // Change the color to suit your theme
    textAlign: 'center', // Ensure text is centered
  },
});
