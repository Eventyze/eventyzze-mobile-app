import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from '../../components/GeneralComponents/Modal';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import Footer from '../../components/GeneralComponents/Footer';

// import {} from '../../assets/dashboard'

// Dummy data for hosts
const hosts = [
  { id: 1, name: 'Judykay', image: require('../../assets/dashboard/maJudy.jpg') },
  { id: 2, name: 'Nathaniel Bassey', image: require('../../assets/dashboard/sirNath.jpg') },
  { id: 3, name: 'Victoria Orenze', image: require('../../assets/dashboard/mamaVic.jpg') },
  { id: 4, name: 'Dunsin Onyekan', image: require('../../assets/dashboard/sird.jpeg') },
  { id: 5, name: 'Sinach', image: require('../../assets/dashboard/mamaSinach.jpg') },
  { id: 6, name: 'Theophilus Sunday', image: require('../../assets/dashboard/sirTheo.jpeg') },
];

// Dummy data for live shows
const liveShows = [
  {
    id: 1,
    title: 'The be-attitudes',
    artist: 'Apostle Selman',
    image: require('../../assets/dashboard/daddySelman.webp'),
    isLive: true,
  },
  {
    id: 2,
    title: 'The Awakening',
    artist: 'Apostle Arome',
    image: require('../../assets/dashboard/daddyArome.jpg'),
    isLive: true,
  },
  {
    id: 3,
    title: 'My Worship',
    artist: 'Phil Thompson',
    image: require('../../assets/dashboard/sirPhil.jpeg'),
    isLive: true,
  },
  {
    id: 4,
    title: 'Hour of Revival',
    artist: 'Prospa Ochimana',
    image: require('../../assets/dashboard/sirProspa.jpeg'),
    isLive: true,
  },
  {
    id: 5,
    title: 'Yaweh',
    artist: 'Steve Crown',
    image: require('../../assets/dashboard/sirSteve.jpg'),
    isLive: true,
  },
];

// Add these new category options
const categories = ["Trending", "New", "Discover", "Music", "More"];

// Update the recommendedShows data structure
const recommendedShows = [
  {
    id: 1,
    title: 'Peace, Love and Light (music fest)',
    artist: 'Fischer',
    image: require('../../assets/dashboard/sirSteve.jpg'),
  },
  {
    id: 2,
    title: 'Lively concerto',
    artist: 'Lively and Them',
    image: require('../../assets/dashboard/maJudy.jpg'),
  },
  {
    id: 3,
    title: 'Sing Off',
    artist: 'Musiccc',
    image: require('../../assets/dashboard/sird.jpeg'),
  },
  {
    id: 4,
    title: 'Shine on Music',
    artist: 'Dan the creator',
    image: require('../../assets/dashboard/sirTheo.jpeg'),
  },
  {
    id: 5,
    title: 'Lively concerto',
    artist: 'Lively and Them',
    image: require('../../assets/dashboard/daddyArome.jpg'),
  },
  {
    id: 6,
    title: 'Sing Off',
    artist: 'Musiccc',
    image: require('../../assets/dashboard/sirPhil.jpeg'),
  },
  {
    id: 7,
    title: 'Shine on Music',
    artist: 'Dan the creator',
    image: require('../../assets/dashboard/sirProspa.jpeg'),
  },
];

export default function Dashboard() {

  return (
    <SafeAreaView className="flex-1 mt-20">
      {/* <ScrollView className="flex-1"> */}
        {/* Explore New Hosts Section */}
        <View className="px-4 pt-4">
          <Text className="text-xl font-semibold mb-4">Explore New Hosts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hosts.map((host) => (
              <TouchableOpacity key={host.id} className="mr-4">
                {/* <LinearGradient
                  colors={['#FF8038', '#FF0099']}
                  className="rounded-full p-[2px]"
                > */}
                  <View className="bg-white rounded-full p-[2px]">
                    <Image
                      source={host.image}
                      className="w-14 h-14 rounded-full"
                    />
                  </View>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Live Shows Section */}
        <View className="mt-3 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Live Shows</Text>
            <TouchableOpacity>
              <Text className="text-[#FF8038]">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {liveShows.map((show) => (
              <TouchableOpacity 
                key={show.id}
                className="mr-4 relative"
              >
                <Image
                  source={show.image}
                  className="w-40 h-56 rounded-lg"
                />
                <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white text-xs">LIVE</Text>
                </View>
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  className="absolute bottom-0 left-0 right-0 h-20 rounded-b-lg p-3"
                >
                  <Text className="text-white font-semibold">{show.title}</Text>
                  <Text className="text-white text-sm opacity-80">{show.artist}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Recommended Shows Section */}
        <View className="mt-3 pb-2 px-4">
          <Text className="text-xl font-semibold mb-4">Recommended Shows</Text>
          
          {/* Category Tabs */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`mr-4 px-4 py-2 rounded-full ${
                  index === 0 ? 'bg-[#FF8038]' : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`${
                    index === 0 ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView 
            className="mb-6"
            style={{ maxHeight: 230 }}  // Add a fixed height or use percentage
            showsVerticalScrollIndicator={false}
          >
          {/* Shows List */}
          {recommendedShows.map((show) => (
            <TouchableOpacity 
              key={show.id}
              className="flex-row items-center mb-4"
            >
              <Image
                source={show.image}
                className="w-32 h-32 rounded-lg"
              />
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold">{show.title}</Text>
                <Text className="text-sm text-gray-600">{show.artist}</Text>
              </View>
            </TouchableOpacity>
          ))}
          </ScrollView>
        </View>

        {/* Bottom Navigation */}
        {/* <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white py-4 border-t border-gray-200">
          <TouchableOpacity className="items-center">
            <Icon name="home" size={24} color="#FF8038" />
            <Text className="text-xs mt-1 text-[#FF8038]">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Icon name="heart-o" size={24} color="#666" />
            <Text className="text-xs mt-1 text-gray-600">Favorite</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <View className="bg-[#FF8038] w-12 h-12 rounded-full items-center justify-center">
              <Icon name="plus" size={24} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Icon name="bell-o" size={24} color="#666" />
            <Text className="text-xs mt-1 text-gray-600">Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/profile')}>
            <Icon name="user-o" size={24} color="#666" />
            <Text className="text-xs mt-1 text-gray-600">Profile</Text>
          </TouchableOpacity>
        </View> */}
        <Footer />
    </SafeAreaView>
  );
} 