import React, { useEffect, useRef } from "react";
import { Animated, TouchableOpacity, StyleSheet, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import LogBookScreen from "../screens/LogBookScreen2";
import SettingsScreen from "../screens/SettingsScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faBook, faCog } from "@fortawesome/free-solid-svg-icons";

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
    <TouchableOpacity
      onPress={onPress}
      style={styles.customButton}
      activeOpacity={0.7}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
      {!accessibilityState.selected && (
        <Text style={styles.tabBarText}>{children.props.name}</Text>
      )}
    </TouchableOpacity>
  );
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let icon;
          if (route.name === "Home") icon = faHome;
          else if (route.name === "LogBook") icon = faBook;
          else if (route.name === "Settings") icon = faCog;

          const iconColor = focused ? "#0866FF" : "gray";
          return (
            <FontAwesomeIcon
              icon={icon}
              size={focused ? size * 1.1 : size}
              color={iconColor}
            />
          );
        },
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarLabel: ({ focused }) => {
          return focused ? null : <Text>{route.name}</Text>;
        },
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      })}
    >
      <Tab.Screen name="LogBook" component={LogBookScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

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

export default BottomTabs;
