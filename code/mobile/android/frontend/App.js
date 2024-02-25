import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import SplashScreen from "./screens/SplashScreen";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import LogBookForm from "./forms/LogBookForm";
import BottomTabs from "./components/BottomTabs";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAppReady(true);
    }, 3000);
  }, []);

  if (!isAppReady) return <SplashScreen />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MainApp"
              component={BottomTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignupScreen" component={SignUpScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="LogBookForm" component={LogBookForm} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}
