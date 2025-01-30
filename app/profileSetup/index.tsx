import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, Modal, SafeAreaView, ActivityIndicator, StatusBar } from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import { router } from "expo-router";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import { Ionicons } from '@expo/vector-icons';
import { requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync, launchImageLibraryAsync, launchCameraAsync} from 'expo-image-picker'
import { updateUserImage } from "../../services/axiosFunctions/userAxios/userAxios";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileSetup() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await requestCameraPermissionsAsync();
    const { status: libraryStatus } = await requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permission needed to access camera and photos',
      });
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setTempImage(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error taking photo',
      });
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setTempImage(result.assets[0].uri);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error selecting image',
      });
    }
  };

  const handleSaveImage = async () => {
    if (!tempImage) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      
      formData.append('image', {
        uri: tempImage,
        type: 'image/jpeg',
        name: 'profile-image.jpg',
        size: undefined,
        lastModified: undefined,
      } as any);

      const response = await updateUserImage(formData);

      if (response.status === 200) {
        const imageUrl = response.data?.data?.imageUrl || response.data?.imageUrl;
        
        if (imageUrl) {
          setProfileImage(imageUrl);
        } else {
          setProfileImage(tempImage);
        }
        
        setTempImage(null);
        setIsModalVisible(false);
        Toast.show({
          type: 'success',
          text1: 'Profile image updated successfully',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to update profile image',
        });
      }
    } catch (error) {
      console.error('Error saving image:', error);
      Toast.show({
        type: 'error',
        text1: 'Error saving image',
      });
    } finally {
      setIsLoading(false);
    }
  };

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

    router.push({
      pathname: '/secondProfileSetupScreen',
      params: {
        userName: username,
        bio,
        profileImage,
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* <StatusBar hidden={true} /> */}
          <View>
            <Text className="text-2xl mt-20 pb-4 ml-4" style={{ fontFamily: "BarlowBold" }}>
              Profile Setup
            </Text>
          </View>
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="">
          <Animated.View className="flex-row justify-center items-center mt-4">
            <TouchableOpacity 
              onPress={() => setIsModalVisible(true)}
              className="relative"
            >
              <Image
                source={
                  profileImage 
                    ? { uri: profileImage }
                    : require("../../assets/profileSetup/default-profile-image.png")
                }
                className="w-32 h-32 rounded-full"
              />
              <View className="absolute bottom-0 right-0 bg-[#FF8038] p-2 rounded-full">
                <Ionicons name="camera" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <View className="pt-10 pb-6 px-4">
          <Animated.View className="flex-col justify-between items-start w-full">
            <View className="w-full">
              <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
                Username
              </Text>
              <Text
                className="text-base text-blackTransparent"
                style={{ fontFamily: "BarlowRegular" }}
              >
                Set a name that would be visible to others
              </Text>
              <InputField 
                placeholder={username ? username : "Username"} 
                width="100%" 
                value={username}
                onChange={setUsername}
              />
            </View>
          </Animated.View>

          <Animated.View className="mt-4">
            <View>
              <Text className="text-2xl mt-2" style={{ fontFamily: "BarlowBold" }}>
                Bio
              </Text>
              <Text
                className="text-base text-blackTransparent"
                style={{ fontFamily: "BarlowRegular" }}
              >
                Tell us a little bit about yourself
              </Text>
            </View>
            <View className="w-full items-center mt-4">
              <TextArea 
                placeholder={bio ? bio : "Eventyzze"} 
                value={bio}
                onChangeText={setBio}
              />
            </View>
          </Animated.View>
        </View>

        <View className="gap-4 px-4 mt-8 mb-8">
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

      {/* Image Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-6">
            <View className="items-center mb-6">
              <View className="w-16 h-1 bg-gray-300 rounded-full" />
            </View>

            {tempImage ? (
              <View className="items-center">
                <Image
                  source={{ uri: tempImage }}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <View className="flex-row gap-4">
                  <Button
                    title="Cancel"
                    gradientPadding={1}
                    gradientColors={["#FF3B30", "#FF3B30", "#FF3B30"]}
                    buttonColour={"#FF3B30"}
                    buttonWidth={140}
                    action={() => {
                      setTempImage(null);
                      setIsModalVisible(false);
                      setProfileImage(null);
                      setIsLoading(false);
                    }}
                  />
                  <Button
                    title={isLoading ? "Saving..." : "Save"}
                    gradientPadding={1}
                    gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
                    buttonColour={"#FF8038"}
                    buttonWidth={140}
                    action={handleSaveImage}
                    disabled={isLoading}
                  />
                </View>
              </View>
            ) : (
              <>
                <TouchableOpacity
                  onPress={takePhoto}
                  className="p-4 border-b border-gray-200"
                >
                  <Text className="text-lg text-center">Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={pickImage}
                  className="p-4 border-b border-gray-200"
                >
                  <Text className="text-lg text-center">Choose from Library</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(false)}
                  className="p-4"
                >
                  <Text className="text-lg text-center text-red-500">Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
