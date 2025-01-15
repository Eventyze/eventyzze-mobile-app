import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function Closure() {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#FFFFFF', '#F5F5F5', '#EEEEEE']}
        className="flex-1 px-6 py-8"
      >
        <View className="flex-1">
          {/* Title */}
          <Text 
            className="text-3xl mb-6" 
            style={{ fontFamily: 'BarlowBold' }}
          >
            Eventyze
          </Text>

          {/* Images Container with Dotted Line */}
          <View className="relative flex-1 justify-center">
            {/* Dotted Line */}
            <View 
              className="absolute left-12 top-20 bottom-20"
              style={{
                borderStyle: 'dashed',
                borderWidth: 1,
                borderColor: '#666',
                height: '70%',
                width: 1,
              }}
            />

            {/* Images */}
            <View className="space-y-6">
              {/* Conference Image */}
              <View className="w-3/4 h-32 rounded-2xl overflow-hidden">
                <Image
                  source={require('../../assets/landingPage/landing-top-right-image.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Concert Image */}
              <View className="w-3/4 h-32 rounded-2xl overflow-hidden self-end">
                <Image
                  source={require('../../assets/landingPage/landing-top-right-image.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>

              {/* Interview Image */}
              <View className="w-3/4 h-32 rounded-2xl overflow-hidden">
                <Image
                  source={require('../../assets/landingPage/landing-top-right-image.png')}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Bottom Text and Button */}
          <View className="mt-8">
            <Text 
              className="text-3xl text-center mb-2"
              style={{ fontFamily: 'BarlowBold' }}
            >
              Experience a world{'\n'}
              of Entertainment!
            </Text>
            
            <Text 
              className="text-center text-gray-600 mb-8"
              style={{ fontFamily: 'BarlowRegular' }}
            >
              Stream and replay live{'\n'}
              events on eventyze
            </Text>

            <TouchableOpacity
              onPress={() => router.push('/signup')}
              className="w-full"
            >
              <LinearGradient
                colors={['#6B4BFF', '#FF8038']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-4 px-8 rounded-full"
              >
                <Text 
                  className="text-center text-white text-lg"
                  style={{ fontFamily: 'BarlowMedium' }}
                >
                  Sign up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}