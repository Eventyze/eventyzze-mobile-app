import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  Platform,
  ImageSourcePropType,
  TextInput,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import Button from "../../components/Button";
import Footer from "@/components/GeneralComponents/Footer";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-toast-message";
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
} from "expo-image-picker";
import { storeLocalStorageData } from "@/services/axiosSetup/storage";
import * as Permissions from "expo-media-library";
import Loading from "@/components/GeneralComponents/Loading";
import { createEvent } from "@/services/axiosFunctions/eventAxios/eventAxios";
import TimePickerModal from "@/components/GeneralComponents/TimePicker";
import { MaterialIcons } from "@expo/vector-icons";
import { isDateStrictlyBefore } from "../../utilities/utilities";

interface formEventDataInterface {
  title: string;
  description: string;
  date: any;
  duration: string;
  time: string;
  ad?: string;
  image?: any;
  amount?: string;
  currency?: string;
  earlyBirdAmount?: string;
  earlyBirdDeadline?: string;
  category: string;
}

const SecondEventCreationPage = () => {
  const params: any = useLocalSearchParams();
  const [calendarModal, setCalendarModal] = useState(false);
  const [caledndarActivity, setCalendarActivity] = useState(false);
  const [videoUpload, setVideoUpload] = useState(false);
  const [eventBannerActivity, setEventBannerActivity] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSetEvent, setIsSetEvent] = useState(false);
  const [includeEarlyBird, setIncludeEarlyBird] = useState<boolean>(false);
  const [dateHolder, setDateHolder] = useState("");
  const [earlyBirdDeadlineIndicator, setEarlyBirdDeadlineIndicator] =
    useState(false);

  const [eventData, setEventData] = useState<formEventDataInterface>({
    title: "",
    description: "",
    date: "",
    duration: "",
    time: "",
    ad: "",
    image: null,
    amount: "",
    currency: "",
    earlyBirdAmount: "",
    earlyBirdDeadline: "",
    category: "",
  });

  useEffect(() => {
    const loadDataFromParams = () => {
      setEventData({
        date: params.date,
        description: params.description,
        duration: params.duration,
        time: params.time,
        title: params.title,
        category: params.category,
      });

      const hasAllParams =
        params.date &&
        params.description &&
        params.duration &&
        params.time &&
        params.title &&
        params.category;

      setIsSetEvent(!!hasAllParams);
    };
    loadDataFromParams();
  }, [isSetEvent]);

  const currencies = [
    {
      code: "NGN",
      name: "Nigerian Naira",
      flag: "🇳🇬",
      description:
        "The official currency of Nigeria, widely used across West Africa.",
    },
    {
      code: "USD",
      name: "United States Dollar",
      flag: "🇺🇸",
      description:
        "The world's primary reserve currency, used in international trade worldwide.",
    },
    {
      code: "EUR",
      name: "Euro",
      flag: "🇪🇺",
      description:
        "The official currency of the Eurozone, used by 20 European countries and also accepted worldwide.",
    },
    {
      code: "GBP",
      name: "British Pound",
      flag: "🇬🇧",
      description:
        "The currency of the United Kingdom, also accepted worldwide",
    },
  ];

  const requestPermissions = async () => {
    const { status } = await Permissions.requestPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permission needed to access photos",
      });
      return false;
    }
    return true;
  };

  const handleVideoUpload = useCallback(async () => {
    setVideoUpload(true);
    const hasPermission = await requestPermissions();
    if (!hasPermission) return setVideoUpload(true);
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/*",
        copyToCacheDirectory: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        setVideoUpload(false);
        return;
      }

      const file: any = result.assets[0];

      if (file.size > 25 * 1024 * 1024) {
        Toast.show({
          type: "error",
          text1: "File Too Large, Please select a video not more than 25MB.",
        });
        setVideoUpload(false);
        return;
      }

      setEventData((prev) => ({ ...prev, ad: file.uri }));

      Toast.show({
        type: "success",
        text1: "Successful: Video has been selected.",
      });
      return setVideoUpload(false);
    } catch (error) {
      setVideoUpload(false);
      console.error("Error picking video:", error);
    }
  }, []);

  const pickImage = useCallback(async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setEventBannerActivity(true);

    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        setEventBannerActivity(false);
        return;
      }

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        if (
          selectedImage.fileSize &&
          selectedImage.fileSize > 5 * 1024 * 1024
        ) {
          setEventBannerActivity(false);
          Toast.show({
            type: "error",
            text1:
              "Image size is too large. Please select an image not more than 5MB.",
          });
          return;
        }

        setEventBannerActivity(false);
        setEventData((prevData) => ({
          ...prevData,
          image: selectedImage.uri,
        }));
      }
    } catch (error: any) {
      setEventBannerActivity(false);
      console.log(error.message);
      Toast.show({
        type: "error",
        text1: "Error selecting image",
      });
    }
  }, []);

  const renderCurrencies = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="flex-row items-center bg-gray-100 p-4 mb-3 rounded-lg"
      onPress={() => {
        setEventData((prevData) => ({
          ...prevData,
          currency: item.code,
          earlyBirdAmount: "",
          earlyBirdDeadline: "",
        }));
        setIncludeEarlyBird(false);
        setCurrencyModal(false);
      }}
    >
      <Text className="text-3xl mr-4">{item.flag}</Text>
      <View>
        <View>
          <Text className="text-lg font-semibold">
            {item.name} ({item.code})
          </Text>
        </View>
        <View className="pr-10">
          <Text className="text-gray-500 flex-wrap">{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const includeEarlyBirdSwitch = () => {

    if (includeEarlyBird === true && !eventData.currency || includeEarlyBird === true && !eventData.amount) {
      setEventData((prev) => ({
        ...prev,
        earlyBirdAmount: "",
        earlyBirdDeadline: "",
      }));
      return setIncludeEarlyBird(false)
    }

    if (!eventData.currency) {
      return Toast.show({
        type: "error",
        text1: "Select a currency first",
      });
    }
    if (!eventData.amount) {
      return Toast.show({
        type: "error",
        text1: "Input a ticket cost first",
      });
    }
    if (includeEarlyBird === true) {
      setEventData((prev) => ({
        ...prev,
        earlyBirdAmount: "",
        earlyBirdDeadline: "",
      }));
    }

    return setIncludeEarlyBird(!includeEarlyBird);
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate: any) => {
    try {
      const test = isDateStrictlyBefore(selectedDate, eventData.date);
      if (test === false) {
        setCalendarModal(false);
        setCalendarActivity(false);
        setEarlyBirdDeadlineIndicator(false);
        setEventData((prev) => ({ ...prev, earlyBirdDeadline: "" }));
        return Toast.show({
          type: "error",
          text1: `Early bird ticket deadline cannot be the same day as event date or on a date after event date. (Event Date: ${eventData.date})`,
        });
      }
      const currentDate = selectedDate;
      if (event.type === "set" && selectedDate) {
        const date = new Date(currentDate);
        const dateOnly = date.toISOString().split("T")[0];
        setEventData((prev) => ({ ...prev, earlyBirdDeadline: dateOnly }));
        setDateHolder(dateOnly);
      } else if (event.type === "dismissed") {
        setEventData((prev) => ({ ...prev, earlyBirdDeadline: "" }));
        setDateHolder("");
      }
      setCalendarModal(false);

      setEarlyBirdDeadlineIndicator(false);

      return setCalendarActivity(false);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      if (
        !eventData.ad ||
        !eventData.date ||
        !eventData.description ||
        !eventData.duration ||
        !eventData.time ||
        !eventData.title ||
        !eventData.image ||
        !eventData.amount ||
        !eventData.currency ||
        !eventData.category
      ) {
        Toast.show({
          type: "error",
          text1: "All fields are required",
        });
        return setLoading(false);
      }

      if (
        (includeEarlyBird === true && !eventData.earlyBirdAmount || includeEarlyBird === true && !eventData.earlyBirdDeadline)
      ) {
        Toast.show({
          type: "error",
          text1: "Early bird ticket must have a cost and a deadline",
        });
        return setLoading(false);
      }

      if (Number(eventData.earlyBirdAmount) >= Number(eventData.amount)) {
        setLoading(false)
        return Toast.show({
          type: "error",
          text1:
            "Early birds ticket cost cannot be greater or equal to normal ticket cost",
        });
      }

      const data: any = new FormData();

      data.append("image", {
        uri: eventData.image,
        type: "image/png",
        name: `event-image.${eventData.image.split(".").pop()}`,
        size: undefined,
        lastModified: undefined,
      } as any);

      const videoUri = eventData.ad;
      const videoName = videoUri.split("/").pop();

      data.append("video", {
        uri: videoUri,
        type: "video/mp4",
        name: videoName,
      });

      data.append("eventTitle", eventData.title);
      data.append("description", eventData.description);
      data.append("date", eventData.date);
      data.append("startTime", eventData.time);
      data.append("duration", eventData.duration);
      data.append("cost", eventData.amount);
      data.append("currency", eventData.currency);
      data.append("category", eventData.category);
      data.append("earlyBirdsStatus", includeEarlyBird)
      data.append("earlyBirdsCost", eventData.earlyBirdAmount)
      data.append("earlyBirdsDeadline", eventData.earlyBirdDeadline)

      const response: any = await createEvent(data);

      if (response.status !== 201) {
        setLoading(false);
        return Toast.show({
          type: "error",
          text1: response.data?.message || "Failed to create event",
        });
      }

      await storeLocalStorageData("event", response?.data?.data);

      setEventData({
        title: "",
        description: "",
        date: "",
        duration: "",
        time: "",
        ad: "",
        image: null,
        amount: "",
        currency: "",
        earlyBirdAmount: "",
        earlyBirdDeadline: "",
        category: "",
      });

      Toast.show({
        type: "success",
        text1: response.data.message,
      });

      router.push({
        pathname: "/create-event/event3",
        params: {
          videoUrl: response.data.data.eventAd,
          imageUrl: response.data.data.coverImage,
          title: response.data.data.eventTitle,
          description: response.data.data.description,
          startDate: response.data.data.date,
          time: response.data.data.startTime,
          cost: response.data.data.cost,
          currency: response.data.data.currency,
          earlyBirdStatus: String(includeEarlyBird),
          earlyBirdAmount: response.data.data.early_birds_discount,
          earlyBirdDeadline: response.data.data.early_birds_end_date
        },
      });

      return setTimeout(()=> {
        setIncludeEarlyBird(false)
      }, 5000)

    } catch (error: any) {
      console.error("Error Creating event:", error.message);
      Toast.show({
        type: "error",
        text1: "Error Creating event:",
      });
      return setLoading(false)
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white text-[#00000066]">
        <View className="pt-16 pb-2 pl-4">
          <Animated.View className="flex-row justify-between items-center">
            <View>
              <Text className="text-4xl" style={{ fontFamily: "BarlowBold" }}>
                Uploads and Ticket Details
              </Text>
            </View>
          </Animated.View>
        </View>
        <ScrollView
          className="flex-1 mb-20"
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View className="pl-3 pr-3 mt-10">
            <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
              Upload Event Ad <Text className="text-base">{"(<50mb)"}</Text>{" "}
              {videoUpload ? <ActivityIndicator color="#FF8038" /> : ""}
            </Text>
            <TouchableOpacity
              onPress={() => handleVideoUpload()}
              className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
              style={{
                borderColor: eventData.ad ? "#22c55e" : "#555555",
                borderWidth: eventData.ad ? 2 : 1,
              }}
            >
              <Text
                className={`text-base ${
                  eventData.ad ? "text-black" : "text-gray-500"
                }`}
              >
                {eventData.ad ? "Video Selected ✅" : "Select Video"}
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View className="pl-3 mt-6 pr-3">
            <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
              Event Banner <Text className="text-base">{"(<6mb)"}</Text>{" "}
              {eventBannerActivity ? <ActivityIndicator color="#FF8038" /> : ""}
            </Text>
            <TouchableOpacity
              onPress={() => pickImage()}
              className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
              style={{
                borderColor: eventData.image ? "#22c55e" : "#555555",
                borderWidth: eventData.image ? 2 : 1,
              }}
            >
              <Text
                className={`text-base ${
                  eventData.image ? "text-black" : "text-gray-500"
                }`}
              >
                {eventData.image ? "Image Selected ✅" : "Select Image"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View>
            <Text
              className="text-2xl mt-6 pl-3"
              style={{ fontFamily: "BarlowSemiBold" }}
            >
              Ticket Cost
            </Text>
            <View className="mb-5 mt-4 gap-6 pl-6 pr-6 justify-center items-center flex flex-row">
              <View className="w-[40%]">
                <Text className="text-lg">Currency</Text>
                <TouchableOpacity
                  onPress={() => setCurrencyModal(true)}
                  className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
                  style={{
                    borderColor: eventData.currency ? "#22c55e" : "#555555",
                    borderWidth: eventData.currency ? 2 : 1,
                  }}
                >
                  <Text
                    className={`text-base ${
                      eventData.currency ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {eventData.currency
                      ? eventData.currency
                      : "Select Currency"}
                  </Text>
                </TouchableOpacity>
                <Modal
                  visible={currencyModal}
                  animationType="slide"
                  presentationStyle="fullScreen"
                >
                  <View className="flex-1 bg-white">
                    <View className="p-4 flex flex-row justify-between border-b border-gray-300">
                      <Text className="text-xl font-bold">Select Currency</Text>
                      <TouchableOpacity onPress={() => setCurrencyModal(false)}>
                        <Text className="w-[70%] text-center">
                          {
                            <MaterialIcons
                              name="close"
                              size={25}
                              color="#FF8038"
                            />
                          }
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <FlatList
                      data={currencies}
                      renderItem={renderCurrencies}
                      keyExtractor={(item) => item.code}
                      contentContainerStyle={{ padding: 16 }}
                    />
                  </View>
                </Modal>
              </View>

              <View className="w-[60%]">
                <Text className="text-lg">Amount</Text>
                <InputField
                  value={eventData.amount}
                  placeholder={"10000"}
                  textWidth="100%"
                  borderColor={eventData.amount ? "#22c55e" : "#555555"}
                  borderSize={eventData.amount ? "2" : ""}
                  keyboardType={"numeric"}
                  onChange={(amount) => {
                    setIncludeEarlyBird(false);
                    setEventData((prev: any) => ({
                      ...prev,
                      amount: amount,
                      earlyBirdAmount: "",
                      earlyBirdDeadline: "",
                    }));
                  }}
                />
              </View>
            </View>
          </Animated.View>

          <Animated.View className="pl-3 mt-6 pr-3">
            <TouchableOpacity
              onPress={() => {
                includeEarlyBirdSwitch();
              }}
              className="flex flex-row items-center"
            >
              <View
                className="w-6 h-6 border rounded-md mr-2 items-center justify-center"
                style={{
                  borderColor: includeEarlyBird ? "#22c55e" : "#555555",
                  borderWidth: includeEarlyBird ? 2 : 1,
                  backgroundColor: includeEarlyBird
                    ? "rgba(34, 197, 94, 0.1)"
                    : "transparent",
                }}
              >
                {includeEarlyBird && <Text className="text-green-500">✓</Text>}
              </View>
              <Text
                className="text-lg"
                style={{ fontFamily: "BarlowSemiBold" }}
              >
                Include Early Bird Ticket
              </Text>
            </TouchableOpacity>

            {includeEarlyBird && (
              <View className="mt-6">
                <Text
                  className="text-2xl mb-2"
                  style={{ fontFamily: "BarlowSemiBold" }}
                >
                  Early Bird Ticket Cost
                </Text>
                <TextInput
                  value={eventData.earlyBirdAmount}
                  onChangeText={(earlybirdCost) => {
                    setEventData((prev: any) => ({
                      ...prev,
                      earlyBirdAmount: earlybirdCost,
                    }));
                  }}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  className="w-full text-base h-[60px] mt-4 border rounded-xl px-4 mb-4"
                  style={{
                    borderColor: eventData.earlyBirdAmount
                      ? "#22c55e"
                      : "#555555",
                    borderWidth: eventData.earlyBirdAmount ? 2 : 1,
                  }}
                />

                <Text
                  className="text-2xl mb-2"
                  style={{ fontFamily: "BarlowSemiBold" }}
                >
                  Early Bird Deadline{" "}
                  {earlyBirdDeadlineIndicator ? (
                    <ActivityIndicator color="#FF8038" />
                  ) : (
                    ""
                  )}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setCalendarActivity(true);
                    setCalendarModal(true);
                    setEarlyBirdDeadlineIndicator(true);
                  }}
                  className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
                  style={{
                    borderColor: eventData.earlyBirdDeadline
                      ? "#22c55e"
                      : "#555555",
                    borderWidth: eventData.earlyBirdDeadline ? 2 : 1,
                  }}
                >
                  <Text
                    className={`text-base ${
                      eventData.earlyBirdDeadline
                        ? "text-black"
                        : "text-gray-500"
                    }`}
                  >
                    {eventData.earlyBirdDeadline
                      ? eventData.earlyBirdDeadline
                      : "YYYY-MM-DD"}
                  </Text>
                </TouchableOpacity>

                <View className="h-full mt-4 flex-1 justify-center items-center">
                  {calendarModal && (
                    <Modal
                      visible={calendarModal}
                      animationType="slide"
                      transparent
                    >
                      <View className="bg-white h-full text-[#FF8038] flex-1 justify-center items-center">
                        {Platform.OS === "ios" && (
                          <Text className="mb-4">
                            Click date below to select date
                          </Text>
                        )}
                        <DateTimePicker
                          value={new Date()}
                          mode="date"
                          display="default"
                          minimumDate={new Date()}
                          onChange={onDateChange}
                        />
                      </View>
                    </Modal>
                  )}
                </View>
              </View>
            )}
          </Animated.View>

          <View className="gap-4 px-4 mt-8 mb-8">
            <Button
              title="Create Event"
              gradientPadding={1}
              gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
              buttonColour={"#FF8038"}
              buttonWidth={"full"}
              action={handleCreateEvent}
            />
          </View>
        </ScrollView>
        <Footer />
      </View>
      <Loading isOpen={loading} />
    </SafeAreaView>
  );
};

export default SecondEventCreationPage;
