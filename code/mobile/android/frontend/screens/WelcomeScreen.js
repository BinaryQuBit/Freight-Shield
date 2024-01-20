import React, { useState, useRef } from 'react';
import { View, Text, Image, Button, StyleSheet, Animated,TouchableWithoutFeedback, Dimensions } from 'react-native';
import LoginForm from '../froms/LoginForm';
import ForgotPasswordForm from '../froms/ForgotPasswordForm';
import { useNavigation } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height;

export default function WelcomeScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(screenHeight)).current; // starting at screenHeight
  const [activeForm, setActiveForm] = useState('login'); // 'login' or 'forgotPassword'
  const logoAnimation = useRef(new Animated.Value(0)).current; // New animated value for the logo

  // Call this function when you want to navigate to the DrawerRoutes
    const navigateToDrawerRoutes = () => {
        navigation.reset({
        index: 0,
        routes: [{ name: 'Drawer' }],
        });
    };

  const showForgotPassword = () => {
    setActiveForm('forgotPassword');
  };

  const showLoginForm = () => {
    setActiveForm('login');
  };

  const slideUp = () => {
    
    Animated.timing(logoAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true // Set to true as we're only animating transforms and opacity
    }).start();
    
    setModalVisible(true);
  };

  const handlePressOutside = () => {
    // Call slideDown only if modal is visible
    Animated.timing(logoAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
    }).start();

    if (isModalVisible) {
      slideDown();
    }
  };

  const logoMarginTop = logoAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight / 3, 70] // Adjust values as needed
  });

  const slideDown = () => {
    // Will change translateY value back to screenHeight in 500ms
    Animated.timing(animation, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true // Set to true as we're only animating transforms and opacity
    }).start(() => setModalVisible(false));
  };



  return (
    <View style={styles.container}>
      <Animated.Image 
        source={require('../assets/Logo.png')} 
        style={[styles.logo, { marginTop: logoMarginTop }]} 
      />
      <Text style={styles.welcomeText}>Welcome, driver!</Text>
      {!isModalVisible && (
        <Button title="Slide to login" onPress={slideUp} />
      )}
      {isModalVisible && (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={styles.overlayStyle}>

            <Animated.View
              style={[
                styles.loginFormContainer,
                {
                  transform: [{ translateY: animation }],
                },
              ]}
            >
              {activeForm === 'login' ? (
                <LoginForm
                  onForgotPassword={showForgotPassword}
                />
              ) : (
                <ForgotPasswordForm onBackToLogin={showLoginForm} />
              )}
            </Animated.View>
            
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        
        backgroundColor: '#fff', // or any background color you prefer
      },
      logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333', // text color
      },
      buttonContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: '#f8f8f8', // button container background
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20, // rounded corners for the sliding panel
        borderTopRightRadius: 20,
        shadowColor: '#000', // shadow for the sliding panel
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      // If you're using a modal or another View for the login form, you may want to style it as well
      loginFormContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff', // modal background color
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20, // rounded corners for the login form
        borderTopRightRadius: 20,
        // Add shadow or elevation if you want to give depth to the login form
      },
      // Add more styles as needed
      overlayStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        
      },
});