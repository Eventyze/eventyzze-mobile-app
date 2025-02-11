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
import { StyleSheet } from "react-native";
import Loading from "@/components/GeneralComponents/Loading";
import Footer from "@/components/GeneralComponents/Footer";
import { formatDate } from '../../utilities/utilities';
import Button from "../../components/Button";
import { Stack } from "expo-router";

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

  const [isContinueLoading, setIsContinueLoading] = useState(false)


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
            style={{ width: "80%", height: 250, borderRadius: 10, }}
            resizeMode="stretch"
            className=""
          />
        </View>
      );
    } else if (item.type === "video") {
      return (
        <View
          style={{
            width: "93%",
            height: 250,
            borderRadius: 10,
            overflow: "hidden",
          }}
          className="top-0"
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

    setIsContinueLoading(true)
    router.push("/dashboard");
    return setIsContinueLoading(false)

  };

  return (
    <SafeAreaView className="bg-white">
    <Stack.Screen
      options={{
        headerShown: false,
      }}
    />

      <ScrollView className="mb-20">
        <StatusBar style="auto" />
        <View className="mt-4 mb-16 pl-4 pr-4">
        <View className="rounded-2xl bg-[#CACACA]"
        style={{borderColor: "#CACACA", borderWidth: 10, borderStyle: 'solid'}}
        >
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
              className=""
              contentContainerStyle={{
                flexDirection: "row",
                // justifyContent: "center",
                // alignContent: "center",
                // alignItems: "center",

              }}
              style={{ borderBottomWidth: 10, borderBottomColor: "#CACACA" }}
            >
              {carouselItems.map((item, index) => (
                <View
                  key={index}
                  style={{ width: width * 0.93, marginHorizontal: 0 }}
                >
                  {renderItem({ item })}
                </View>
              ))}
            </ScrollView>
          )}
          <View className="bg-white rounded-b-xl">
          {isSetEvent && 
          <Text
            className="mt-2 pl-2 flex justify-center text-center pr-2 text-[#FF8038] bg-white"
            style={{ fontFamily: "BarlowSemiBold" }}
          >
            {"<< Swipe the video to toggle between banner & ad >>"}
          </Text>
          }
          {/* Event Title */}
          <Text className="text-2xl pl-4 text-center bg-white pr-4 mt-6 font-bold text-black mb-2"
          style={{ fontFamily: "BarlowBold" }}
          >
            {eventData.title || "Loading event title..."}
          </Text>

          {/* Event Date & Time */}
          <Text className="text-xl pl-4 pr-4 text-center bg-white text-gray-500 mb-2">
          {formatDate(eventData.startDate) || "Loading event date..."}
          </Text>

          <Text className="text-xl pl-4 pr-4 text-center bg-white text-gray-500 mb-2">
           {`${eventData.time} (Prompt)` || "Loading event time..."}
          </Text>
          <View className="h-1 border-b border-dashed border-gray-500 ml-6 mr-6"></View>
          {/* Event Description */}
          <Text className="text-xl pl-4 mt-4 pr-4 text-center bg-white text-gray-700 mb-4">
          {eventData.description || "Loading event description..."}
            {/* <Text className="text-blue-500"> Read More</Text> */}
          </Text>

          <Text className="text-3xl pl-4 mt-6 text-center pr-4 bg-white"
          style={{fontFamily: "BarlowBold"}}
          >
          {eventData.cost || "Loading cost..."} {eventData.currency || "Loading event cost currency..."} 
          </Text>

          <View className="flex-row justify-between mb-14">
            <View className="">
              <Image
                  source={require('../../assets/eventCreationPage/ellipse.png')}
                  className="w-[30px] h-30 rounded-full ml-[-10]"
                  resizeMode="stretch"
                />
              
            </View>
            <View className="">
              <Image
                  source={require('../../assets/eventCreationPage/ellipse.png')}
                  className="w-[30px] h-30 rounded-full mr-[-10]"
                  resizeMode="stretch"
                />
             
            </View>
          </View>
          </View>
          </View>

          <View>
            <Text className="mt-10 text-3xl text-center font-bold"
            style={{ fontFamily: "BarlowBold" }}
            >
              Event Created Successfully!
            </Text>
          </View>


          {/* Confirm Button */}

          <View className="flex-row justify-center items-center gap-10 pl-16 mt-12 pr-16">
          <Button
            title={isContinueLoading ? "Loading..." : "Continue"}
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
            action={handleContinue}
            disabled={isContinueLoading}
          />
          <Button
            title={"Share"}
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"white"}
            buttonWidth={"full"}
            disabled={isContinueLoading}
          />
        </View>
        </View>
      </ScrollView>
      { !isSetEvent && <Loading isTransparent={false}/> }
      <Footer />
    </SafeAreaView>
  );
};


export default Event2;
