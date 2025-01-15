import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

// Subscription plan data
const subscriptionPlans = [
  {
    id: 1,
    name: 'Starter',
    price: 'Free',
    description: 'Current plan',
    features: ['5 shows/month'],
    color: '#FFFFFF',
    borderColor: '#E5E5E5',
  },
  {
    id: 2,
    name: 'Bronze',
    price: '$20',
    description: '3 shows/month',
    features: ['Unlimited access to recorded shows'],
    color: '#CD7F32',
    borderColor: '#CD7F32',
  },
  {
    id: 3,
    name: 'Silver',
    price: '$40',
    description: '15 shows/month',
    features: ['Priority access to new shows'],
    color: '#C0C0C0',
    borderColor: '#C0C0C0',
  },
  {
    id: 4,
    name: 'Gold',
    price: '$82',
    description: '25 shows/month',
    features: ['VIP access to all shows'],
    color: '#FFD700',
    borderColor: '#FFD700',
  },
  {
    id: 5,
    name: 'Platinum',
    price: '$100',
    description: '50 shows/month',
    features: ['Exclusive content access'],
    color: '#E5E4E2',
    borderColor: '#E5E4E2',
  },
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

  return (
    <SafeAreaView className="flex-1 bg-white mt-10">
      <View className="px-4 py-6 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="mr-4"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl" style={{ fontFamily: 'BarlowBold' }}>
          Select a plan
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {subscriptionPlans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            onPress={() => setSelectedPlan(plan.id)}
            className={`mb-4 p-4 rounded-xl border ${
              selectedPlan === plan.id ? 'border-[#FF8038] border-2' : 'border-gray-200'
            }`}
            style={{
              backgroundColor: plan.color,
              opacity: selectedPlan === plan.id ? 1 : 0.8,
            }}
          >
            <View className="flex-row justify-between items-center">
              <View>
                <Text 
                  className="text-lg mb-1" 
                  style={{ fontFamily: 'BarlowBold' }}
                >
                  {plan.name}
                </Text>
                <Text 
                  className="text-gray-600"
                  style={{ fontFamily: 'BarlowRegular' }}
                >
                  {plan.description}
                </Text>
              </View>
              <Text 
                className="text-xl" 
                style={{ fontFamily: 'BarlowBold' }}
              >
                {plan.price}
              </Text>
            </View>
            {plan.features.map((feature, index) => (
              <View key={index} className="flex-row items-center mt-2">
                <Ionicons name="checkmark-circle" size={16} color="#FF8038" />
                <Text 
                  className="ml-2 text-gray-600"
                  style={{ fontFamily: 'BarlowRegular' }}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </TouchableOpacity>
        ))}

        <Text 
          className="text-xs text-gray-500 mt-4 mb-6 text-center px-4"
          style={{ fontFamily: 'BarlowRegular' }}
        >
          If you choose to purchase a subscription plan, payments will be charged to your preferred payment method. You can cancel the automatic renewal of your subscription before the next payment.
        </Text>
      </ScrollView>

      <View className="px-4 py-6">
        <Button
          title="Continue"
          gradientPadding={1}
          gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
          buttonColour={"#FF8038"}
          buttonWidth={"full"}
          action={() => {
            if (selectedPlan) {
              const selectedPlanDetails = subscriptionPlans.find(plan => plan.id === selectedPlan);
              router.push({
                pathname: '/payment',
                params: {
                  planName: selectedPlanDetails?.name,
                  price: selectedPlanDetails?.price,
                }
              });
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
} 