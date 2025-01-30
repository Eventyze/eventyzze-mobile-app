import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, SafeAreaView, ActivityIndicator, StatusBar } from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import { router } from "expo-router";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import { Ionicons } from '@expo/vector-icons';
import { requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, MediaTypeOptions, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker'
import { updateUserImage } from "../../services/axiosFunctions/userAxios/userAxios";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

export default function SecondProfileSetupScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const handleNext = () => {
    if (!username.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter a username',
      });
    }

    if(!bio.trim()){
      return Toast.show({
        type: 'error',
        text1: 'Please enter a bio',
      });
    } 

    if(!profileImage){
      return Toast.show({
        type: 'error',
        text1: 'Please select a profile image',
      });
    }

    // Store the profile data in route params
    router.push({
      pathname: '/preferenceSelection',
      params: {
        username,
        bio,
        profileImage,
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <StatusBar hidden={true} /> */}
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="flex mt-20">
        <Animated.View className="flex-row bg-red-900 justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mb-4"
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          <View>
            <Text className="text-2xl ml-4" style={{ fontFamily: "BarlowBold" }}>
              Profile Setup
            </Text>
          </View>
          </Animated.View>
        </View>

        <View className="pt-7 pb-6 px-4">
          <Animated.View className="flex-col justify-between items-start w-full">
            <View className="w-full">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
              Phone
              </Text>
              <InputField 
                placeholder="Phone Number" 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
            <View className="w-full mt-4">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
                Full Name
              </Text>
              <InputField 
                placeholder="eg: John Doe" 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
            <View className="w-full mt-4">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
                Country
              </Text>
              <InputField 
                placeholder="Select Country" 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
            <View className="w-full mt-4">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
                State
              </Text>
              <InputField 
                placeholder="Select state/province" 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
            <View className="w-full mt-4">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
                Address
              </Text>
              <InputField 
                placeholder="eg: Plot 5 Ronald Road" 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
          </Animated.View>
        </View>
        

        <View className="gap-4 px-4 mt-2 mb-8">
          <Button
            title="Next"
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
            action={handleNext}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
