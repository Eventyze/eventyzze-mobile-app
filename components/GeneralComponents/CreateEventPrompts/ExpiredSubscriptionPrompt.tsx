import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import React, { useCallback, useState, useEffect } from "react";
import { router, useFocusEffect, usePathname } from "expo-router";

const ExpiredSubscriptionPrompt:React.FC = () => {
    return (
        <View className="h-full w-full">
        <Text className="text-center text-xl font-semibold">
          Hi esteemed host, unfortunately your subscription has expired 😞
        </Text>
        <Text className="text-center text-xl text-gray-700 mt-4 font-semibold">
          However, no need to be sad because you can subscribe today to create and host more
          events!!{" "}
          <Text className="font-bold">😁</Text>
        </Text>
        <View className="flex-1 flex-row justify-center items-center px-24 gap-4">
          <TouchableOpacity
            className="bg-[#FF8038] w-full rounded-full p-4"
            onPress={() => router.push("/subscription")}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
        </View>
    )
}


export default ExpiredSubscriptionPrompt;