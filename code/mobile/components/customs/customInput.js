// React Imports
import React, { useState, useEffect } from "react";
import {
  Animated,
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Expo Import
import { Ionicons } from "@expo/vector-icons";

// Start of the Build
export default function CustomInput({
  value,
  onChangeText,
  keyboardType,
  autoCapitalize,
  errorMessage,
  label,
  required,
  secureTextEntry,
}) {
  // Hooks
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const labelPosition = useState(new Animated.Value(value ? 1 : 0))[0];

  // Functions
  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: value ? 1 : isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(labelPosition, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Dynamic Styles
  const labelStyle = {
    fontFamily: "Lora-Regular",
    position: "absolute",
    left: 10,
    top: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: labelPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isFocused || value ? "#0866FF" : "grey",
    backgroundColor: "transparent",
  };

  return (
    <View style={styles.container}>
      <Animated.View>
        <Animated.Text style={labelStyle}>
          {label}
          {required && <Text style={styles.requiredAsterisk}> *</Text>}
        </Animated.Text>
      </Animated.View>
      <TextInput
        value={value}
        style={styles.inputField}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={!isPasswordVisible}
      />
      {secureTextEntry && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={
            errorMessage
              ? styles.visibilityToggleWithError
              : styles.visibilityToggle
          }
        >
          {isPasswordVisible ? (
            <Ionicons name="eye" size={24} color="grey" />
          ) : (
            <Ionicons name="eye-off" size={24} color="grey" />
          )}
        </TouchableOpacity>
      )}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
  },
  inputField: {
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderColor: "#0866FF",
    borderWidth: 1,
    fontFamily: "Lora-Regular",
    width: '100%',
  },
  error: {
    color: "red",
    paddingLeft: 10,
    fontFamily: "Lora-Regular",
  },
  requiredAsterisk: {
    color: "red",
  },
  visibilityToggle: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  visibilityToggleWithError: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -22 }],
  },
});
