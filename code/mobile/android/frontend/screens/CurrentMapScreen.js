import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const CurrentMapScreen = () => {
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { latitude, longitude } = location.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : region ? (
        <MapView style={{ flex: 1 }} initialRegion={region}>
          <Marker coordinate={region}>
            <FontAwesomeIcon icon={faHandMiddleFinger} size={30} color='red'/>
            </Marker>
        </MapView>
      ) : null}
    </View>
  );
};

export default CurrentMapScreen;