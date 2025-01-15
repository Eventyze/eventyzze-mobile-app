import Button from "@/components/Button";
import React from "react";
import { Text, View, Image, SafeAreaView } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import LandingLeftImage from "../../assets/landingPage/landing-left-image.svg";
// import LandingTopRightImage from "../../assets/landingPage/landing-top-right-image.svg";
import LandingBottomRightImage from "../../assets/landingPage/landing-bottom-right-image.svg";


const Welcome = () => {

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#FFFFFF', '#999999']}
        locations={[0, 0.6443]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        className="flex-1"
      >

        <View className="flex-1 p-3">
          <View className="flex fixed mt-10 px-2 flex-row justify-center items-start">

        {/* ========== LEFT SIDE OF LANDING PAGE ========== */}
            <View className="flex-1 w-full">
              <Animated.View
                className="w-full"
                entering={FadeInDown.duration(300).springify()}
              >
                <Text
                  className="text-[40px] pt-2 leading-9"
                  style={{ fontFamily: "BarlowExtraBold" }}
                >
                  Eventyzze
                </Text>
                <Image
                  source={require("../../assets/landingPage/landing-top-arrow.png")}
                  className="ml-9 mt-2"
                />
               <LandingLeftImage width="100%" height={220} />
                <Image
                  source={require("../../assets/landingPage/landing-bottom-arrow.png")}
                  className="ml-[65px]"
                />
              </Animated.View>
            </View>

            {/* ========== RIGHT SIDE OF LANDING PAGE ========== */}
            <View className="flex-1 flex-col items-end">
              <Animated.View
                className="w-full gap-4 pl-3 justify-end items-end"
                entering={FadeInDown.duration(200).delay(100).springify()}
              >
                {/* <LandingTopRightImage width="100%" height={220} className="mt-10"/> */}
                <Image
                  source={require("../../assets/landingPage/landing-top-right-image.png")}
                  className="w-auto h-auto"
                  resizeMode="contain"
                />
                <LandingBottomRightImage 
                  width="100%" 
                  height={220} 
                  className=""
                />
              </Animated.View>
            </View>

          </View>

          {/* ========== BUTTOM ========== */}
          <View className="h-60  mt-6">
            <Animated.View
              className="w-full justify-center gap-[20px] items-center"
              entering={FadeInDown.duration(300).delay(400).springify()}
            >
              <Text
                className="text-5xl text-center"
                style={{ fontFamily: "BarlowExtraBold" }}
              >
                Experience a world {"\n"}
                of Entertainment!
              </Text>
              <Text
                className="text-2xl mt-2 leading-[21.79px] font-normal text-center"
                style={{ fontFamily: "BarlowRegular" }}
              >
                Stream and replay live {"\n"}
                events on eventyzze
              </Text>
              <View className="mt-2 w-full flex justify-center items-center" style={{ overflow: 'hidden' }}>
                <Button
                  title={"Sign up"}
                  action={() => router.push("/signup")}
                  textColor={"black"}
                  buttonColour={"#999999"}
                />
              </View>
            </Animated.View>
          </View>


        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Welcome;
