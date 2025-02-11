import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import Animated from "react-native-reanimated";
import Button from "../../components/Button";
import { router } from "expo-router";
import { otpVerification, resendOtp } from "../../services/axiosFunctions/userAxios/userAxios";
import Toast from "react-native-toast-message";
import { getLocalStorageData } from "../../services/axiosSetup/storage";
import { ActivityIndicator } from "react-native";
import Button2 from "../../components/Button2";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(300);
  const [resendTimer, setResendTimer] = useState(0);
  const inputs: any = Array.from({ length: 5 }).map(() => useRef(null));

  const [ userEmail, setUserEmail ] = useState<string>("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    const fetchEmail = async () => {
      const email:string | any = await getLocalStorageData('email');
      setUserEmail(email);
    };
    fetchEmail();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 4) {
      inputs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputs[index - 1].current.focus();
    }
  };

  const handleVerifyOtp = async () => {
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      const otpString = otp.join('');

      const body = { otp: otpString, email:userEmail } 
      
      const response = await otpVerification(body);
      
      if (response.status >= 200 && response.status < 300) {
        setOtp(["", "", "", "", ""]);
        
        Toast.show({
          type: 'success',
          text1: response.data?.message || 'OTP verified successfully!',
        });
        router.push('/profileSetup');
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Invalid OTP. Please try again.',
        });
      }
    } catch (err:any) {
      return Toast.show({
        type: 'error',
        text1: err.message || 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    Keyboard.dismiss();
    setIsResending(true);
    if (resendTimer > 0) return;
    
    try {
      const response = await resendOtp(userEmail);
      
      if (response.status >= 200 && response.status < 300) {
        setOtp(["", "", "", "", ""]);
        setTimer(300);
        setResendTimer(120);
        Toast.show({
          type: 'success',
          text1: response.data?.message || 'New OTP sent successfully!',
        });
        return setIsResending(false);
      } else {
        Toast.show({
          type: 'error',
          text1: response.data?.message || 'Failed to resend OTP.',
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred while resending OTP.',
      });
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <View className="bg-white flex-1">
      <View className="pt-16 pb-6 px-4">
        <Animated.View className="flex-row justify-between items-center">
          <View>
            <Text className="text-3xl" style={{ fontFamily: "BarlowBold" }}>
              Confirm Email
            </Text>
            <Text className="text-xl mt-4 text-blackTransparent">
              Kindly enter the 5 digit passcode sent to your email to continue registration
            </Text>
          </View>
        </Animated.View>
      </View>
      <View className="w-full px-4 mt-10 mb-4">
        <View className="w-full items-center gap-4">
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputs[index]}
                style={[
                  styles.otpInput,
                  timer === 0 && styles.otpInputExpired
                ]}
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={(event) => handleKeyPress(event, index)}
                keyboardType="numeric"
                maxLength={1}
                editable={timer > 0}
              />
            ))}
          </View>
          <View className="flex-row w-full mt-4 justify-start">
            <Text className="text-[#C9C9C9] text-sm" style={{ fontFamily: "BarlowBold" }}>
              Code Expires in{" "}
              <Text 
                style={{ 
                  fontFamily: "BarlowExtraBold",
                  color: timer < 60 ? '#FF3333' : '#C9C9C9' 
                }}
              >
                {formatTime(timer)}
              </Text>
            </Text>
          </View>
          <View className="w-full mt-28">
            {/* <Button
              title={isLoading ? <ActivityIndicator size="small" color="#FF8038" /> : "Verify Account"}
              gradientPadding={0.1}
              textColor="black"
              gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
              buttonColour={!isOtpComplete || timer === 0 ? "#94949466" : "#FF8038"}
              buttonWidth={"full"}
              action={handleVerifyOtp}
              disabled={!isOtpComplete || isLoading || timer === 0}
            /> */}
                          <Button2
                title={
                  isLoading ? (
                    <ActivityIndicator size="small" color="#808080" />
                  ) : (
                    "Verify Account"
                  )
                }
                buttonColour={
                  !isOtpComplete || timer === 0
                    ? "rgba(148, 148, 148, 0.4)"
                    : "#FF8038"
                }
                buttonWidth={"full"}
                textColor="black"
                action={handleVerifyOtp}
                disabled={
                  !isOtpComplete || isLoading || timer === 0
                }
              />
          </View>
        </View>
      </View>
      <View className="flex-row items-end justify-start px-2">
        <Text className="mx-2 mt-4 text-[#C9C9C9] text-base" style={{ fontFamily: "BarlowBold" }}>
          Didn't get a code?{" "}
          {isResending ? <ActivityIndicator size="small" color="#FF8038" /> :
          <TouchableOpacity 
            onPress={handleResendOtp}
            disabled={resendTimer > 0}
          >
            <Text 
              className="text-[#FF8038]"
              style={{ 
                opacity: resendTimer > 0 ? 0.5 : 1 
              }}
            >
              Resend Code {resendTimer > 0 ? `(${formatTime(resendTimer)})` : ''}
            </Text>
          </TouchableOpacity>
            }
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#C9C9C9",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    color: "#000",
    fontFamily: "BarlowBold",
  },
  otpInputExpired: {
    borderColor: "#FF3333",
    color: "#FF3333",
  },
});
