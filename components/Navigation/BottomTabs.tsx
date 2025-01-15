import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabs({ navigation, currentRoute }: { navigation: any; currentRoute: any }) {
  return (
    <View className="flex-row justify-around items-center bg-white py-3 border-t border-gray-200">
      <TouchableOpacity className="items-center">
        <Ionicons name="home" size={24} color="#FF8038" />
        <Text className="text-xs mt-1 text-[#FF8038]">Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Ionicons name="search" size={24} color="#999" />
        <Text className="text-xs mt-1 text-gray-500">Search</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Ionicons name="calendar" size={24} color="#999" />
        <Text className="text-xs mt-1 text-gray-500">Events</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Ionicons name="person" size={24} color="#999" />
        <Text className="text-xs mt-1 text-gray-500">Profile</Text>
      </TouchableOpacity>
    </View>
  );
} 