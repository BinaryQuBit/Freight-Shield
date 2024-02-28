import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { API_BASE_URL } from "../components/ipConfig";

const INITIAL_FORM_DATA = {
  canadianCarrierCode: "",
  driverLicence: null,
  driverAbstract: null,
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

const CompanyDetailsRegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const scrollViewRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectFile = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      console.log(result);
      if (result.type === "cancel") {
        console.log("User cancelled the picker");
      } else {
        setFormData((prev) => ({ ...prev, [field]: result }));
      }
    } catch (error) {
      console.error("Error picking the document:", error);
    }
  };

  const handleSubmit = async () => {
    const url = `${API_BASE_URL}/api/companydetailsregister`;
    const data = new FormData();
    data.append("canadianCarrierCode", formData.canadianCarrierCode);

    if (formData.driverLicence && !formData.driverLicence.canceled) {
      const file = formData.driverLicence.assets[0];
      data.append("driverLicence", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    }

    if (formData.driverAbstract && !formData.driverAbstract.canceled) {
      const file = formData.driverAbstract.assets[0];
      data.append("driverAbstract", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    }
    console.log("Form Data", formData);
    try {
      const response = await axios.put(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Submission success:", response.data);
      navigation.navigate("Welcome");
    } catch (error) {
      console.error("Submission error:", error);
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
          <CustomTextInput
            placeholder="Canadian Carrier Code"
            value={formData.canadianCarrierCode}
            onChangeText={(text) =>
              handleInputChange("canadianCarrierCode", text)
            }
          />
          <CustomButton
            title="Upload Driver Licence"
            onPress={() => handleSelectFile("driverLicence")}
          />
          {formData.driverLicence && (
            <Text>File selected: {formData.driverLicence.assets[0].name}</Text>
          )}
          <CustomButton
            title=" Upload Driver Abstract"
            onPress={() => handleSelectFile("driverAbstract")}
          />
          {formData.driverAbstract && (
            <Text>File selected: {formData.driverAbstract.assets[0].name}</Text>
          )}
          <CustomButton title="Sign Up" onPress={handleSubmit} />
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
  navButton: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
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
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default CompanyDetailsRegisterScreen;
