import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { updateProfileFirstime } from "../../services/axiosFunctions/userAxios/userAxios";

export default function Preferences() {
  const params = useLocalSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const profileData = React.useMemo(() => ({
    username: params.username as string,
    bio: params.bio as string,
    profileImage: params.profileImage as string,
  }), [params]);

  const options: string[] = React.useMemo(() => [
    "Live concerts", "Live sport matches", "Technology", "Gaming", "Science", 
    "Networking", "Fashion", "Beauty", "Fitness classes", "Art", "Cultural events", 
    "Literature", "Seminars", "Nature", "Charity", "Cooking", "Dance", "Travel", 
    "Movie premier", "Film festivals",
  ], []);

  const toggleSelection = useCallback((option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  }, []);

  const handleNext = useCallback(async () => {
    if (selectedOptions.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please select at least one preference',
      });
      return;
    }

    setIsLoading(true);
    try {
      const userData = {
        ...profileData,
        interests: selectedOptions
      };

      const response = await updateProfileFirstime(userData);

      if (response.status === 200) {
        router.push("/signupRedirect");
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to update profile',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Toast.show({
        type: 'error',
        text1: 'Error updating profile',
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedOptions, profileData]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <StatusBar barStyle="dark-content" backgroundColor="white" /> */}
      <View className="flex-1 mt-20">
        {/* Header Section - adjusted padding */}
        <View className="px-4 pb-6">
          <Animated.View className="flex-row justify-between items-center">
            <View>
              <View className="flex-row gap-2">
                <TouchableOpacity 
                  onPress={() => router.back()}
                  className="items-center justify-center text-center"
                >
                  <Icon name="arrow-left" size={20} />
                </TouchableOpacity>
                <View>
                  <Text className="text-3xl" style={{ fontFamily: "BarlowBold" }}>
                    Profile Setup
                  </Text>
                </View>
              </View>
              <Text className="text-base mt-4 text-blackTransparent">
                Customize your recommendations and let us know what you love
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Preferences Section */}
        <View className="flex-wrap flex-row px-4 gap-4 mt-8">
          {options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              className={`w-auto px-6 py-3 rounded-lg border ${
                selectedOptions.includes(option)
                  ? "bg-orange-500 border-orange-600"
                  : "bg-white border-gray-300"
              }`}
              onPress={() => toggleSelection(option)}
            >
              <Text
                className={`text-center ${
                  selectedOptions.includes(option) ? "text-white" : "text-black"
                }`}
                style={{ fontFamily: "BarlowBold" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <View className="px-4 mt-12">
          <Button
            title={isLoading ? "Saving..." : "Next"}
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
            action={handleNext}
            disabled={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
