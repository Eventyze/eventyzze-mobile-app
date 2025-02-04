import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const EventCreatedScreen = () => {
  return (
    <ScrollView className="bg-white p-4">
      <StatusBar style="auto" />

      {/* Event Image */}
      <Image
        source={require("../../assets/general/eventyzze-logo.png")} // Replace with your image URL
        className="w-full h-60 rounded-xl mb-4 object-cover"
      />

      {/* Event Title */}
      <Text className="text-2xl font-bold text-black mb-2">Shine On Music Festival</Text>

      {/* Event Date & Time */}
      <Text className="text-lg text-gray-500 mb-2">24th Sept. 2024 | 8:00pm</Text>

      {/* Event Description */}
      <Text className="text-base text-gray-700 mb-4">
        Lorem ipsum sit dolor amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ut enim ad minim veniam...
        <Text className="text-blue-500"> Read More</Text>
      </Text>

      {/* Event Price */}
      <Text className="text-lg font-bold text-black mb-2">5,000 NGN (Early birds)</Text>

      {/* Success Message */}
      <Text className="text-xl font-semibold text-green-600 mb-6">Event created successfully!</Text>

      {/* Continue Button */}
      <TouchableOpacity className="bg-orange-600 p-4 rounded-md items-center mb-4">
        <Text className="text-white font-bold text-lg">Continue</Text>
      </TouchableOpacity>

      {/* Share Button */}
      <TouchableOpacity className="bg-blue-600 p-4 rounded-md items-center">
        <Text className="text-white font-bold text-lg">Share</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventCreatedScreen;