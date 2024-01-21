import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/AccountScreen';
import CurrentMapScreen from '../screens/CurrentMapScreen';
import CustomDrawerContent from './CustomDrawerContent';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import MyLoadScreen from '../screens/MyLoadsScreen';
import { faClock, faBook, faTruckLoading, faMapMarked, faUser, faGear, faHome, faMessage } from '@fortawesome/free-solid-svg-icons';
import LogBookScreen from '../screens/LogBookScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MessageScreen from '../screens/MessageScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function DrawerRoutes() {
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
            name="Settings" 
            component={SettingsScreen} 
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
            name="Message" 
            component={MessageScreen}
            options={{ headerTitleAlign: 'center',
            drawerLabel: ({ color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faMessage} color={color} size={24} />
                <Text style={{ color, marginLeft: 10 }}>Message</Text>
              </View>
            ), 
            }}
          />
          <Drawer.Screen 
            name="My Loads" 
            component={MyLoadScreen}
            options={{ headerTitleAlign: 'center',
            drawerLabel: ({ color }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faTruckLoading} color={color} size={24} />
                <Text style={{ color, marginLeft: 10 }}>My Loads</Text>
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
