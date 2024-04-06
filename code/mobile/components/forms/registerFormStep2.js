// React Imports
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Alert } from "react-native";

// Axios Imports
import axios from "axios";

// Custom Imports
import { EmptyValidation } from "../validation/emptyValidation";
import { DocumentValidation } from "../validation/documentValidation";
import { PhoneNumberValidation } from "../validation/phoneNumberValidation";
import CustomInput from "../customs/customInput";
import CustomButton from "../customs/customButton";
import CustomUpload from "../customs/customUpload";

// Start of the Build
export default function RegisterFormStep2({ closeModal }) {
  const ipConfig = "https://freightshield.ca";
  axios.defaults.withCredentials = true;
  const navigation = useNavigation();

  // Hooks
  const [phoneNumber, setPhoneNumber] = useState("");
  const [canadianCarrierCode, setCanadianCarrierCode] = useState("");
  const [driverLicenceFront, setDriverLicenceFront] = useState("");
  const [driverLicenceBack, setDriverLicenceBack] = useState("");
  const [driverAbstract, setDriverAbstract] = useState("");

  // Error Hooks
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [canadianCarrierCodeError, setCanadianCarrierCodeError] = useState("");
  const [driverLicenceFrontError, setDriverLicenceFrontError] = useState("");
  const [driverLicenceBackError, setDriverLicenceBackError] = useState("");
  const [driverAbstractError, setDriverAbstractError] = useState("");

  const handleRegisterStep2 = async (event) => {
    event.preventDefault();

    // Reset Error Hooks
    setPhoneNumberError("");
    setCanadianCarrierCodeError("");
    setDriverLicenceFrontError("");
    setDriverLicenceBackError("");
    setDriverAbstractError("");

    // Validation Checks
    const phoneNumberError = PhoneNumberValidation(phoneNumber);
    const canadianCarrierCodeError = EmptyValidation(
      "Canadian Carrier Code",
      canadianCarrierCode
    );
    const driverLicenceFrontError = DocumentValidation(
      "Driver Licence (Front)",
      driverLicenceFront
    );
    const driverLicenceBackError = DocumentValidation(
      "Driver Licence (Back)",
      driverLicenceBack
    );
    const driverAbstractError = DocumentValidation(
      "Driver Abstract",
      driverAbstract
    );

    // Set Error
    setPhoneNumberError(phoneNumberError);
    setCanadianCarrierCodeError(canadianCarrierCodeError);
    setDriverLicenceFrontError(driverLicenceFrontError);
    setDriverLicenceBackError(driverLicenceBackError);
    setDriverAbstractError(driverAbstractError);

    // Produce Error
    if (
      phoneNumberError ||
      canadianCarrierCodeError ||
      driverLicenceFrontError ||
      driverLicenceBackError ||
      driverAbstractError
    ) {
      return;
    }

    // Form Data
    const form = new FormData();
    form.append("phoneNumber", phoneNumber);
    form.append("canadianCarrierCode", canadianCarrierCode);
    if (driverLicenceFront) {
      const file = driverLicenceFront.assets[0];
      form.append("driverLicenceFront", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    }
    if (driverLicenceBack) {
      const file = driverLicenceBack.assets[0];
      form.append("driverLicenceBack", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    }
    if (driverAbstract) {
      const file = driverAbstract.assets[0];
      form.append("driverAbstract", {
        uri: file.uri,
        type: file.mimeType,
        name: file.name,
      });
    }

    // Start of POST Method
    try {
      const registerResponse = await axios.put(
        `${ipConfig}/api/register`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (registerResponse.status === 201) {
        closeModal();
        navigation.navigate("WelcomeScreen");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
    }
  };
  return (
    <>
      <Text style={styles.title}>Driver Information</Text>
      <CustomInput
        label="Phone Number"
        required={true}
        value={phoneNumber}
        onChangeText={(newPhoneNumber) => {
          setPhoneNumber(newPhoneNumber);
          setPhoneNumberError("");
        }}
        keyboardType="phone-pad"
        errorMessage={phoneNumberError}
      />
      <CustomInput
        label="Canadian Carrier Code"
        required={true}
        value={canadianCarrierCode}
        onChangeText={(newCanadianCarrierCode) => {
          setCanadianCarrierCode(newCanadianCarrierCode);
          setCanadianCarrierCodeError("");
        }}
        keyboardType="default"
        autoCapitalize="characters"
        errorMessage={canadianCarrierCodeError}
      />
      <CustomUpload
        label="Driver Licence (Front)"
        required={true}
        errorMessage={driverLicenceFrontError}
        onFileSelected={(file) => {
          setDriverLicenceFront(file);
          setDriverLicenceFrontError("");
        }}
      />
      <CustomUpload
        label="Driver Licence (Back)"
        required={true}
        errorMessage={driverLicenceBackError}
        onFileSelected={(file) => {
          setDriverLicenceBack(file);
          setDriverLicenceBackError("");
        }}
      />
      <CustomUpload
        label="Driver Abstract"
        required={true}
        errorMessage={driverAbstractError}
        onFileSelected={(file) => {
          setDriverAbstract(file);
          setDriverAbstractError("");
        }}
      />
      <CustomButton
        onPress={handleRegisterStep2}
        children={"Submit"}
        pH={30}
        fs={16}
      />
    </>
  );
}

// Styles
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora-Bold",
    color: "#0866FF",
  },
});
