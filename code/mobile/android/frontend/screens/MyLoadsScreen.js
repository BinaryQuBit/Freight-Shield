import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle, faUser, faMapMarkedAlt, faTruckLoading, faTruck, faMapMarkerAlt, faBoxOpen, faCalendarAlt, faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const ICON_SIZE = 20;

export default function MyLoadsScreen() {

    const [refreshing, setRefreshing] = React.useState(false);
    

  const currentLoad = {
    pickupLocation: 'Regina, SK',
    dropLocation: 'Calgary, AB',
    shipperName: 'Real Canadian Superstore',  
  };

  const pastLoads = [
    { id: '1', dropOffDate: '2023-12-05', dropLocation: 'Vancouver, BC' },
    { id: '2', dropOffDate: '2023-01-05', dropLocation: 'Winnipeg, MB' },
    { id: '3', dropOffDate: '2023-02-10', dropLocation: 'Toronto, ON' },
    { id: '4', dropOffDate: '2023-03-15', dropLocation: 'Montreal, QC' },
    { id: '5', dropOffDate: '2023-04-20', dropLocation: 'Calgary, AB' },
    { id: '6', dropOffDate: '2023-05-25', dropLocation: 'Halifax, NS' },
    { id: '7', dropOffDate: '2023-06-30', dropLocation: 'Saskatoon, SK' },
    
  ];
  

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch new loads here and update the state
    // For now, just simulate a fetch with a timeout
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const onCurrentLoadPress = () => {
   
    console.log('Current load pressed');
  };


  return (
    <View style={styles.container}>
        <Text style={styles.title}>Current Load</Text>

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

      <Text style={styles.title}>Past Loads</Text>
      <FlatList
        data={pastLoads}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.cardRow}>
                <FontAwesomeIcon icon={faCalendarAlt} size={ICON_SIZE} style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Drop Off Date: {item.dropOffDate}</Text>
                </View>
                <View style={styles.cardRow}>
                <FontAwesomeIcon icon={faLocationArrow} size={ICON_SIZE} style={styles.cardIcon} />
                <Text style={styles.cardContent}>Drop Location: {item.dropLocation}</Text>
                </View>
                
            </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoIcon: {
    color: '#3949ab', 
    alignSelf: 'flex-end',
  },
  currentLoadContainer: {
    backgroundColor: '#e8eaf6',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  currentLoadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center', 
  },
  currentLoadHeader: {
    backgroundColor: '#3949ab', 
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
    padding: 10,
  },
  currentLoadTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff', 
    textAlign: 'center', 
  },
  locationText: {
    fontSize: 20,
    marginBottom: 5,
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3949ab', 
  },
  card: {
    backgroundColor: '#ffffff', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5, 
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#333', 
  },
  icon: {
    marginRight: 10,
    alignSelf: 'center',
    marginBottom: 10,
    
  },
  cardIcon: {
    marginRight: 10,
    color: '#6200ee', 
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentLoadHeader: {
    backgroundColor: '#3949ab',
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15, 
    padding: 10, 
  },

});