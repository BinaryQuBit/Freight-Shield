// React Imports
import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

// Start of the Build
export default function CustomButton({ children, onPress, mt, br, pH, fs }) {
  // Dynamic Styles
  const buttonStyle = {
    ...styles.button,
    marginTop: mt,
    borderRadius: br,
    paddingHorizontal: pH,
  };

  return (
    <TouchableOpacity style={buttonStyle} marginTop={mt}>
      <Text style={styles.buttonText} fontSize={fs} onPress={onPress}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0866FF",
    paddingVertical: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Lora-SemiBold",
    textAlign: "center",
  },
});
