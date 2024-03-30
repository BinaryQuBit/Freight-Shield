import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useTheme } from '../components/themeContext.js';
import { useNavigation } from '@react-navigation/native';

export default function PreInspectionScreen() {
  const { isDarkMode } = useTheme();
  const [checkedItems, setCheckedItems] = useState([
    { label: 'Air Brake System', checked: false },
    { label: 'Cab', checked: false },
    { label: 'Cargo Securement', checked: false },
    { label: 'Coupling Devices', checked: false },
    { label: 'Dangerous Goods', checked: false },
    { label: 'Driver Controls', checked: false },
    { label: 'Driver Seat', checked: false },
    { label: 'Electric Brake System', checked: false },
    { label: 'Emergency Equipment & Safety Equipment', checked: false },
    { label: 'Exhaust Systems', checked: false },
    { label: 'Frame Body', checked: false },
    { label: 'Fuel System', checked: false },
    { label: 'General', checked: false },
    { label: 'Glass & Mirrors', checked: false },
    { label: 'Heater / Defroster', checked: false },
    { label: 'Horn', checked: false },
    { label: 'Hydraulic Brake System', checked: false },
    { label: 'Lamps and Reflectors', checked: false },
    { label: 'Steering', checked: false },
    { label: 'Suspension System', checked: false },
    { label: 'Tires', checked: false },
    { label: 'Wheels, Hubs, & Fasteners', checked: false },
    { label: 'Windshields Wipers/Washer', checked: false },
  ]);
  const [defectDetails, setDefectDetails] = useState('');
  const navigation = useNavigation();

  const styles = getDynamicStyles(isDarkMode);

  const toggleCheckbox = (index) => {
    setCheckedItems(checkedItems.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = () => {
    // Here you can handle the submission, e.g., log to the console, send to an API, etc.
    const isAnyChecked = checkedItems.some(item => item.checked);
    
    if (isAnyChecked && !defectDetails.trim()) {
      Alert.alert("Missing Details", "Please provide details for the selected defect(s).");
      return; 
    }

    console.log('Submitted Items:', checkedItems);
    console.log('Defect Details:', defectDetails);

    navigation.goBack();

  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pre Inspection Form</Text>
      <Text style={styles.inputLabel}>Select defect(s):</Text>
      {checkedItems.map((item, index) => (
        <CheckBox
          key={index}
          title={item.label}
          checked={item.checked}
          onPress={() => toggleCheckbox(index)}
          containerStyle={styles.checkbox}
          textStyle={isDarkMode ? styles.checkboxLabelDark : styles.checkboxLabelLight}
        />
      ))}
      <Text style={styles.inputLabel}>Provide details of defect(s) detected:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDefectDetails}
        value={defectDetails}
        placeholder="Enter defect details"
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Pre-Inspection</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const getDynamicStyles = (isDarkMode) => StyleSheet.create({
   container: {
    padding: 10,
    backgroundColor: isDarkMode ? '#222' : '#F0F0F0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: isDarkMode ? '#FFD700' : '#007BFF', 
  },
  checkbox: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    marginVertical: 5,
  },
  inputLabel: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '600',
    color: isDarkMode ? '#FFF' : '#333', 
  },
  input: {
    borderWidth: 2,
    borderColor: isDarkMode ? '#888' : '#ccc',
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: isDarkMode ? '#444' : '#FFF',
    color: isDarkMode ? '#FFF' : '#333', 
  },
  submitButton: {
    backgroundColor: isDarkMode ? '#FFA07A' : '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxLabelDark: {
    color: '#FFF', 
    fontSize: 16, 
  },
  checkboxLabelLight: {
    color: '#000', 
    fontSize: 16, 
  },
});