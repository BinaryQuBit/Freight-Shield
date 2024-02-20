import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadDetails = ({ shipperName, pickupLocation, dropOffLocation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shipper Name: {shipperName}</Text>
      <Text style={styles.text}>Pickup Location: {pickupLocation}</Text>
      <Text style={styles.text}>Drop Off Location: {dropOffLocation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default LoadDetails;
