import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const ForgotPasswordForm = ({ onBackToLogin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput style={styles.input} placeholder="Enter your email" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          /* handle password reset */
        }}
      >
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackToLogin}>
        <Text style={styles.backLogin}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
  backLogin: {
    color: "blue",
  },
  input: {
    width: "100%",
    height: 40,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    color: "white",
    height: 40,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Text color
  },
});

export default ForgotPasswordForm;
