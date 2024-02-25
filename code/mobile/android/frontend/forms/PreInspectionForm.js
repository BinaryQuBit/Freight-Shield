import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function PreInspectionForm() {
  const [checkedItems, setCheckedItems] = useState([
    { label: 'Engine Check', checked: false },
    { label: 'Tire Pressure', checked: false },
    { label: 'Brake Inspection', checked: false },
    { label: 'Lighting Test', checked: false },
  ]);

  const toggleCheckbox = (index) => {
    setCheckedItems(checkedItems.map((item, i) => 
      i === index ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pre Inspection Form</Text>
      {checkedItems.map((item, index) => (
        <CheckBox
          key={index}
          title={item.label}
          checked={item.checked}
          onPress={() => toggleCheckbox(index)}
          containerStyle={styles.checkbox}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
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
});
