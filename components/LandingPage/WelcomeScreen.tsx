import Button from "../Button";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import LandingLeftImage from "../../assets/landingPage/landing-left-image.svg";
import LandingBottomRightImage from "../../assets/landingPage/landing-bottom-right-image.svg";
import LandingTopRightImage from "../../assets/landingPage/landing-top-right-image.svg";

const Welcome = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const windowHeight = Dimensions.get("window").height;

  const enter = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/signup");
      return setLoading(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFFFFF", "#999999"]}
        locations={[0, 0.6443]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1 }}
      >
        {/* paddingHorizontal: 10 */}
        <View className={`flex-1 mt-2 p-${Platform.OS === "ios" ? 20 : 0}`}>
          <View
            className="flex flex-row justify-center"
            style={{
              marginTop: Platform.OS === "ios" ? windowHeight * 0.05 : 40,
              marginBottom: 6,
              paddingHorizontal: Platform.OS === "ios" ? 20 : 10,
            }}
          >
            {/* ========== LEFT SIDE OF LANDING PAGE ========== */}
            <View className="flex-1 w-full">
              <Animated.View
                className="w-full"
                entering={FadeInDown.duration(300).springify()}
              >
                <Text
                  className="text-[35px] pt-2 leading-9"
                  style={{ fontFamily: "BarlowExtraBold" }}
                >
                  Eventyzze
                </Text>
                <Image
                  source={require("../../assets/landingPage/landing-top-arrow.png")}
                  className={`mt-2`}
                  style={{
                    marginLeft: Platform.OS === "ios" ? 95 : 45
                  }}
                />
                <LandingLeftImage width="100%" height={220} />
                <Image
                  source={require("../../assets/landingPage/landing-bottom-arrow.png")}
                  style={{
                    marginLeft: Platform.OS === "ios" ? 110 : 70
                  }}
                />
              </Animated.View>
            </View>

            {/* ========== RIGHT SIDE OF LANDING PAGE ========== */}
            <View className="flex-1 flex-col items-start">
              <Animated.View
                className="w-full gap-4 justify-start items-start"
                entering={FadeInDown.duration(200).delay(100).springify()}
              >
                <LandingTopRightImage
                  width="100%"
                  height={230}
                  // className="mt-10"
                />
                {/* <Image
                  source={require("../../assets/landingPage/landing-top-right-image.png")}
                  className="w-auto h-auto"
                  resizeMode="contain"
                /> */}

                <LandingBottomRightImage
                  width="100%"
                  height={230}
                  className="bg-green-800"
                />
              </Animated.View>
            </View>
          </View>

          {/* ========== BUTTON ========== */}
          <View className="h-70">
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
              <View
                className="mt-2 w-full flex justify-center items-center"
                style={{ overflow: "hidden" }}
              >
                <Button
                  title={loading ? "Loading..." : "Get Started"}
                  action={() => enter()}
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
