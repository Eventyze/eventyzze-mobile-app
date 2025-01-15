import React, { useEffect, useRef } from "react";
import { View, Text, ImageBackground, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from "expo-router";
import LottieView from 'lottie-react-native';

export default function SignupRedirect() {
    const animation = useRef<LottieView>(null)

    useEffect(()=>{
      setTimeout(()=>{
        router.push('/dashboard')
      },5000)
    },[])

    return (
    <ImageBackground
      source={require('../../assets/profileRedirect/background.png')}
      style={{ flex: 1, height: '100%' }}
      resizeMode="cover"
    >
        <View className='absolute inset-0 bg-black/10'></View>

      {/* Safe area to ensure header like battery/time is visible */}
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View className="flex-1">
        <Animated.View className="flex-1 items-center justify-center mt-10"
        entering={FadeInDown.duration(300).springify()}
        >
          <Text className="text-white text-5xl"
          style={{fontFamily: "BarlowBold"}}
          >
            Eventyzze
          </Text>
        </Animated.View>
        <View className="">
        <Animated.View className='items-center justify-center'
        entering={FadeInDown.duration(300).springify()}>
           <LottieView
           ref={animation} 
           source={require('../../assets/profileRedirect/loading.json')}
           autoPlay={true}
           loop={true}
           style={{width: '30%', height: 100}}
           />
        </Animated.View>
        </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
    )
    
}

