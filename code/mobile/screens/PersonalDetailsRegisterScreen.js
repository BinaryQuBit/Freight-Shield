import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from 'axios';
import { API_BASE_URL } from "../components/ipConfig";

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const CustomTextInput = ({ onChangeText, ...props }) => (
  <TextInput
    style={[styles.input, props.style]}
    onChangeText={onChangeText}
    {...props}
  />
);

const CustomButton = ({ title, onPress }) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    <Text style={styles.navButtonText}>{title}</Text>
  </TouchableOpacity>
);

const PersonalDetailsRegisterScreen = ({navigation}) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const scrollViewRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    const url = `${API_BASE_URL}/register`;
    try {
      const response = await axios.post(url, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: "driver"
      });
      if (response.status === 201) {
        navigation.navigate("CompanyDetailsRegisterScreen");
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingBottom: 50 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/Logo2.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.row}>
            <CustomTextInput
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange("firstName", text)}
            />
            <CustomTextInput
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange("lastName", text)}
            />
          </View>
          <CustomTextInput
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
          />
          <CustomTextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <CustomTextInput
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <CustomTextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          <View style={styles.buttonRow}>
            <CustomButton title="Back" onPress={() => navigation.navigate('Welcome')}  />
            <CustomButton title="Next" onPress={handleNext} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    flex: 1,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PersonalDetailsRegisterScreen;
