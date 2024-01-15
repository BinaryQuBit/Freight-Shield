import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultLogBook = ({ timeLogs }) => {
  const formatTime = date => date ? date.toLocaleTimeString() : 'N/A';

  const calculateDuration = (start, end) => {
    return start && end ? ((end - start) / 60000).toFixed(2) : 'N/A'; // Convert to minutes and format
  };

  const inspectionDuration = calculateDuration(timeLogs.startInspection, timeLogs.endInspection);
  const drivingDuration = calculateDuration(timeLogs.startDrive, timeLogs.endDrive);
  const totalWorkTime = calculateDuration(timeLogs.wakeUpTime, timeLogs.endDrive);

  return (
    <View style={styles.container}>
      <Text>Inspection Start: {formatTime(timeLogs.startInspection)}</Text>
      <Text>Inspection Duration: {inspectionDuration} minutes</Text>
      <Text>Driving Start: {formatTime(timeLogs.startDrive)}</Text>
      <Text>Driving Duration: {drivingDuration} minutes</Text>
      <Text>Total Work Time: {totalWorkTime} minutes</Text>
      {/* Add more information as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // Additional styling
  },
  // Other styles
});

export default ResultLogBook;
