import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";

import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";
import { View, Text, TouchableOpacity, Pressable, TouchableWithoutFeedback } from "react-native";
import { UserProvider, useUser } from '../context/UserContext';
import { clearLocalStorage, getLocalStorageData } from '../services/axiosSetup/storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    BarlowBold: require("../assets/fonts/Barlow-Bold.ttf"),
    BarlowRegular: require("../assets/fonts/Barlow-Regular.ttf"),
    BarlowSemiBold: require("../assets/fonts/Barlow-SemiBold.ttf"),
    BarlowExtraBold: require("../assets/fonts/Barlow-ExtraBold.ttf"),
  });

  useEffect(() => {
    const clearLocal = async() =>{
      return await clearLocalStorage();
      };
    if (loaded) {
      hideAsync();
    }
    clearLocal();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      {/* <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="signup/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="login/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="confirmAccount/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="preferenceSelection/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="profileSetup/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="secondProfileSetupScreen/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="signupRedirect/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
           <Stack.Screen
            name="dashboard/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="payment/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="payment/success"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="payment/failure"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen
            name="profile/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
            <Stack.Screen
             name="closure/index"
             options={{ headerShown: false, navigationBarHidden: true }}
           />
           <Stack.Screen
            name="settings/index"
            options={{ headerShown: false, navigationBarHidden: true }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast
          config={{
            error: ({ text1, hide }) => (
              <View
                style={{
                  height: 80,
                  width: "90%",
                  backgroundColor: "#ff3333",
                  padding: 4,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                  marginTop: 100,
                  flexDirection: "row",
                  borderLeftWidth: 6,
                  borderLeftColor: "darkred",
                  position: 'relative',
                }}
              >
                <View style={{ flex: 1, paddingRight: 40 }}>
                  {text1 && (
                    <Text style={{ color: "white", paddingLeft: 10 }}>{text1}</Text>
                  )}
                </View>
                
                {/* <TouchableOpacity
                     onPress={(e) => {
                      e.stopPropagation()
                      console.log('Hide button pressed');
                      return setTimeout(() => {
                        Toast.hide();
                      }, 100);
                    }}
                  // activeOpacity={0.7}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    width: 30,
                    height: 30,
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    zIndex: 999,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>X</Text>
                </TouchableOpacity> */}
              </View>
            ),
            success: ({ text1 }) => (
              <View
                style={{
                  height: 80,
                  width: "90%",
                  backgroundColor: "#4CAF50", // Green for success
                  padding: 4,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                  marginTop: 100,
                  flexDirection: "row",
                  borderLeftWidth: 6,
                  borderLeftColor: "darkgreen", // Dark green border for success
                }}
              >
                {text1 && (
                  <Text style={{ color: "white", flex: 1 }}>{text1}</Text>
                )}
              </View>
            ),
            info: ({ text1 }) => (
              <View
                style={{
                  height: 80,
                  width: "90%",
                  backgroundColor: "#2196F3",
                  padding: 4,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                  marginTop: 100,
                  flexDirection: "row",
                  borderLeftWidth: 6,
                  borderLeftColor: "#0d47a1",
                }}
              >
                {text1 && (
                  <Text style={{ color: "white", flex: 1 }}>{text1}</Text>
                )}
              </View>
            ),
          }}
          position="bottom"
          bottomOffset={70}
          visibilityTime={5000}
          autoHide
        />
      {/* </ThemeProvider> */}
    </UserProvider>
  );
}
