import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { router } from 'expo-router';

const SplashScreen = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Increment the stage at intervals to control the text and logo animations
    const timer = setInterval(() => {
      setStage((prevStage) => prevStage + 1);
    }, 2500); // 2 seconds for each stage to ensure smooth transitions

    // Clear the interval and navigate to the landing page after the animations
    if (stage === 3) {
      clearInterval(timer);
      setTimeout(() => router.replace('/'), 1000); // Replace with Welcome page
    }

    return () => clearInterval(timer);
  }, [stage]);

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      {/* Zoom in each text sequentially */}
      {stage < 2 && (
        <Animated.Text
          entering={ZoomIn.duration(1000)} // Smooth zoom-in animation
          className="text-[#c0a302] text-6xl font-bold"
          style={{fontFamily: "BarlowExtraBold"}}
          >
          {stage === 0 && 'Welcome'}
          {stage === 1 && 'To'}
          {/* {stage === 2 && 'Eventyze'} */}
        </Animated.Text>
      )}

      {/* Zoom in the logo after the texts */}
      {stage === 2 && (
        <Animated.Image
          entering={ZoomIn.duration(1000)} // Smooth zoom-in animation for the logo
          source={require('../../assets/general/eventyze-logo.png')}
          className="w-full h-80"
        />
      )}
    </SafeAreaView>
  );
};

export default SplashScreen;
