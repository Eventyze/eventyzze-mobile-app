import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import Footer from "../../components/GeneralComponents/Footer";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

const events = [
  {
    id: 1,
    title: "Lorem ipsum sit...",
    duration: "24:08",
    image: require("../../assets/dashboard/maJudy.jpg"),
  },
  {
    id: 2,
    title: "Lorem ipsum sit...",
    duration: "13:42",
    image: require("../../assets/dashboard/sird.jpeg"),
  },
  {
    id: 3,
    title: "Lorem ipsum sit...",
    duration: "30:42",
    image: require("../../assets/dashboard/sirTheo.jpeg"),
  },
  {
    id: 4,
    title: "Lorem ipsum sit...",
    duration: "24:08",
    image: require("../../assets/dashboard/daddyArome.jpg"),
  },
  {
    id: 5,
    title: "Lorem ipsum sit...",
    duration: "13:42",
    image: require("../../assets/dashboard/sirPhil.jpeg"),
  },
  {
    id: 6,
    title: "Lorem ipsum sit...",
    duration: "30:42",
    image: require("../../assets/dashboard/sirSteve.jpg"),
  },
  {
    id: 7,
    title: "Lorem ipsum sit...",
    duration: "24:08",
    image: require("../../assets/dashboard/daddyArome.jpg"),
  },
  {
    id: 8,
    title: "Lorem ipsum sit...",
    duration: "13:42",
    image: require("../../assets/dashboard/sirPhil.jpeg"),
  },
  {
    id: 9,
    title: "Lorem ipsum sit...",
    duration: "30:42",
    image: require("../../assets/dashboard/sirSteve.jpg"),
  },
];

const windowWidth = Dimensions.get("window").width;
const itemWidth = (windowWidth - 32) / 2; // 32 is total horizontal padding (16 * 2)

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <StatusBar barStyle="light-content" backgroundColor="white" /> */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]} // This makes the tabs sticky
      >
        {/* Header Image and Profile Section */}
        <View className="relative h-48 mt-14">
          {/* Bag Icon - Top Left */}

          {/* Background Image */}
          <Image
            source={require("../../assets/profile/cover.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute top-4 left-4 p-2 rounded-full">
            <TouchableOpacity>
              <Icon2 name="wallet" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Cog Icon - Top Right */}
          <View className="absolute top-4 right-4 p-2 rounded-full">
            <TouchableOpacity onPress={() => router.push("/settings")}>
              <Icon name="cog" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info and Buttons */}
        <View>
          {/* Profile Info */}
          <View className="flex mt-18">
            <View className="flex-row items-center p-4 flex justify-center">
              <Image
                source={require("../../assets/dashboard/sirProspa.jpeg")}
                className="w-24 h-24 rounded-full"
              />
              <View className="ml-4 flex-1">
                <Text className="text-2xl font-bold">James Maurice</Text>
                <Text className="text-[#F17E35]">@mauriceartist1</Text>
                {/* Stats */}
                <View className="flex-row justify-between">
                  <View className="items-center flex-row gap-1">
                    <Text className="font-bold">20</Text>
                    <Text className="">Posts</Text>
                  </View>
                  <Text className="text-3xl">|</Text>
                  <View className="items-center flex-row gap-1">
                    <Text className="font-bold">378</Text>
                    <Text className="">Followers</Text>
                  </View>
                  <Text className="text-3xl">|</Text>
                  <View className="items-center flex-row gap-1">
                    <Text className="font-bold">99</Text>
                    <Text className="">Following</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Edit Profile, Bio, Send buttons */}
          <View className="flex-row justify-between px-2">
            <TouchableOpacity className="mt-4 py-2 px-6 justify-center items-center rounded-full bg-[#F0F0F0] flex-1 mx-1">
              <Text className="text-center text-black font-semibold">
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4 py-4 px-6 justify-center items-center rounded-full bg-[#F0F0F0] flex-1 mx-1">
              <Text className="text-center text-black font-semibold">Bio</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-4 rounded-full justify-center items-center bg-[#F0F0F0] mx-1">
              <View className="text-center p-2 rounded-full flex-1 justify-center items-center text-black">
                <Icon name="send" size={20} color="black" className="" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sticky Tabs Section - This will be sticky */}
        <View className="bg-white pt-6">
          <View className="flex-row px-28 py-1 border-b border-gray-200">
            <View className="flex-1 flex-row">
              <TouchableOpacity className="flex-1 pt-6 border-b-2 border-[#FF8038]">
                <Text className="text-center font-semibold text-black">
                  Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 pt-6">
                <Text className="text-center font-semibold text-[#999999]">
                  Highlights
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Scrollable Content */}
        <View className="px-4 pt-4">
          {/* Featured Event */}
          <View className="flex-col justify-center items-center mb-4">
            <Image
              source={require("../../assets/dashboard/sirTheo.jpeg")}
              className="w-full h-48 rounded-lg"
            />
            <View className="flex-row justify-between mt-1 px-6">
              <View className="flex-col w-full">
                <Text className="text-[#303030] font-semibold text-xl">
                  Lorem ipsum sit dolor amet ...
                </Text>
                <Text className="text-[#646465] font-normal text-lg">
                  Lorem ipsum sit dolor amet ...
                </Text>
              </View>

              <View className="">
                <Text className="text-black font-bold text-xl">24:08</Text>
              </View>
            </View>
          </View>

          {/* Events Grid */}
          <View className="flex-row flex-wrap justify-between">
            {events.map((event) => (
              <View
                key={event.id}
                className="mb-4"
                style={{ width: itemWidth }}
              >
                <Image
                  source={event.image}
                  className="w-full h-48 rounded-lg"
                />
                <View className="px-2 pr-1 flex flex-row items-center justify-between">
                  <Text
                    className="text-[#5F5F60] font-semibold text-base"
                    numberOfLines={1}
                  >
                    {event.title}
                  </Text>
                  <Text className="text-black text-lg font-bold">
                    {event.duration}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Bottom padding */}
          <View className="h-32" />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
