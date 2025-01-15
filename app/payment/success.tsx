import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

export default function PaymentSuccess() {
  const params = useLocalSearchParams();
  const { planName, price } = params;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-4">
        {/* Success Icon */}
        <View className="w-20 h-20 rounded-full bg-[#00C853] items-center justify-center mb-4">
          <Ionicons name="checkmark-sharp" size={40} color="white" />
        </View>

        {/* Success Text */}
        <Text 
          className="text-2xl text-center mb-2"
          style={{ fontFamily: 'BarlowBold' }}
        >
          Success!
        </Text>

        {/* Success Message */}
        <Text 
          className="text-gray-600 text-center mb-8"
          style={{ fontFamily: 'BarlowRegular' }}
        >
          Hurray! The {planName} ({price}/month) plan was successfully activated. Payment was charged from your wallet.
        </Text>

        {/* Continue Button */}
        <View className="w-full px-4">
          <Button
            title="Continue"
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
            action={() => {
              // Navigate to dashboard or home screen
              router.push('/dashboard');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
} 