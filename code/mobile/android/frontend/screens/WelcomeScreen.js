import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, Button,TouchableOpacity, StyleSheet, Animated,TouchableWithoutFeedback, Dimensions } from 'react-native';
import LoginForm from '../forms/LoginForm';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import SignupForm from '../forms/SignupForm';
import { useFocusEffect } from '@react-navigation/native';


const screenHeight = Dimensions.get('window').height;


export default function WelcomeScreen({ navigation}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const animation = useRef(new Animated.Value(screenHeight)).current; 
  const [activeForm, setActiveForm] = useState('login'); 
  const logoAnimation = useRef(new Animated.Value(0)).current; 
  //const [prefilledEmail, setPrefilledEmail] = useState('');
  
  useFocusEffect(
    React.useCallback(() => {
      // Reset form fields when screen is focused
      // Add any other states that need to be reset
      setModalVisible(false);
      handlePressOutside();
    }, [])
  );

  const showForgotPassword = () => {
    setActiveForm('forgotPassword');
  };

  const showLoginForm = () => {
    setActiveForm('login');
    //setPrefilledEmail(email); 
  };
  

  const slideUp = (formType) => {
    setActiveForm(formType); 
    
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start();
  
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  
    setModalVisible(true);
  };

  const handlePressOutside = () => {
    
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
    outputRange: [screenHeight / 4, 90] 
  });

  const slideDown = () => {
    
    Animated.timing(animation, {
      toValue: screenHeight,
      duration: 500,
      useNativeDriver: true 
    }).start(() => setModalVisible(false));
  };



  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.logoContainer, 
          { marginTop: logoMarginTop }
        ]}
      >
        <Animated.Image 
          source={require('../assets/Logo2.png')} 
          style={styles.logo} 
        />
        <Animated.Text style={styles.welcomeText}>Welcome, driver!</Animated.Text>
      </Animated.View>
      
      
      {!isModalVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.styledButton} onPress={() => slideUp('login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.styledButton} onPress={() => slideUp('signup')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
              {activeForm === 'login' && (
                  <LoginForm onForgotPassword={showForgotPassword} />
              )}
              {activeForm === 'forgotPassword' && (
                <ForgotPasswordForm onBackToLogin={showLoginForm} />
              )}
              {activeForm === 'signup' && (
                <SignupForm onSwitchToLogin={showLoginForm} />
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
      logoContainer: {
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', 
      },
      logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
      },
      welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333',
      },
      buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
      },
      styledButton: {
        backgroundColor: '#0866FF', 
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginVertical: 10,
        width: 200, 
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      loginFormContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff', 
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
        
      },
      
      overlayStyle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        
      },
});