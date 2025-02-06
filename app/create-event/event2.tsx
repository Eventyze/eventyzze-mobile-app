import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "react-native-video";
import { Ionicons } from "@expo/vector-icons";
import { getLocalStorageData } from "@/services/axiosSetup/storage";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { StyleSheet, Button } from "react-native";
import Loading from "@/components/GeneralComponents/Loading";
import Footer from "@/components/GeneralComponents/Footer";
import { formatDate } from '../../utilities/utilities';

// import { getLocalStorageData } from '@/services/axiosSetup/storage';
// import RNFS from 'react-native-fs';

const { width } = Dimensions.get("window");

interface ParamsProps {
  title: string;
  description: string;
  date: string;
  duration: string;
  time: string;
  ad: string;
  image: any;
}

const Event2 = () => {
  const params:any = useLocalSearchParams();

  const [details, setDetails] = useState<any>(null);

  const [loading, setLoading] = useState(false)

  const [isSetEvent, setIsSetEvent] = useState(false)

  const [eventData, setEventData] = useState({
    videoUrl: "",
    imageUrl: "",
    title: "",
    description: "",
    startDate: "",
    time: "",
    cost: "",
    currency: ""
  })

  useEffect(()=> {
    const loadDataFromParams = () => {
      setEventData({
        videoUrl: params.videoUrl || "",
        imageUrl: params.imageUrl || "",
        title: params.title || "",
        description: params.description || "",
        startDate: params.startDate || "",
        time: params.time || "",
        cost: params.cost || "",
        currency: params.currency || "",
      });

    const hasAllParams = 
      params.videoUrl && 
      params.imageUrl && 
      params.title && 
      params.description && 
      params.startDate && 
      params.time &&
      params.cost &&
      params.currency

    setIsSetEvent(!!hasAllParams);
    }
console.log('dae',params.startDate)
    loadDataFromParams()
  },[isSetEvent])

  const carouselItems: any[] = [
    {
      type: "video",
      source: useVideoPlayer(params?.videoUrl),
    },
    {
      type: "image",
      source: params?.imageUrl
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    if (!item || !item.source) {
      return null;
    }
    if (item.type === "image") {
      return (
        <View className="">
          <Image
            source={{ uri: item.source }}
            style={{ width: "100%", height: 250, borderRadius: 10 }}
            resizeMode="cover"
            className=""
          />
        </View>
      );
    } else if (item.type === "video") {
      return (
        <View
          style={{
            width: "100%",
            height: 250,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <VideoView
            player={item.source}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      );
    }
  };

  const handleContinue = () => {
    // router.push("/dashboard");
  };

  return (
    <SafeAreaView className="bg-white mb-10">
      <Text
        className="pl-4 pr-4 pt-4 pb-2 text-2xl"
        style={{ fontFamily: "BarlowBold" }}
      >
        Event Details
      </Text>
      <ScrollView className="">
        <StatusBar style="auto" />
        <View className="mt-4">
          {/* Event Image */}
          {!isSetEvent ? (
            <View className="flex p-4">
              <Text>
                Unable to load event banner/image, please wait a little or continue to dashboard to see it. If you are unable to see it, please contact support on info@eventyzze.com
              </Text>
            </View>
          ) : (
            <ScrollView
              horizontal={true}
              pagingEnabled
              showsHorizontalScrollIndicator={true}
              className=" bg-gray-300"
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                paddingRight: 10,
                paddingLeft: 10,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              {carouselItems.map((item, index) => (
                <View
                  key={index}
                  style={{ width: width * 0.9, marginHorizontal: 5 }}
                >
                  {renderItem({ item })}
                </View>
              ))}
            </ScrollView>
          )}
          {isSetEvent && 
          <Text
            className="mt-2 pl-4 pr-4 text-[#FF8038]"
            style={{ fontFamily: "BarlowSemiBold" }}
          >
            {"<<<<<Swipe to toggle between Event Banner & Ad-Video>>>>>"}
          </Text>
          }
          {/* Event Title */}
          <Text className="text-2xl pl-4 pr-4 mt-6 font-bold text-black mb-2">
            {eventData.title || "Loading event title..."}
          </Text>

          {/* Event Date & Time */}
          <Text className="text-lg pl-4 pr-4 text-gray-500 mb-2">
          {formatDate(eventData.startDate) || "Loading event date..."} | {eventData.time || "Loading event time..."}
          </Text>

          <Text className="text-lg pl-4 pr-4 text-gray-500 mb-2">
          {eventData.currency || "Loading event cost currency..."} | {eventData.cost || "Loading cost..."}
          </Text>

          {/* Event Description */}
          <Text className="text-base pl-4 pr-4 text-gray-700 mb-4">
          {eventData.description || "Loading event description..."}
            {/* <Text className="text-blue-500"> Read More</Text> */}
          </Text>

          {/* Confirm Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="bg-[#FF8038] ml-4 mr-4 p-4 mb-20 rounded-md items-center"
          >
            <Text className="text-white font-bold text-lg">Confirm</Text>
          </TouchableOpacity>

      <TouchableOpacity className="bg-blue-600 text-center justify-center ml-4 mr-4 p-4 mb-20 rounded-md items-center">
        <Text className="text-white font-bold text-center text-lg">Share</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
      { !isSetEvent && <Loading isTransparent={false}/> }
    </SafeAreaView>
  );
};


export default Event2;
