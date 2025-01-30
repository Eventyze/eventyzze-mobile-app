import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, Keyboard, ScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { emailSignup } from "../../services/axiosFunctions/userAxios/userAxios";
import { storeLocalStorageData } from "../../services/axiosSetup/storage";
import { maybeCompleteAuthSession } from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { googleAuth } from "../../services/axiosFunctions/userAxios/userAxios";
import * as Facebook from 'expo-auth-session/providers/facebook';
import { facebookAuth } from "../../services/axiosFunctions/userAxios/userAxios";

// Initialize WebBrowser
maybeCompleteAuthSession();

export default function Signup() {
  const [signupInput, setSignupInput] = useState({ 
    email: '', 
    password: '',
    confirmPassword: '' 
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);


  // const [req, res, prompt] = Google.useAuthRequest({
  //   // androidClientId: "YOUR_ANDROID_CLIENT_ID", // Add your Android client ID
  //   // iosClientId: "YOUR_IOS_CLIENT_ID", // Add your iOS client ID
  //   // clientId: "YOUR_EXPO_CLIENT_ID", // Add your Expo client ID
  // });

  // const [request, response, promptAsync] = Facebook.useAuthRequest({
  //   // clientId: 'YOUR_FACEBOOK_APP_ID',
  //   // Make sure to add your app's redirect URL in your Facebook app settings
  // });

  const handleInputChange = (name: string, value: string) => {
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswords = () => {
    if (signupInput.password !== signupInput.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return false;
    }
    return true;
  };
  
  const handleSignup = async () => {
    Keyboard.dismiss();

    if (!validatePasswords()) {
      return;
    }

    try {
      setIsLoading(true);
      const body = {
        email: signupInput.email,
        password: signupInput.password
      }
      const response = await emailSignup(body);
      if (response.status >= 200 && response.status < 300) {
        setSignupInput({ email: '', password: '', confirmPassword: '' });
        
        await storeLocalStorageData('email', signupInput.email);
        Toast.show({
          type: 'success',
          text1: response.data?.message || 'Successfully signed up! Welcome to Eventyzze!',
          onPress: () => {
            Toast.hide();
          }
        });
        router.push('/confirmAccount');
      } else {
        return Toast.show({
          type: 'error',
          text1: response.data?.message || 'Signup failed. Please try again.',
        });
      }
    } catch (error: any) {
      return Toast.show({
        type: 'error',
        text1: error.message || 'An error occurred. Please try again.',
      });
    } finally {
      return setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // try {
    //   setGoogleLoading(true);
    //   const result:any = await prompt();

    //   if(!result){
    //     setGoogleLoading(false);
    //     Toast.show({
    //       type: 'error',
    //       text1: 'An error occurred during Google sign in. Please try again',
    //     });
    //     return;
    //   }
      
    //   if (result?.type === 'success') {
    //     const { authentication } = result;
        
    //     // Send token to your backend
    //     const response = await googleAuth(authentication.accessToken);
        
    //     if (response.status >= 200 && response.status < 300) {
    //       Toast.show({
    //         type: 'success',
    //         text1: response.data?.message || 'Successfully signed in with Google!',
    //       });
    //       router.push('/preferenceSelection'); // or wherever you want to redirect after Google sign in
    //     } else {
    //       Toast.show({
    //         type: 'error',
    //         text1: response.data?.message || 'Google sign in failed. Please try again.',
    //       });
    //     }
    //   }
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'An error occurred during Google sign in.',
    //   });
    // } finally {
    //   setGoogleLoading(false);
    // }
  };

  const handleFacebookSignIn = async () => {
    // try {
    //   setFacebookLoading(true);
    //   const result = await promptAsync();
      
    //   if (!result) {
    //     setFacebookLoading(false);
    //     Toast.show({
    //       type: 'error',
    //       text1: 'An error occurred during Facebook sign in. Please try again',
    //     });
    //     return;
    //   }

    //   if (result?.type === 'success') {
    //     const { authentication } = result;
    //     // Handle case where authentication might be null
    //     if (!authentication) {
    //       Toast.show({
    //         type: 'error',
    //         text1: 'Authentication failed. Please try again.',
    //       });
    //       return;
    //     }

    //     const response = await facebookAuth(authentication.accessToken);
        
    //     if (response.status >= 200 && response.status < 300) {
    //       Toast.show({
    //         type: 'success',
    //         text1: 'Successfully signed in with Facebook!',
    //       });
    //       router.push('/preferenceSelection');
    //     } else {
    //       Toast.show({
    //         type: 'error',
    //         text1: response.data?.message || 'Facebook sign in failed. Please try again.',
    //       });
    //     }
    //   }
    // } catch (error) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'An error occurred during Facebook sign in.',
    //   });
    // } finally {
    //   setFacebookLoading(false);
    // }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="pt-16 pb-6 px-4 bg-white">
          <Animated.View className="flex-row justify-between items-center">
            <View>
              <Text className="text-4xl" style={{ fontFamily: "BarlowBold" }}>
                Create an Account
              </Text>
              <Text className="text-xl mt-4 text-blackTransparent">
              Create an account with Eventyzze and explore a
              world of endless entertainment 
              </Text>
            </View>
          </Animated.View>
        </View>
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">

        <View className="w-full px-4 mt-10 mb-4">
          <View className="w-full items-center gap-2">
            <View className="w-full">
              <InputField
                placeholder="Email"
                onChange={(text) => handleInputChange('email', text)}
                value={signupInput.email}
                textWidth="100%"
              />
            </View>

            <View className="w-full relative">
              <InputField
                placeholder="Password"
                onChange={(text) => handleInputChange('password', text)}
                value={signupInput.password}
                secureTextEntry={!isPasswordVisible}
                textWidth="100%"
              />
              <TouchableOpacity
                className="absolute right-4 top-[55%] -translate-y-2"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text className="text-blackTransparent">
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full relative">
              <InputField
                placeholder="Confirm Password"
                onChange={(text:any) => handleInputChange('confirmPassword', text)}
                value={signupInput.confirmPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                textWidth="100%"
              />
              <TouchableOpacity
                className="absolute right-4 top-[55%] -translate-y-2"
                onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              >
                <Text className="text-blackTransparent">
                  {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="w-full mt-4">
              <Button
                title={isLoading ? <ActivityIndicator size="small" color="#808080" /> : "Sign Up"}
                gradientPadding={1}
                gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
                buttonColour={"#FF8038"}
                buttonWidth={"full"}
                action={handleSignup}
                disabled={isLoading || !signupInput.email || !signupInput.password || !signupInput.confirmPassword}
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-center mt-6 px-4">
          <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
          <Text className="mx-2 text-[#C9C9C9]">or</Text>
          <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
        </View>

      <View className="gap-4 px-4 mt-4">
        <Button
          title={googleLoading ? "Signing in..." : "Continue with Google"}
          gradientPadding={1}
          gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
          buttonColour={"white"}
          buttonWidth={"100%"}
          isIcon2={true}
          isIconColor="black"
          isIconName={"google"}
          action={handleGoogleSignIn}
          disabled={googleLoading}
        />
        {/* <Button
          title={"Continue with Apple"}
          gradientPadding={1}
          gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
          buttonColour={"white"}
          buttonWidth={"100%"}
          isIcon={true}
          isIconColor="black"
          isIconName={"apple"}
        /> */}
        <Button
          title={facebookLoading ? "Signing in..." : "Continue with Facebook"}
          gradientPadding={1}
          gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
          buttonColour={"white"}
          buttonWidth={"100%"}
          isIcon={true}
          isIconColor="black"
          isIconName={"facebook"}
          action={handleFacebookSignIn}
          disabled={facebookLoading}
        />
      </View>

      <View className="mt-4 px-4 flex-grow justify-center items-center">
        <Text
          className="text-center text-xl"
          style={{ fontFamily: "BarlowBold" }}
        >
          Already have an account?{" "}
          <Text
            className="text-[#FF8038]"
            onPress={() => router.push("/login")}
          >
            Log in
          </Text>
        </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
