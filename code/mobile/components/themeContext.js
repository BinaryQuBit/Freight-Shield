import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a context
const ThemeContext = createContext();

// Use this hook to access theme in any component
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from AsyncStorage
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

  // Toggle theme mode and save preference to AsyncStorage
  const toggleTheme = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
