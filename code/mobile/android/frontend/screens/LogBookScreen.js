import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import LoadDetails from './LoadDetails';
import DriverManual from './DriverManual';
import PreInspectionForm from '../forms/PreInspectionForm';
import MapView, { Polyline } from 'react-native-maps';
import { GOOGLE_MAPS_API_KEY } from '@env'; // Make sure to replace with your actual API key
import polyline from '@mapbox/polyline';
import ResultLogBook from './ResultLogBook';

export default function LogBookScreen() {
  const [stage, setStage] = useState('loadDetails');
  const [route, setRoute] = useState([]);
  const mapRef = useRef(null);
  const [timeLogs, setTimeLogs] = useState({
    wakeUpTime: new Date(), // Example, set the actual time as needed
    startInspection: null,
    endInspection: null,
    startDrive: null,
    endDrive: null,
    // Add more time-related states as needed
  });

  // Hardcoded for example purposes. Replace with actual geocoded locations.
  const pickupCoords = { latitude: 50.4452, longitude: -104.6189 }; // Regina, SK
  const dropOffCoords = { latitude: 51.0447, longitude: -114.0719 }; // Calgary, AB

  useEffect(() => {
    if (stage === 'mapView') {
      getDirections(pickupCoords, dropOffCoords);
    }
  }, [stage]);


  const handleStartInspection = () => {
    setTimeLogs({ ...timeLogs, startInspection: new Date() });
    setStage('inspection');
  };

  const handleCompleteInspection = () => {
    setTimeLogs({ ...timeLogs, endInspection: new Date() });
    setStage('mapView');
    // Any additional logic for completing the inspection
  };

  const handleDropComplete = () => {
    setTimeLogs({ ...timeLogs, endDrive: new Date() });
    setStage('resultLogBook');
  };

  const handleStartDrive = () => {
    // Logic for handling start drive action
    //Alert.alert('Drive Started', 'Your journey has begun.');
    setTimeLogs({ ...timeLogs, startDrive: new Date() });
    setStage('driving');
  };

  const getDirections = async (startLoc, destinationLoc) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc.latitude},${startLoc.longitude}&destination=${destinationLoc.latitude},${destinationLoc.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();
      const points = polyline.decode(json.routes[0].overview_polyline.points);
      const coords = points.map(point => ({ latitude: point[0], longitude: point[1] }));
      setRoute(coords);
      mapRef.current.fitToCoordinates(coords, { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 }, animated: true });
    } catch (error) {
      Alert.alert('Error', 'Failed to get directions.');
    }
  };

  return (
    <View style={styles.container}>
      {stage === 'loadDetails' && (
        <>
          <LoadDetails 
            shipperName="SuperStore" 
            pickupLocation="Regina, SK" 
            dropOffLocation="Calgary, AB"
          />
          <DriverManual />
          <Button title="Start Pre Inspection" onPress={handleStartInspection} />
        </>
      )}
      {stage === 'inspection' && (
        <>
          <PreInspectionForm />
          <Button title="Complete Inspection" onPress={handleCompleteInspection} />
        </>
      )}
      {stage === 'mapView' && (
        <>
            <MapView ref={mapRef} style={styles.mapContainer} initialRegion={{ ...pickupCoords, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
            <Polyline coordinates={route} strokeWidth={2} strokeColor="blue" />
            </MapView>
            <Button title="Start Drive" onPress={handleStartDrive} />
      </>
      )}
      {stage === 'driving' && (
        <Button title="Drop Complete" onPress={handleDropComplete} />
      )}
      {stage === 'resultLogBook' && (
        <ResultLogBook timeLogs={timeLogs} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 10,
  },
});
