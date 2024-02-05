import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawerContent = (props) => {
  const handleLogout = async () => {
    // Handle the logout logic
    // Remove the token from AsyncStorage
    try {
      await AsyncStorage.removeItem('token');
      //console.log('token removed');

      // Verify if the token has been removed
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
          console.log('Token successfully removed, user logged out');
      } else {
          console.log('Token not removed, user still logged in');
      }

    } catch(e) {
        // Error removing value
        console.log(e);
    }
    
    
    props.navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userProfileContainer}>
            <Text style={styles.profileName}>email</Text>
        </View>
        <DrawerItemList {...props} />
        {/* Additional components or items */}
      </DrawerContentScrollView>

      <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size={24} color='white'/>
          <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userProfileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#007bff', // Modern blue shade
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default CustomDrawerContent;
