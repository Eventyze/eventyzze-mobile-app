import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, Keyboard, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import { forgotPassword } from "../../services/axiosFunctions/userAxios/userAxios"; // You'll need to create this function

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleResetPassword = async () => {
    if (!email) {
      return Toast.show({
        type: 'error',
        text1: 'Please enter your email address',
      });
    }

    Keyboard.dismiss();
    try {
      setIsLoading(true);
      
      const response = await forgotPassword({ email });
      
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Reset link sent!',
          text2: 'Please check your email for password reset instructions.',
        });
        
        // Optionally navigate to a confirmation screen
        router.push('/login');
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to send reset link. Please try again.',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.message || 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View className="pt-16 pb-6 px-4">
          <Animated.View className="flex-row justify-between items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="mb-4"
            >
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
          </Animated.View>
          
          <View>
            <Text className="text-3xl" style={{ fontFamily: "BarlowBold" }}>
              Forgot Password?
            </Text>
            <Text className="text-xl mt-4 text-blackTransparent">
              Don't worry! It happens. Please enter the email associated with your account.
            </Text>
          </View>
        </View>

        {/* Form */}
        <View className="w-full px-4 mt-10 mb-4">
          <View className="w-full items-center gap-2">
            <InputField
              placeholder="Email"
              onChange={(text) => setEmail(text)}
              value={email}
              textWidth={'95%'}
            //   keyboardType="email-address"
            //   autoCapitalize="none"
            />

            <View className="w-full mt-8">
              <Button
                title={isLoading ? <ActivityIndicator size="small" color="#808080" /> : "Send Reset Link"}
                gradientPadding={1}
                gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
                buttonColour={"#FF8038"}
                buttonWidth={"full"}
                action={handleResetPassword}
                disabled={isLoading || !email}
              />
            </View>
          </View>
        </View>

        {/* Back to Login */}
        <View className="flex-row items-center justify-center mt-6 px-4">
          <Text className="text-[#C9C9C9] text-sm"
            style={{fontFamily: "BarlowRegular"}}
          >
            Remember your password?
          </Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text className="ml-1 text-[#FF8038] text-sm"
              style={{fontFamily: "BarlowBold"}}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 