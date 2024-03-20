// React Hooks
import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

// Custom Import
import CustomButton from "../customs/customButton";

// Start of the Build
export default function OtpForm({ email }) {
  // Hooks
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(10 * 60);

  // Functions
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs[index + 1].focus();
    }
  };

  const inputs = [];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.infoText}>An Email with OTP was sent to:</Text>
      <Text style={styles.emailText}>{email}</Text>
      <Text style={[styles.infoText, { paddingTop: 10 }]}>Please Enter the OTP below:</Text>
      <Text style={styles.timerText}>Time Remaining: {formatTime()}</Text>
      <View style={styles.container}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpBox}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            value={digit}
            ref={(ref) => (inputs[index] = ref)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace" && index > 0) {
                inputs[index - 1].focus();
              }
            }}
          />
        ))}
      </View>
      <CustomButton
        children={"Verify"}
        // onPress={handleVerify}
        fs={16}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Lora-Bold",
    color: "#0866FF",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 45,
    textAlign: "center",
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 10,
    fontFamily: "Lora-Bold",
    backgroundColor: "#F0F0F7",
  },
  infoText: {
    textAlign: "center",
    color: "#333333",
    fontSize: 16,
    marginTop: 5,
    fontFamily: "Lora-Regular",
  },
  emailText: {
    textAlign: "center",
    color: "#007AFF",
    fontSize: 18,
    fontFamily: "Lora-Bold",
    marginTop: 5,
  },
  timerText: {
    textAlign: "center",
    color: "#FF0000",
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Lora-Regular",
  },
});

