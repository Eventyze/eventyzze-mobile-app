import React, { useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import Button2 from "../../components/Button2";
import { router } from "expo-router";
import {
  emailLogin,
  resendOtp,
} from "../../services/axiosFunctions/userAxios/userAxios";
import Toast from "react-native-toast-message";
import { useUser } from "../../context/UserContext";
import { storeLocalStorageData } from "../../services/axiosSetup/storage";

export default function Login() {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsAuthenticated } = useUser();

  const handleInputChange = (name: string, value: string) => {
    setLoginInput((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      setIsLoading(true);

      const response = await emailLogin(loginInput);

      if (response.status === 200) {
        // Store user data in context
        setUser(response?.data?.data?.user);
        setIsAuthenticated(true);

        // Store user data in local storage
        await storeLocalStorageData(
          "user",
          JSON.stringify(response?.data?.data)
        );

        Toast.show({
          type: "success",
          text1: response.data?.message || "Login successful!",
        });

        // Navigate based on profile setup status
        console.log("user", response?.data?.data?.user);
        if (!response?.data?.data?.user?.isInitialProfileSetupDone) {
          router.push("/profileSetup");
        } else {
          router.push("/dashboard");
        }
        return setLoginInput({ email: "", password: "" });
      } else if (response.status === 403) {
        Toast.show({
          type: "error",
          text1:
            "Account unverified, an OTP has been sent to your mail. If you do not receive it, please request another otp",
        });
        await storeLocalStorageData("email", response?.data?.data?.user?.email);
        await resendOtp(response?.data?.data?.user?.email);
        return router.push("/confirmAccount");
      } else {
        return Toast.show({
          type: "error",
          text1: response.data?.message || "Login failed. Please try again.",
        });
      }
    } catch (error: any) {
      return Toast.show({
        type: "error",
        text1: error.message || "An error occurred. Please try again.",
      });
    } finally {
      return setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="pt-16 pb-6 px-4">
          <Animated.View className="flex-row justify-between items-center">
            <View>
              <Text className="text-4xl" style={{ fontFamily: "BarlowBold" }}>
                Welcome Back
              </Text>
              <Text className="text-[20px] mt-4 text-blackTransparent">
                We missed you, great you weren’t gone for so long
              </Text>
            </View>
          </Animated.View>
        </View>
        <View className="w-full px-4 mt-10 mb-4">
          <View className="w-full items-center gap-2">
            <View className="w-full">
              <InputField
                placeholder="Email"
                onChange={(text) => handleInputChange("email", text)}
                value={loginInput.email}
                textWidth="100%"
              />
            </View>
            <View className="w-full relative">
              <InputField
                placeholder="Password"
                onChange={(text) => handleInputChange("password", text)}
                value={loginInput.password}
                secureTextEntry={!isPasswordVisible}
                textWidth="100%"
              />
              <TouchableOpacity
                className="absolute right-4 top-[55%] -translate-y-2"
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text className="text-blackTransparent">
                  {isPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
            <View className="w-full mt-4">
              <Button2
                title={
                  isLoading ? (
                    <ActivityIndicator size="small" color="#808080" />
                  ) : (
                    "Login"
                  )
                }
                buttonColour={
                  !loginInput.email || !loginInput.password
                    ? "rgba(148, 148, 148, 0.4)"
                    : "#FF8038"
                }
                buttonWidth={"full"}
                action={handleLogin}
                disabled={
                  isLoading || !loginInput.email || !loginInput.password
                }
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-end justify-end px-4">
          <Text
            className="mx-2 text-[#C9C9C9] text-lg"
            style={{ fontFamily: "BarlowBold" }}
          >
            Forgot Password?
          </Text>
        </View>

        <View className="flex-row items-center justify-center mt-6 px-4">
          <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
          <Text className="mx-2 text-[#C9C9C9] text-sm">or</Text>
          <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
        </View>

        <View className="gap-4 px-4 mt-8">
          <Button
            title={"Create an Account"}
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"white"}
            buttonWidth={"full"}
            action={() => router.push("/signup")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
