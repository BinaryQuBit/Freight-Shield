import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faSave, faUserCircle, faEnvelope, faLock, faPhone, faCar } from '@fortawesome/free-solid-svg-icons';

export default function AccountScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState({
    email: 'Amandip@example.com',
    firstName: 'Amandip',
    lastName: 'Padda',
    phoneNumber: '123-456-7890',
    emergencyContactName: 'Alok Paranjape',
    emergencyContactNumber: '987-654-3210',
    carModel: 'Mercedes-Benz OM 364',
    carPlate: 'ABC 1234',
  });
  
  const [editableFields, setEditableFields] = useState({
    email: false,
    firstName: false,
    lastName: false,
    phoneNumber: false,
    emergencyContactName: false,
    emergencyContactNumber: false,
    carModel: false,
    carPlate: false,
  });

  const inputRefs = {
    email: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
    phoneNumber: useRef(null),
    emergencyContactName: useRef(null),
    emergencyContactNumber: useRef(null),
    carModel: useRef(null),
    carPlate: useRef(null),
  };

  const handleChange = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  const toggleEdit = (field) => {
    // First update the editability state
    setEditableFields({ ...editableFields, [field]: !editableFields[field] });
  };

  const iconMap = {
    email: faEnvelope,
    firstName: faUserCircle,
    lastName: faUserCircle,
    phoneNumber: faPhone,
    emergencyContactName: faUserCircle,
    emergencyContactNumber: faPhone,
    carModel: faCar,
    carPlate: faCar,
  };

  useEffect(() => {
    // Focus the input when its editability is enabled
    Object.entries(editableFields).forEach(([key, isEditable]) => {
      if (isEditable) {
        inputRefs[key].current.focus();
      }
    });
  }, [editableFields]);

  const sectionMap = {
    UserInformation: ['email', 'firstName', 'lastName', 'phoneNumber'],
    EmergencyContact: ['emergencyContactName', 'emergencyContactNumber'],
    CarInformation: ['carModel', 'carPlate'],
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.entries(sectionMap).map(([section, fields]) => (
        <View key={section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.replace(/([A-Z])/g, ' $1')}</Text>
          {fields.map((field) => (
            <View key={field} style={styles.infoRow}>
              <FontAwesomeIcon icon={iconMap[field]} size={20} style={styles.icon} />
              <TextInput
                ref={inputRefs[field]}
                style={styles.input}
                onChangeText={(text) => handleChange(field, text)}
                value={userInfo[field]}
                editable={editableFields[field]}
                placeholder={field.replace(/([A-Z])/g, ' $1')}
              />
              <TouchableOpacity onPress={() => toggleEdit(field)}>
                <FontAwesomeIcon icon={editableFields[field] ? faSave : faEdit} size={20} style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HelpSupport')}>
        <Text style={styles.buttonText}>Help & Support</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start', // This will now work correctly
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  icon: {
    color: '#007bff',
    marginRight: 10,
  },
  editIcon: {
    color: '#007bff',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
