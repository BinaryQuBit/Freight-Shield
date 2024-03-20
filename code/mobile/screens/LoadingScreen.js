// React Imports
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

// Custom Imports
import Logo from "../components/logo.js";

// Start of Build
export default function LoadingScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

// Functions
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Logo width="300" height="300" color="#FFFFFF" />
      </Animated.View>
    </View>
  );
}

// Style Sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#0866FF",
  },
  logoContainer: {
    alignItems: "center",
  },
});
