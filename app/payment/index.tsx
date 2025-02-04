import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as Linking from "expo-linking";

// Payment options data
const paymentOptions = [
  {
    id: 1,
    name: 'My Wallet',
    icon: 'wallet-outline',
    balance: 1000,
    description: 'Pay with your wallet balance',
  },
  // {
  //   id: 2,
  //   name: 'Bank Transfer',
  //   icon: 'card-outline',
  //   description: 'Direct bank transfer',
  // },
  {
    id: 2,
    name: 'Pay with card',
    icon: 'cash-outline',
    description: 'Pay with card via Paystack',
  },
];

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get plan details from route params
  const params = useLocalSearchParams();
  const { planName, price } = params;

  const handlePayment = async () => {
    if (!selectedOption) return;

    setIsProcessing(true);
    try {
      console.log(selectedOption)
      if(selectedOption === 2){
        const response = await axios.post("https://your-backend.com/api/payments", {
          amount: 5000, // Example amount
          currency: "NGN",
          email: "user@example.com",
      });

      if (response.data.payment_url) {
          Linking.openURL(response.data.payment_url); // Open Flutterwave page
      }
      }
    } catch (error) {
      // If failed, navigate to failure screen
      router.push({
        pathname: '/payment/failure',
        params: {
          planName,
          price,
        }
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-4 py-6 flex-row mt-10 items-center border-b border-gray-100">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl" style={{ fontFamily: 'BarlowBold' }}>
          Choose payment option
        </Text>
      </View>

      {/* Payment Options */}
      <View className="flex-1 px-4 pt-4">
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            onPress={() => setSelectedOption(option.id)}
            className={`mb-4 p-4 rounded-xl border ${
              selectedOption === option.id 
                ? 'border-[#FF8038] bg-orange-50' 
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                <Ionicons 
                  name={option.icon as any} 
                  size={20} 
                  color={selectedOption === option.id ? '#FF8038' : '#666'} 
                />
              </View>
              <View className="ml-3 flex-1">
                <Text 
                  className="text-base" 
                  style={{ 
                    fontFamily: 'BarlowBold',
                    color: selectedOption === option.id ? '#FF8038' : '#000'
                  }}
                >
                  {option.name}
                </Text>
                <Text 
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'BarlowRegular' }}
                >
                  {option.description}
                </Text>
                {option.balance ? (
                <Text 
                  className="text-sm text-gray-500"
                  style={{ fontFamily: 'BarlowRegular' }}
                >
                  Balance: {option.balance} NGN
                </Text>
                ) : ("")}
              </View>
              <View className={`w-6 h-6 rounded-full border-2 ${
                selectedOption === option.id 
                  ? 'border-[#FF8038] bg-[#FF8038]' 
                  : 'border-gray-300'
              } items-center justify-center`}>
                {selectedOption === option.id && (
                  <Ionicons name="checkmark" size={14} color="white" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <View className="px-4 py-6">
        <Button
          title={isProcessing ? "Processing..." : "Continue"}
          gradientPadding={1}
          gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
          buttonColour={selectedOption ? "#FF8038" : "#94949466"}
          buttonWidth={"full"}
          disabled={!selectedOption || isProcessing}
          action={handlePayment}
        />
      </View>
    </SafeAreaView>
  );
} 