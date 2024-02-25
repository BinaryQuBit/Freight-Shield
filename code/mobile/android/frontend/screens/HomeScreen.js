import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle, faUser, faMapMarkedAlt, faTruckLoading, faClock} from '@fortawesome/free-solid-svg-icons';

const ICON_SIZE = 20;

export default function HomeScreen() {

  const currentLoad = {
    pickupLocation: 'Regina, SK',
    dropLocation: 'Calgary, AB',
    shipperName: 'Real Canadian Superstore',
    workingDayHours: '8 hours', 
    workingWeekHours: '40 hours', 
  };

  const onCurrentLoadPress = () => {
    console.log('Current load pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Ali</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Current Load</Text>
        <TouchableOpacity style={styles.currentLoadContainer} onPress={onCurrentLoadPress} activeOpacity={0.7}>
          <FontAwesomeIcon icon={faInfoCircle} size={ICON_SIZE} style={styles.infoIcon} />
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon icon={faUser} size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.locationText}>Shipper: {currentLoad.shipperName}</Text>
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon icon={faMapMarkedAlt} size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.locationText}>Pickup: {currentLoad.pickupLocation}</Text>
          </View>
          <View style={styles.loadDetailRow}>
            <FontAwesomeIcon icon={faTruckLoading} size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.locationText}>Drop: {currentLoad.dropLocation}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subtitle}>Working Hours</Text>
        <View style={styles.workingHoursContainer}>
          <View style={styles.workingHoursDetail}>
            <FontAwesomeIcon icon={faClock} size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.workingHoursText}>Day: {currentLoad.workingDayHours}</Text>
          </View>
          <View style={styles.workingHoursDetail}>
            <FontAwesomeIcon icon={faClock} size={ICON_SIZE} style={styles.icon} />
            <Text style={styles.workingHoursText}>Week: {currentLoad.workingWeekHours}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0866FF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0866FF',
    textAlign: 'left',
    width: '100%',
    paddingLeft: 20,
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentLoadContainer: {
    backgroundColor: '#e8eaf6',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%', // Adjust width
  },
  loadDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  locationText: {
    fontSize: 18,
  },
  infoIcon: {
    color: '#3949ab',
    alignSelf: 'flex-end',
  },
  icon: {
    marginRight: 10,
  },
  workingHoursContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%', // Adjust width for consistency
  },
  workingHoursDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workingHoursText: {
    fontSize: 18,
    marginLeft: 5,
  },

});
