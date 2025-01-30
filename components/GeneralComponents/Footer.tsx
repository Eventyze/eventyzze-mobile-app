import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { router, useFocusEffect, usePathname } from "expo-router";
import Modal from "./Modal";
import EventModal from "./EventPrompt";
import backgroundImage from "../../assets/general/prompt-banner.png";

export default function Footer() {
  const currentPath = usePathname();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);

  React.useEffect(() => {
    return () => {
      setIsModalVisible(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsModalVisible(false);

      return () => {};
    }, [])
  );

  return (
    <View className="absolute bottom-0 left-0 right-0 pb-2 flex-row justify-around items-center bg-white border-t border-gray-200">
      <TouchableOpacity
        className={`items-center py-2 ${
          currentPath === "/dashboard" ? "border-t-4 border-[#FF8038]" : ""
        }`}
        onPress={() => router.push("/dashboard")}
      >
        <Icon
          name="home"
          size={24}
          color={currentPath === "/dashboard" ? "#FF8038" : "#666"}
        />
        <Text
          className={`text-xs mt-1 ${
            currentPath === "/dashboard" ? "text-[#FF8038]" : "text-gray-600"
          }`}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Icon name="heart-o" size={24} color="#666" />
        <Text className="text-xs mt-1 text-gray-600">Favorite</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="items-center"
        onPress={() => setIsModalVisible(true)}
      >
        <View className="bg-[#FF8038] w-12 h-12 rounded-full items-center justify-center">
          <Icon name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity className="items-center">
        <Icon name="bell-o" size={24} color="#666" />
        <Text className="text-xs mt-1 text-gray-600">Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`items-center py-2 ${
          currentPath === "/profile" || currentPath === "/settings"
            ? "border-t-4 border-[#FF8038]"
            : ""
        }`}
        onPress={() => router.push("/profile")}
      >
        <Icon
          name="user-o"
          size={24}
          color={
            currentPath === "/profile" || currentPath === "/settings"
              ? "#FF8038"
              : "#666"
          }
        />
        <Text
          className={`text-xs mt-1 ${
            currentPath === "/profile" || currentPath === "/settings"
              ? "text-[#FF8038]"
              : "text-gray-600"
          }`}
        >
          Profile
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={createEventModal}
        onClose={() => setCreateEventModal(false)}
        title="Error"
        height="50%"
        width="100%"
        showHeader={true}
        showCloseIcon={true}
        titleColor="#FF0000"
        closeOnBackdropPress={true}
      >
        <Text className="text-center text-lg font-semibold">
          You are on a free subscription, only hosts can create and host events
        </Text>
        <Text className="text-center text-lg mt-10 font-semibold">
          Upgrade to a host to create and host events 😊
        </Text>
        <TouchableOpacity
          className="bg-[#FF8038] w-full rounded-full p-4 mt-10"
          onPress={() => router.push("/subscription")}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Upgrade
          </Text>
        </TouchableOpacity>
      </Modal>

      <EventModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        height="50%"
        width="100%"
        imageSrc={backgroundImage}
        showHeader={true}
        title="Eventyzze"
      >
        {isModalVisible && (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <Text className="text-center text-xl font-semibold">
          Hi there, as a first time user, you are on a free subscription. You
          have 4 hours of free streaming, which can only be used once within 30
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
            // onPress={() => router.push("")}
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
      </EventModal>
    </View>
  );
}
