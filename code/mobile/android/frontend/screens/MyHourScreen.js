import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function MyHourScreen() {
  const totalHours = 18;
  const [workedHours, setWorkedHours] = useState('');
  const remainingHours = workedHours ? totalHours - parseInt(workedHours, 10) : totalHours;
  const remainingPercentage = (remainingHours / totalHours) * 100;
  
  // Calculate the color based on the percentage of hours left
  const getRemainingColor = (percentage) => {
    if (percentage > 50) return 'green';
    if (percentage > 25) return 'orange';
    return 'red';
  };

  return (
    <View style={styles.container}>
        <Text style={{margin: 7, fontSize: 40}}>Testing</Text>
      <View style={styles.inputContainer}>
        
        <Text style={styles.label}>Enter Worked Hours:</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={text => setWorkedHours(text)} 
          value={workedHours} 
          keyboardType="numeric" 
          placeholder="0"
          maxLength={2}
        />
      </View>
      <View style={[styles.circle, {borderColor: getRemainingColor(remainingPercentage)}]}>
        <Text style={styles.remainingHours}>{`${remainingHours}h left`}</Text>
      </View>
      <Text style={styles.percentage}>{`${remainingPercentage.toFixed(0)}%`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  },
  input: {
    width: 50,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: 'center',
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 300,
    borderWidth: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  remainingHours: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
