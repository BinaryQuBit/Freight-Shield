import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env';
import polyline from '@mapbox/polyline';

export default function MapScreen() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [points, setPoints] = useState([]);
  const mapRef = useRef(null);

  const getRoute = async () => {
    if (origin && destination) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        const points = polyline.decode(data.routes[0].overview_polyline.points);
        const coords = points.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));
        setPoints(coords);
        mapRef.current?.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
      } catch (error) {
        Alert.alert("Error", "Unable to fetch route");
      }
    } else {
      Alert.alert("Missing Information", "Please select both pickup and drop-off locations.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder='Pickup Location'
         
          styles={autocompleteStyles}
        />
      </View>
      
      <View style={styles.autocompleteContainer}>
        <GooglePlacesAutocomplete
          placeholder='Drop-off Location'
      
          styles={autocompleteStyles}
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button title="Show Directions" onPress={getRoute} />
      </View>
      
      <MapView
        ref={mapRef}
        style={styles.mapContainer}
       
      >
        {points.length > 0 && (
          <Polyline coordinates={points} strokeWidth={2} strokeColor="blue" />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  autocompleteContainer: {
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    zIndex: 5,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  mapContainer: {
    flex: 1,
    zIndex: 1,
  },
  
});


const autocompleteStyles = {
    textInput: {
        height: 38,
        color: '#5d5d5d',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 5,
    },
    predefinedPlacesDescription: {
        color: '#1faadb',
    },
    container: {
        backgroundColor: 'white',
       
    },
    listView: {
        position: 'absolute',
        top: 60,
        backgroundColor: 'white',
        zIndex: 20,
    },
    description: {
        color: 'black',
    },
    separator: {
        backgroundColor: 'lightgrey',
    },
};

