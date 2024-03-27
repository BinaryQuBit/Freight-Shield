import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button,TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function PreInspectionScreen() {
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

  const toggleCheckbox = (index) => {
    setCheckedItems(checkedItems.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = () => {
    // Here you can handle the submission, e.g., log to the console, send to an API, etc.
    console.log('Submitted Items:', checkedItems);
    console.log('Defect Details:', defectDetails);
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

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    checkbox: {
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    inputLabel: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
    submitButton: {
      backgroundColor: '#007bff', 
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginVertical: 10, 
      marginBottom: 30, 
    },
    submitButtonText: {
      color: '#ffffff', 
      fontSize: 16,
      fontWeight: 'bold',
    },
});