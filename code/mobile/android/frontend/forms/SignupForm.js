import React, { useState } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const SignupForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dotNumber, setDotNumber] = useState("");
    const navigation = useNavigation();

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            Alert.alert("Signup Failed", "Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://142.3.84.67:8080/api/users/signup", { email, password, dotNumber });

            if (response.status === 201) {
                Alert.alert("Signup Successful", "You can now login with your new account.");
                navigation.navigate("Login");
            }
        } catch (error) {
            Alert.alert("Signup Failed", "Please check your details and try again.");
        }
    };

    return (
        <View style={styles.formContainer}>
            <TextInput
                placeholder="DOT Number"
                onChangeText={setDotNumber}
                value={dotNumber}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                style={styles.input}
            />
            
            <TouchableOpacity onPress={handleSignup} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
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
    input: {
        width: "100%",
        height: 40,
        marginVertical: 10,
        paddingLeft: 10,
        borderRadius: 5,
        borderColor: "blue",
        borderWidth: 1,
    },
    button: {
        width: "100%",
        height: 40,
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default SignupForm;