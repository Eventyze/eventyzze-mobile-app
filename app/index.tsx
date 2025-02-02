import React, { useState, useEffect } from 'react';
import SplashScreen from '../components/LandingPage/SplashScreen';
import Welcome from '../components/LandingPage/WelcomeScreen';
import { clearLocalStorage, getLocalStorageData } from '../services/axiosSetup/storage';
import Signup from './signup';
import Dashboard from './dashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../context/UserContext';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native';
import { redirectToLoginPage } from '../services/axiosSetup/axios';

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // useColorScheme('light');

  const { setUser, setIsAuthenticated } = useUser();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await getLocalStorageData('user');
  
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        console.warn('No user data found, but not clearing storage yet');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };
  

  useEffect( () => {
    // Hide the splash screen after a delay
    const timer = setTimeout(() => setIsSplashVisible(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  // Show a fallback loading state if needed
  // if (isLoading) {
  //   return (
  //       <SplashScreen />
  //   );
  // }

  return isSplashVisible ? <SplashScreen /> :  <Welcome />
};

export default App;
