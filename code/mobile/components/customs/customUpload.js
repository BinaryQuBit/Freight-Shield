// React Imports
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

// Document Picker Import
import * as DocumentPicker from "expo-document-picker";

// Icon Import
import { Entypo } from "@expo/vector-icons";

// Start of the Build
export default function CustomUpload({
  label,
  required,
  onFileSelected,
  errorMessage,
}) {
  const [file, setFile] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: file || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [file, isFocused]);

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type !== "cancel") {
        setFile(result);
        setIsFocused(false);
        if (onFileSelected) {
          onFileSelected(result);
        }
      }
    } catch (error) {
      console.error("Error picking the document:", error);
    }
  };

  const handleCancelFile = () => {
    setFile(null);
    setIsFocused(false);
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
    color: isFocused || file ? "#0866FF" : "grey",
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
      <TouchableOpacity
        onPress={file ? handleCancelFile : handleSelectFile}
        style={styles.uploadButton}
      >
        <View style={styles.iconContainer}>
          {file ? (
            <>
              <Text style={styles.textStyle}>{file.assets[0].name}</Text>
              <Entypo
                name="cross"
                size={24}
                color="#0866FF"
                style={styles.iconStyle}
              />
            </>
          ) : (
            <Entypo
              name="upload"
              size={24}
              color="#0866FF"
              style={styles.iconStyle}
            />
          )}
        </View>
      </TouchableOpacity>
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
  uploadButton: {
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "#0866FF",
    borderWidth: 1,
    fontFamily: "Lora-Regular",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  requiredAsterisk: {
    color: "red",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    height: 40,
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    color: "grey",
    fontFamily: "Lora-Regular",
    flex: 1,
  },
  iconStyle: {
    marginLeft: 10,
  },
  error: {
    color: "red",
    paddingLeft: 10,
    fontFamily: "Lora-Regular",
  },
});
