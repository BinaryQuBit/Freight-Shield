import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import DrawerRoutes from './components/DrawerRoutes';
import LogBookForm from './forms/LogBookForm';



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();



export default function App() {

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 3000); // Show SplashScreen for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    
    <Provider store={store}>

      
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="Drawer" component={DrawerRoutes} options={{ headerShown: false, gestureEnabled: false }} />
              <Stack.Screen name="LogBookForm" component={LogBookForm} />
              
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
        
      
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
