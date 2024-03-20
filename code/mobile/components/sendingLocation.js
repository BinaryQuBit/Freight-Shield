import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

export default function SendingLocation({ load_id }) {
  const ipConfig = process.env.REACT_IP_CONFIG;

  const fetchAndSendLocation = async () => {
    if (!load_id) {
      console.error("No load_id provided");
      return;
    }

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.error("Permission to access location was denied");
      return;
    }

    try {
      let { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      
      
      await axios.put(`${ipConfig}/api/sendinglocation`, { load_id, latitude, longitude });
    } catch (error) {
      console.error("Error during location fetch or send:", error);
    }
  };

  useEffect(() => {
    const locationInterval = setInterval(fetchAndSendLocation, 30000);
    return () => clearInterval(locationInterval);
  }, [load_id]);

  return null;
}


