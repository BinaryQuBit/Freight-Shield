// React Imports
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

// Expo Import
import * as Font from "expo-font";

// Custom Imports
import LoadingScreen from "./screens/LoadingScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import NavBar from "./components/NavBar";
import LoadDetailsScreen from "./screens/LoadDetailsScreen";
import PreInspectionScreen from "./screens/PreInspectionScreen";
import WorkingHoursScreen from "./screens/WorkingHoursScreen";
import EditLogBookScreen from "./screens/EditLogBookScreen";

// Start of the Build
export default function App() {
  const Stack = createStackNavigator();

  // Hooks
  const [isAppReady, setIsAppReady] = useState(false);

  // Functions
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "Lora-Bold": require("./assets/fonts/Lora-Bold.ttf"),
        "Lora-BoldItalic": require("./assets/fonts/Lora-BoldItalic.ttf"),
        "Lora-Italic": require("./assets/fonts/Lora-Italic.ttf"),
        "Lora-Medium": require("./assets/fonts/Lora-Medium.ttf"),
        "Lora-MediumItalic": require("./assets/fonts/Lora-MediumItalic.ttf"),
        "Lora-Regular": require("./assets/fonts/Lora-Regular.ttf"),
        "Lora-SemiBold": require("./assets/fonts/Lora-SemiBold.ttf"),
        "Lora-SemiBoldItalic": require("./assets/fonts/Lora-SemiBoldItalic.ttf"),
      });
    }
    loadFonts();
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
  }, []);

  // Condition to Start the App
  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack.Navigator>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NavBar"
            component={NavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoadDetailsScreen"
            component={LoadDetailsScreen}
          />
          <Stack.Screen
            name="PreInspectionScreen"
            component={PreInspectionScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkingHoursScreen"
            component={WorkingHoursScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditLogBookScreen"
            component={EditLogBookScreen}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
