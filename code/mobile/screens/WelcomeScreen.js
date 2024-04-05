// React Imports
import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";

// Custom Imports
import Logo from "../components/logo.js";
import CustomButton from "../components/customs/customButton.js";
import CustomModal from "../components/customs/customModal.js";
import LoginForm from "../components/forms/loginForm.js";
import RegisterFormStep1 from "../components/forms/registerFormStep1.js";
import { DynamicLogo } from "../components/responsiveness/dynamicLogo.js";
import KeyboardVisibility from "../components/responsiveness/keyboardVisibility";

// Start of the Build
export default function WelcomeScreen() {
  // Hooks
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const keyboardVisible = KeyboardVisibility();

  const isLoginModalVisible = loginModalVisible;
  const isRegisterModalVisible = registerModalVisible;
  const modalVisibility = isLoginModalVisible
    ? { visible: isLoginModalVisible, multiplier: 0 }
    : { visible: isRegisterModalVisible, multiplier: 0.45 };
  const marginTopValue = DynamicLogo(
    modalVisibility.visible,
    modalVisibility.multiplier
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={[{ marginTop: marginTopValue }]}>
        {!keyboardVisible && <Logo color="#0866FF" />}
      </View>
      <View>
        {!keyboardVisible && (
          <>
            <CustomButton
              onPress={() => setLoginModalVisible(true)}
              children={"Login"}
              mt={100}
              br={25}
              pH={30}
              fs={16}
            />
            <CustomButton
              onPress={() => setRegisterModalVisible(true)}
              children={"Register"}
              mt={30}
              br={25}
              pH={30}
              fs={16}
            />
          </>
        )}
        <CustomModal
          modalVisible={loginModalVisible}
          setModalVisible={setLoginModalVisible}
          children={<LoginForm />}
          animationType={"slide"}
        />
        <CustomModal
          modalVisible={registerModalVisible}
          setModalVisible={setRegisterModalVisible}
          children={
            <RegisterFormStep1
              closeRegister1={() => setRegisterModalVisible(false)}
            />
          }
          animationType={"slide"}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
