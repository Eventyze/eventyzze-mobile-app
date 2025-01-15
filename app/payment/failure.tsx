import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

export default function PaymentFailure() {
  const params = useLocalSearchParams();
  const { planName, price } = params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        {/* Failure Icon */}
        <View className="w-20 h-20 rounded-full bg-[#FF3B30] items-center justify-center mb-4">
          <Ionicons name="close" size={40} color="white" />
        </View>

        {/* Failure Text */}
        <Text 
          className="text-[#FF3B30] text-2xl text-center mb-2"
          style={{ fontFamily: 'BarlowBold' }}
        >
          Payment failed!
        </Text>

        {/* Failure Message */}
        <Text 
          className="text-gray-600 text-center mb-8"
          style={{ fontFamily: 'BarlowRegular' }}
        >
          Something went wrong. Please check payment option and try again.
        </Text>

        {/* Retry Button */}
        <View className="w-full px-4">
          <Button
            title="Retry"
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
            action={() => {
              router.back(); // Go back to payment options
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 