import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import yes from "../../assets/general/prompt-banner.svg"

const features = [
  'Lorem ipsum sit dolor amet consectetur',
  'Lorem ipsum sit dolor amet consectetur',
  'Lorem ipsum sit dolor amet consectetur',
  'Lorem ipsum sit dolor amet consectetur',
];

const EventCard = () => {
  return (
    <View className="flex bg-white rounded-lg overflow-hidden">
      <ImageBackground source={require('../../assets/general/prompt-banner.png')} className="w-full h-full rounded-b-3xl">
      <View className="p-5 items-center">
        <Text className="text-lg font-bold mb-1">Lights, Camera, Action</Text>
        <Text className="text-sm text-gray-500 mb-3">Upgrade your Eventyzze plan to host shows</Text>
        <FlatList
          data={features}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center mb-2.5">
              <Ionicons name="checkmark-circle-outline" size={20} color="black" />
              <Text className="ml-2 text-sm">{item}</Text>
            </View>
          )}
        />
        <TouchableOpacity className="bg-orange-500 py-3 px-10 rounded-full mt-4">
          <Text className="text-white text-lg font-bold">Upgrade</Text>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    </View>
  );
};

export default EventCard;
