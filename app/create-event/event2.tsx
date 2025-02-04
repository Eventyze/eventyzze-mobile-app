import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router'

const EventDetailScreen = () => {

 const handleContinue = () => {
    console.log({
    //   eventTitle,
    //   eventDescription,
    //   eventDate,
    //   eventDuration,
    //   eventTime,
    });
router.push('/create-event/event3')
  };

  return (
    <ScrollView className="bg-white p-4">
      <StatusBar style="auto" />

      {/* Event Image */}
      <Image
        source={require('../../assets/dashboard/daddyArome.jpg')} // Replace with your image URL
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

      {/* Input for Event Price */}
      <Text className="text-lg text-gray-800 mb-2">Set price for Event</Text>
      <TextInput
        placeholder="Input Price"
        className="border border-gray-300 p-3 rounded-md mb-4 text-base"
      />

      {/* Input for Payment Details */}
      <Text className="text-lg text-gray-800 mb-2">Payment Details</Text>
      <TextInput
        placeholder="Set Payment Details"
        className="border border-gray-300 p-3 rounded-md mb-4 text-base"
      />

      {/* Input for Social Media URL */}
      <Text className="text-lg text-gray-800 mb-2">Social Media URL</Text>
      <TextInput
        placeholder="Enter URL"
        className="border border-gray-300 p-3 rounded-md mb-4 text-base"
      />

      {/* Confirm Button */}
      <TouchableOpacity onPress={handleContinue} className="bg-orange-600 p-4 rounded-md items-center">
        <Text className="text-white font-bold text-lg">Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EventDetailScreen;