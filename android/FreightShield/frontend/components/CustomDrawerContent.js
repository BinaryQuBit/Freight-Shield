import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHandMiddleFinger } from '@fortawesome/free-solid-svg-icons';

const CustomDrawerContent = (props) => {

    const navigation = useNavigation();

  const handleLogout = () => {
   
    console.log('User logged out');
    props.navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userProfileContainer}>
            <Text style={styles.profileName}>Mohammed</Text>
        </View>
        <DrawerItemList {...props} />
       
      </DrawerContentScrollView>
      
      <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
          <FontAwesomeIcon icon={faHandMiddleFinger} size={24} color='white'/>
          <Text  style={styles.logoutText}>Logout</Text>
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
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'blue',
    borderRadius: 5,
    margin: 20,
  },
  logoutText: {
    color: '#fff', 
    fontSize: 18,
    marginLeft: 10, 
  },
  
});

export default CustomDrawerContent;
