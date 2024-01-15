import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './screens/MapScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/AccountScreen';
import CurrentMapScreen from './screens/CurrentMapScreen';
import CustomDrawerContent from './components/CustomDrawerContent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMapMarked } from '@fortawesome/free-solid-svg-icons';
import MyLoadScreen from './screens/MyLoadScreen';
import { faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import MyHourScreen from './screens/MyHourScreen';
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons';
import LogBookScreen from './screens/LogBookScreen';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          headerTitleAlign: 'center',
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faHome} color={color} size={24} />
              <Text style={{ color, marginLeft: 10 }}>Home</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen 
        name="Map Screen" 
        component={MapScreen} 
        options={{ headerTitleAlign: 'center', 
        drawerLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faMap} color={color} size={24} />
            <Text style={{ color, marginLeft: 10 }}>Map</Text>
          </View>
        ),}}/>
      <Drawer.Screen 
        name="Settings" 
        component={HomeScreen} 
        options={{ headerTitleAlign: 'center',
        drawerLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faGear} color={color} size={24} />
            <Text style={{ color, marginLeft: 10 }}>Settings</Text>
          </View>
        ), 
        }}/>
      <Drawer.Screen 
        name="Account" 
        component={LoginScreen}
        options={{ headerTitleAlign: 'center',
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faUser} color={color} size={24} />
              <Text style={{ color, marginLeft: 10 }}>Account</Text>
            </View>
          ), 
        }}
      />
      <Drawer.Screen 
        name="Current Map Screen" 
        component={CurrentMapScreen} 
        options={{ headerTitleAlign: 'center',
        drawerLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faMapMarked} color={color} size={24} />
            <Text style={{ color, marginLeft: 10 }}>Current Location</Text>
          </View>
        ), 
        }}
      />
      <Drawer.Screen 
        name="My Load" 
        component={MyLoadScreen}
        options={{ headerTitleAlign: 'center',
        drawerLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faTruckLoading} color={color} size={24} />
            <Text style={{ color, marginLeft: 10 }}>My Load</Text>
          </View>
        ), 
        }}
      />
      <Drawer.Screen 
        name="My Hours" 
        component={MyHourScreen}
        options={{ headerTitleAlign: 'center',
        drawerLabel: ({ color }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faClock} color={color} size={24} />
            <Text style={{ color, marginLeft: 10 }}>My Hours</Text>
          </View>
        ), 
        }}
      />
      <Drawer.Screen 
        name="LogBook" 
        component={LogBookScreen} 
        options={{ 
          headerTitleAlign: 'center',
          drawerLabel: ({ color }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faBook} color={color} size={24} />
              <Text style={{ color, marginLeft: 10 }}>LogBook</Text>
            </View>
          ),
        }}
      />

    </Drawer.Navigator>
  );
}

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
