import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import Footer from '../../components/GeneralComponents/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';

const events = [
  {
    id: 1,
    title: 'Lorem ipsum sit dolor amet...',
    duration: '24:08',
    image: require('../../assets/dashboard/maJudy.jpg'),
  },
  {
    id: 2,
    title: 'Lorem ipsum sit dolor...',
    duration: '13:42',
    image: require('../../assets/dashboard/sird.jpeg'),
  },
  {
    id: 3,
    title: 'Lorem ipsum sit dolor...',
    duration: '30:42',
    image: require('../../assets/dashboard/sirTheo.jpeg'),
  },
  {
    id: 4,
    title: 'Lorem ipsum sit dolor amet...',
    duration: '24:08',
    image: require('../../assets/dashboard/daddyArome.jpg'),
  },
  {
    id: 5,
    title: 'Lorem ipsum sit dolor...',
    duration: '13:42',
    image: require('../../assets/dashboard/sirPhil.jpeg'),
  },
  {
    id: 6,
    title: 'Lorem ipsum sit dolor...',
    duration: '30:42',
    image: require('../../assets/dashboard/sirSteve.jpg'),
  },
  // Add more events as needed
];

const windowWidth = Dimensions.get('window').width;
const itemWidth = (windowWidth - 32) / 2; // 32 is total horizontal padding (16 * 2)

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Static Content */}
      <View>
        {/* Header Image and Profile Section */}
        <View className="relative h-48 mt-14">
          <Image
            source={require('../../assets/dashboard/sirSteve.jpg')}
            className="w-full h-full"
          />
          <View className="absolute top-4 right-4 flex-row space-x-4">
            <TouchableOpacity onPress={() => router.push('/settings')}>
              <Icon name="cog" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View className="px-4 -mt-16">
          <View className="flex-row items-end pt-6">
            <Image
              source={require('../../assets/dashboard/sirProspa.jpeg')}
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold">James Maurice</Text>
              <Text className="text-gray-600">@mauriceartist1</Text>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mt-4">
            <View className="items-center">
              <Text className="font-bold">20</Text>
              <Text className="text-gray-600">Posts</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">378</Text>
              <Text className="text-gray-600">Followers</Text>
            </View>
            <View className="items-center">
              <Text className="font-bold">99</Text>
              <Text className="text-gray-600">Following</Text>
            </View>
          </View>

          <TouchableOpacity className="mt-4 py-2 px-4 border border-gray-300 rounded-full">
            <Text className="text-center">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View className="flex-row border-b border-gray-200 mt-1">
          <TouchableOpacity className="flex-1 py-3 border-b-2 border-[#FF8038]">
            <Text className="text-center text-[#FF8038]">Events</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-3">
            <Text className="text-center text-gray-600">Highlights</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Events Grid */}
      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row flex-wrap justify-between">
          {events.map((event) => (
            <View 
              key={event.id} 
              className="mb-4 relative"
              style={{ width: itemWidth }}
            >
              <Image
                source={event.image}
                className="w-full h-48 rounded-lg"
              />
              <View className="absolute bottom-2 left-2 right-2">
                <Text className="text-white font-semibold text-sm" numberOfLines={1}>
                  {event.title}
                </Text>
                <Text className="text-white text-xs">{event.duration}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Add bottom padding to account for footer */}
        <View className="h-32" />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
} 