import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

const ipConfig = process.env.REACT_IP_CONFIG;

export default function MapScreen() {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    const fetchLogbook = async () => {
      const date = new Date();
      
      try {
        const response = await axios.get(`${ipConfig}/api/savepdf`);
      } catch (error) {
        console.error('Failed to fetch logbook:', error);
      }
    };

    fetchLogbook();
  }, [isFocused]);

  return (
    <View>
      <Text>MapScreen</Text>
    </View>
  );
}
