//PREVENT USERS FROM GOING EVEN THOUGH THEY PRESS BACK KEY
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Alert } from 'react-native';
import { useCallback } from 'react';


useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to go back?', [
          { text: 'Cancel', onPress: () => null, style: 'cancel' },
          { text: 'Yes', onPress: () => navigation.goBack() },
        ]);
        return true; // Prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const onBackPress = () => {
    return true; // Block back button entirely
  };