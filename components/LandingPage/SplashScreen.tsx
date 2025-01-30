import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { router } from 'expo-router';

const SplashScreen = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
   const timer = setInterval(() => {
      setStage((prevStage) => prevStage + 1);
    }, 2500);
    if (stage === 3) {
      clearInterval(timer);
      setTimeout(() => router.replace('/'), 1000);
    }

    return () => clearInterval(timer);
  }, [stage]);

  return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      {stage < 2 && (
        <Animated.Text
          entering={ZoomIn.duration(1000)}
          className="text-[#c0a302] text-6xl font-bold"
          style={{fontFamily: "BarlowExtraBold"}}
          >
          {stage === 0 && 'Welcome'}
          {stage === 1 && 'To'}
        </Animated.Text>
      )}

      {stage === 2 && (
        <Animated.Image
          entering={ZoomIn.duration(1000)}
          source={require('../../assets/general/eventyzze-logo.png')}
          className="w-full h-80"
        />
      )}
    </SafeAreaView>
  );
};

export default SplashScreen;
