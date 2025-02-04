import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { router, useFocusEffect, usePathname } from "expo-router";

const NewUserPrompt:React.FC = () => {
    return (
        <View className="h-full w-full">
        <Text className="text-center text-xl font-semibold">
          Hi there, as a first time user, you are on a free subscription. You
          have 2 hours of free streaming, which can only be used once within 30
          days. 😊
        </Text>
        <Text className="text-center text-xl text-gray-700 mt-4 font-semibold italic">
          However, you can upgrade to a host today to create and host more
          events (You will still enjoy your free service)!!{" "}
          <Text className="font-bold">😁</Text>
        </Text>
        <View className="flex-1 flex-row justify-center items-center px-24 gap-4">
          <TouchableOpacity
            className="bg-white w-full border border-[#FF8038] rounded-full p-4"
            onPress={() => router.push("/create-event")}
          >
            <Text className="text-center text-black text-lg font-semibold">
              Continue free
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#FF8038] w-full rounded-full p-4"
            onPress={() => router.push("/subscription")}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Upgrade
            </Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}


export default NewUserPrompt;