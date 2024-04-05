// React Imports
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating Theme
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const loadThemePreference = async () => {
          try {
            const value = await AsyncStorage.getItem('isDarkMode');
            setIsDarkMode(value !== null ? JSON.parse(value) : false);
          } catch (e) {
            console.error(e);
          }
        };
    
        loadThemePreference();
      }, []);

  const toggleTheme = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
    } catch (e) {
      console.error(e);
    }
  };

  // Start of the Build
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
