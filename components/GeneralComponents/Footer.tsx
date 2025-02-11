import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  router,
  useFocusEffect,
  usePathname,
  useLocalSearchParams,
} from "expo-router";
import Modal from "./Modal";
import EventModal from "./EventPrompt";
import backgroundImage from "../../assets/general/prompt-banner.png";
import { getLocalStorageData } from "@/services/axiosSetup/storage";
import { useUser } from "@/context/UserContext";
import NewUserPrompt from "./CreateEventPrompts/NewUserPrompt";
import ExpiredFreeSubscriptionPrompt from "./CreateEventPrompts/ExpiredFreeSubscriptionPrompt";
import ExpiredSubscriptionPrompt from "./CreateEventPrompts/ExpiredSubscriptionPrompt";
import SubscribedUserPrompt from "./CreateEventPrompts/SubscribedUserPrompt";

export default function Footer() {
  const currentPath = usePathname();
  const [isNewUserModel, setIsNewUserModal] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);
  // const [userEligibleForFree, setUserEligibleForFree] = useState(false);
  const [userIsHost, setUserIsHost] = useState(false);
  const [userIsExpired, setUserIsExpired] = useState(false);
  const [newUserExhaustedFree, setNewUserExhaustedFree] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsNewUserModal(false);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsNewUserModal(false);

      return () => {};
    }, [])
  );

  const createEventRedirect = async () => {
    if (
      currentPath === "/create-event" ||
      currentPath === "/create-event-event2" ||
      currentPath === "/create-event-event3"
    ) {
      return;
    }
    setLoading(true);
    const user = await getLocalStorageData("user");
    if (!user.isInitialHostingOfferExhausted) {
      setIsNewUserModal(true);
      return setLoading(false);
    }
    if (
      user.isInitialHostingOfferExhausted &&
      user.subscriptionPlan === "Free"
    ) {
      setNewUserExhaustedFree(true);
      return setLoading(false);
    }
    if (
      user.subscriptionPlan !== "Free" &&
      user.subscriptionDetails?.dateOfExpiry &&
      new Date(user.subscriptionDetails.dateOfExpiry) < new Date()
    ) {
      setUserIsExpired(true);
      return setLoading(false);
    }

    if (
      user.subscriptionPlan !== "Free" &&
      new Date(user.subscriptionDetails?.dateOfExpiry) >= new Date()
    ) {
      setUserIsHost(true);
      return setLoading(false);
    }

    setLoading(false);
  };

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
        onPress={() => createEventRedirect()}
      >
        <View className="bg-[#FF8038] w-12 h-12 rounded-full items-center justify-center">
          {loading ? (
            <ActivityIndicator size={30} color="white" />
          ) : (
            <Icon name="plus" size={24} color="white" />
          )}
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

      {/* New user prompt */}
      <EventModal
        isVisible={isNewUserModel}
        onClose={() => setIsNewUserModal(false)}
        height="50%"
        width="100%"
        imageSrc={backgroundImage}
        showHeader={true}
        title="Eventyzze"
      >
        {isNewUserModel && (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <NewUserPrompt onClose={() => setIsNewUserModal(false)} />
      </EventModal>

      {/* New user prompt with exhausted free streaming */}
      <EventModal
        isVisible={newUserExhaustedFree}
        onClose={() => setNewUserExhaustedFree(false)}
        height="50%"
        width="100%"
        imageSrc={backgroundImage}
        showHeader={true}
        title="Eventyzze"
      >
        {newUserExhaustedFree && (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <ExpiredFreeSubscriptionPrompt onClose={() => setIsNewUserModal(false)}/>
      </EventModal>

      {/* Users with expired subscriptions */}
      <EventModal
        isVisible={userIsExpired}
        onClose={() => setUserIsExpired(false)}
        height="50%"
        width="100%"
        imageSrc={backgroundImage}
        showHeader={true}
        title="Eventyzze"
      >
        {userIsExpired && (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <ExpiredSubscriptionPrompt onClose={() => setIsNewUserModal(false)}/>
      </EventModal>

      {/* Already subscribed user */}

      <EventModal
        isVisible={userIsHost}
        onClose={() => setUserIsHost(false)}
        height="50%"
        width="100%"
        imageSrc={backgroundImage}
        showHeader={true}
        title="Eventyzze"
      >
        {userIsHost && (
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
        )}
        <SubscribedUserPrompt onClose={() => setIsNewUserModal(false)}/>
      </EventModal>
    </View>
  );
}
