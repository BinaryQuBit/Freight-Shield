import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DriverManual = () => {
  
  return (
    <View style={styles.container}>
      <Text>Driver Manual Content Goes Here</Text>
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
});

export default DriverManual;
