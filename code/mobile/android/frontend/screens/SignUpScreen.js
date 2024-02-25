import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const SignUpScreen = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    carrierCode: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    driverLicense: null,
    driverAbstract: null,
  });

  const handleSelectFile = async (field) => {
    console.log(field);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Canadian Carrier Code"
        value={formData.carrierCode}
        onChangeText={(text) => setFormData({ ...formData, carrierCode: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        secureTextEntry={true}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        secureTextEntry={true}
        onChangeText={(text) =>
          setFormData({ ...formData, confirmPassword: text })
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
      />
      <TouchableOpacity
        style={styles.fileInput}
        onPress={() => handleSelectFile("driverLicense")}
      >
        <Text>Select Driver License (Image/PDF/Word)</Text>
      </TouchableOpacity>
      {formData.driverLicense && (
        <Text>File selected: {formData.driverLicense.name}</Text>
      )}
      <TouchableOpacity
        style={styles.fileInput}
        onPress={() => handleSelectFile("driverAbstract")}
      >
        <Text>Select Commercial Driver Abstract (Image/PDF/Word)</Text>
      </TouchableOpacity>
      {formData.driverAbstract && (
        <Text>File selected: {formData.driverAbstract.name}</Text>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  fileInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
  },
});

export default SignUpScreen;
