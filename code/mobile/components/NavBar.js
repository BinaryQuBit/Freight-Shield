// React Imports
import React, { useEffect, useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "../components/themeContext.js";
// React Icons
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faBook,
  faCog,
  // faMap,
  // faCloudSunRain,
} from "@fortawesome/free-solid-svg-icons";

// Custom Imports
import HomeScreen from "../screens/HomeScreen";
import LogBookScreen from "../screens/LogbookScreen";
import SettingsScreen from "../screens/SettingScreen";
// Import commented out screens as needed
// import MapScreen from "../screens/MapScreen";
// import WeatherScreen from "../screens/WeatherScreen";

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress, accessibilityState }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: accessibilityState.selected ? 1.5 : 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, [accessibilityState.selected, scale]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.customButton} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
      {!accessibilityState.selected && <Text style={styles.tabBarText}>{children.props.name}</Text>}
    </TouchableOpacity>
  );
};

export default function NavBar() {
  // Automatically detects and returns the current color scheme ('light' or 'dark')
  const { isDarkMode } = useTheme();

  const dynamicStyles = StyleSheet.create({
    tabBar: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 0,
      backgroundColor: isDarkMode ? "#333" : "#f8f9fa",
      borderTopColor: isDarkMode ? "#555" : "#dedede", 
      borderTopWidth: 1, 
      height: 60,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowColor: isDarkMode === "dark" ? "#FFF" : "#000",
      shadowOffset: { height: -5, width: 0 },
    },
    tabBarText: {
      fontSize: 13,
      textAlign: "center",
      color: isDarkMode ? "#FFF" : "#000",
    },
    customButton: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "Home") icon = faHome;
          else if (route.name === "LogBook") icon = faBook;
          else if (route.name === "Settings") icon = faCog;
          // Add other icons as needed

          const iconColor = focused ? "#0866FF" : isDarkMode === "dark" ? "#FFF" : "gray";
          return <FontAwesomeIcon icon={icon} size={focused ? 24 : 20} color={iconColor} />;
        },
        tabBarStyle: dynamicStyles.tabBar,
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          return focused ? null : <Text style={dynamicStyles.tabBarText}>{route.name}</Text>;
        },
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      })}
    >
      <Tab.Screen name="LogBook" component={LogBookScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {/* Uncomment and add other screens as needed */}
      {/* <Tab.Screen name="Map" component={MapScreen} /> */}
      {/* <Tab.Screen name="Weather" component={WeatherScreen} /> */}
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    backgroundColor: "#f8f9fa",
    borderTopColor: "transparent",
    height: 60,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { height: -5, width: 0 },
  },
  customButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarText: {
    fontSize: 10,
    textAlign: "center",
  },
});
