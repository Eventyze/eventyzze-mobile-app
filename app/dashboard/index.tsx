import React, { useState, useRef } from 'react';
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
  {
    id: 8,
    title: 'Shine on Music',
    artist: 'Dan the creator',
    image: require('../../assets/dashboard/sirTheo.jpeg'),
  },
  {
    id: 9,
    title: 'Lively concerto',
    artist: 'Lively and Them',
    image: require('../../assets/dashboard/daddyArome.jpg'),
  },
  {
    id: 10,
    title: 'Sing Off',
    artist: 'Musiccc',
    image: require('../../assets/dashboard/sirPhil.jpeg'),
  },
  {
    id: 11,
    title: 'Shine on Music',
    artist: 'Dan the creator',
    image: require('../../assets/dashboard/sirProspa.jpeg'),
  },
];

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <SafeAreaView className="flex-1 mt-12 bg-white">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
      >
        {/* Explore New Hosts Section */}
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-center px-1 mb-6">
          <Text className="text-3xl font-semibold text-[#666666]">Explore New Hosts</Text>
          <TouchableOpacity>
            <Icon name="search" size={20} color="#B3B3B3" />
          </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {hosts.map((host) => (
              <TouchableOpacity key={host.id} className="mr-4">
                  <View className="bg-white rounded-full p-[2px]">
                    <Image
                      source={host.image}
                      className="w-14 h-14 rounded-full"
                    />
                  </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Live Shows Section */}
        <View className="mt-3 px-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl text-[#F17E35] font-bold"
            style={{ fontFamily: 'BarlowExtraBold' }}
            >Live Shows</Text>
            <TouchableOpacity>
              <Text className="text-lg text-[#666666] font-semibold">See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="rounded-lg">
            {liveShows.map((show) => (
              <TouchableOpacity 
                key={show.id}
                className="mr-4 relative rounded-lg"
              >
                <Image
                  source={show.image}
                  className="w-[220px] h-[323px] rounded-lg"
                />
                {/* <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded">
                  <Text className="text-white text-xs">LIVE</Text>
                </View> */}
                {/* <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  className="absolute bottom-0 left-0 right-0 h-20 rounded-b-lg p-3"
                >
                  <Text className="text-white font-semibold">{show.title}</Text>
                  <Text className="text-white text-sm opacity-80">{show.artist}</Text>
                </LinearGradient> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Sticky Categories Section */}
        <View className="bg-white pt-3">
          <Text className="text-2xl text-[#666666] font-semibold mb-4 px-4">Recommended Shows</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4 px-4"
          >
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedCategory(index)}
                className={`mr-4 px-4 py-2 rounded-full ${
                  index === selectedCategory ? 'bg-[#FF8038]' : 'bg-[#F0F0F0]'
                }`}
              >
                <Text className="text-black">
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Scrollable Shows List */}
        <View className="px-4 pb-20">
          {recommendedShows.map((show) => (
            <TouchableOpacity 
              key={show.id}
              className="flex-row items-center mb-4"
            >
              <Image
                source={show.image}
                className="w-[130px] h-32 rounded-lg"
              />
              <View className="flex-1 ml-3">
                <Text className="text-base font-semibold">{show.title}</Text>
                <Text className="text-sm text-gray-600">{show.artist}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Footer stays outside the ScrollView */}
      <Footer />
    </SafeAreaView>
  );
} 