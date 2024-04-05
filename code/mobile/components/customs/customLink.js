// React Imports
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// Start of the Build
export default function CustomLink({ onPress, children }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.forgotPasswordText}>{children}</Text>
    </TouchableOpacity>
  );
}

// Styles
const styles = StyleSheet.create({
  forgotPasswordText: {
    textAlign: "center",
    fontFamily: "Lora-Bold",
    color: "#0866FF",
    marginTop: 15,
    fontSize: 16,
  },
});
