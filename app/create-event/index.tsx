import React, { useState, useCallback } from "react";
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
} from "react-native";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import Button from "../../components/Button";
import Footer from "@/components/GeneralComponents/Footer";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
// import DatePicker from "react-native-modern-datepicker";
// import { getFormatedDate, getToday } from "react-native-modern-datepicker";
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

interface formEventDataInterface {
  title: string;
  description: string;
  date: any;
  duration: string;
  time: string;
  ad: string;
  image: any;
  amount: string;
  currency: string;
  category: string;
}
//description?:string
interface categoryData {
  id: string;
  name: string;
  image: ImageSourcePropType;
  description?: string;
}
const CreateEventScreen = () => {
  const [calendarModal, setCalendarModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [caledndarActivity, setCalendarActivity] = useState(false);
  const [timeActivity, setTimeActivity] = useState(false);
  const [eventBannerActivity, setEventBannerActivity] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [videoUpload, setVideoUpload] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [dateHolder, setDateHolder] = useState("");
  const [eventCategoryIndicator, setEventCategoryIndicator] = useState(false);
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
    category: "",
  });
  const [loading, setLoading] = useState(false);

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

  const categories: categoryData[] = React.useMemo(
    () => [
      {
        id: "1",
        name: "Concerts",
        image:
          require("../../assets/eventCategories/concert.jpg") as ImageSourcePropType,
        description:
          "Organize live music performances, band shows, or singing competitions.",
      },
      {
        id: "2",
        name: "Sport",
        image:
          require("../../assets/eventCategories/sports.jpg") as ImageSourcePropType,
        description:
          "Host sports tournaments, fitness challenges, or athletic events.",
      },
      {
        id: "3",
        name: "Technology",
        image:
          require("../../assets/eventCategories/tech.jpg") as ImageSourcePropType,
        description:
          "Set up hackathons, tech conferences, or product showcases.",
      },
      {
        id: "4",
        name: "Gaming",
        image:
          require("../../assets/eventCategories/gaming.jpg") as ImageSourcePropType,
        description:
          "Create gaming tournaments, eSports competitions, or game launches.",
      },
      {
        id: "5",
        name: "Science",
        image:
          require("../../assets/eventCategories/science.jpg") as ImageSourcePropType,
        description:
          "Plan science fairs, research symposiums, or innovation expos.",
      },
      {
        id: "6",
        name: "Networking",
        image:
          require("../../assets/eventCategories/networking.jpg") as ImageSourcePropType,
        description:
          "Arrange professional meetups, career fairs, or industry mixers.",
      },
      {
        id: "7",
        name: "Fashion",
        image:
          require("../../assets/eventCategories/fashion.jpg") as ImageSourcePropType,
        description:
          "Host fashion shows, styling workshops, or designer showcases.",
      },
      {
        id: "8",
        name: "Beauty",
        image:
          require("../../assets/eventCategories/beauty.jpg") as ImageSourcePropType,
        description:
          "Organize beauty masterclasses, product launches, or wellness sessions.",
      },
      {
        id: "9",
        name: "Fitness",
        image:
          require("../../assets/eventCategories/fitness.jpg") as ImageSourcePropType,
        description: "Plan workout boot camps, marathons, or yoga retreats.",
      },
      {
        id: "10",
        name: "Art",
        image:
          require("../../assets/eventCategories/art.jpg") as ImageSourcePropType,
        description:
          "Curate art exhibitions, creative workshops, or live painting events.",
      },
      {
        id: "11",
        name: "Cultural events",
        image:
          require("../../assets/eventCategories/culture.jpg") as ImageSourcePropType,
        description:
          "Celebrate traditions with cultural festivals, heritage events, or folk performances.",
      },
      {
        id: "12",
        name: "Literature",
        image:
          require("../../assets/eventCategories/literature.jpg") as ImageSourcePropType,
        description: "Host book launches, poetry readings, or writer meetups.",
      },
      {
        id: "13",
        name: "Seminars",
        image:
          require("../../assets/eventCategories/seminar.jpg") as ImageSourcePropType,
        description:
          "Conduct educational sessions, expert talks, or training workshops.",
      },
      {
        id: "14",
        name: "Nature",
        image:
          require("../../assets/eventCategories/nature.jpg") as ImageSourcePropType,
        description:
          "Plan eco-friendly events, outdoor adventures, or nature conservation drives.",
      },
      {
        id: "15",
        name: "Charity",
        image:
          require("../../assets/eventCategories/charity.jpg") as ImageSourcePropType,
        description:
          "Organize fundraising campaigns, community outreach programs, or donation drives.",
      },
      {
        id: "16",
        name: "Cooking",
        image:
          require("../../assets/eventCategories/cooking.jpg") as ImageSourcePropType,
        description:
          "Set up cooking classes, food tastings, or chef competitions.",
      },
      {
        id: "17",
        name: "Dance",
        image:
          require("../../assets/eventCategories/dance.jpg") as ImageSourcePropType,
        description: "Host dance workshops, performances, or dance battles.",
      },
      {
        id: "18",
        name: "Travel",
        image:
          require("../../assets/eventCategories/travel.jpg") as ImageSourcePropType,
        description:
          "Organize travel expos, adventure tours, or trip planning sessions.",
      },
      {
        id: "19",
        name: "Movies",
        image:
          require("../../assets/eventCategories/movie.jpg") as ImageSourcePropType,
        description:
          "Arrange film screenings, premieres, or cinema-related discussions.",
      },
      {
        id: "20",
        name: "Music and Entertainment",
        image:
          require("../../assets/eventCategories/music.jpg") as ImageSourcePropType,
        description:
          "Plan entertainment nights, live shows, or music festivals.",
      },
      {
        id: "21",
        name: "Festivals",
        image:
          require("../../assets/eventCategories/festival.jpg") as ImageSourcePropType,
        description:
          "Organize large-scale celebrations, seasonal festivals, or themed parties.",
      },
      {
        id: "22",
        name: "Other",
        image:
          require("../../assets/eventCategories/other.jpg") as ImageSourcePropType,
        description:
          "If your event doesn’t fit into any category, select this option",
      },
    ],
    []
  );

  const renderCurrencies = ({ item }: { item: any }) => (
    <TouchableOpacity
      className="flex-row items-center bg-gray-100 p-4 mb-3 rounded-lg"
      onPress={() => {
        setEventData((prevData) => ({ ...prevData, currency: item.code }));
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

  const renderCategories = ({ item }: { item: categoryData }) => (
    <TouchableOpacity
      className="w-full px-4 py-2"
      onPress={() => {
        setEventData((prevData) => ({ ...prevData, category: item.name }));
        setCategoryModal(false);
        setEventCategoryIndicator(false);
      }}
    >
      <View className="flex-row items-center bg-white p-3 rounded-lg shadow-xl">
        {/* Category Image */}
        <Image source={item?.image} className="w-20 h-20 rounded-full" />

        {/* Text Content */}
        <View className="ml-4 flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {item.name}
          </Text>
          {item?.description && (
            <Text className="text-sm text-gray-500 mt-1">
              {item.description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // const getMimeType = (uri: string) => {
  //   const extension:any = uri.split('.').pop()?.toLowerCase();
  //   const mimeTypes: Record<string, string> = {
  //     jpg: 'image/jpeg',
  //     jpeg: 'image/jpeg',
  //     png: 'image/png',
  //     gif: 'image/gif',
  //     mp4: 'video/mp4',
  //     mov: 'video/quicktime',
  //     avi: 'video/x-msvideo',
  //   };
  //   return mimeTypes[extension] || 'application/octet-stream';
  // };

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

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        if (
          selectedImage.fileSize &&
          selectedImage.fileSize > 10 * 1024 * 1024
        ) {
          setEventBannerActivity(false);
          Toast.show({
            type: "error",
            text1:
              "Image size is too large. Please select an image under 10MB.",
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
      console.log(error.message);
      Toast.show({
        type: "error",
        text1: "Error selecting image",
      });
    }
  }, []);

  const onDateChange = (event: DateTimePickerEvent, selectedDate: any) => {
    const currentDate = selectedDate;
    if (event.type === "set" && selectedDate) {
      const date = new Date(currentDate);
      const dateOnly = date.toISOString().split("T")[0];
      setEventData((prev) => ({ ...prev, date: dateOnly }));
      setDateHolder(dateOnly);
    } else if (event.type === "dismissed") {
      setEventData((prev) => ({ ...prev, date: "" }));
      setDateHolder("");
    }
    setCalendarModal(false);

    return setCalendarActivity(false);
  };

  const setimeSelectionModal = () => {
    if (!eventData.date) {
      return Toast.show({
        type: "error",
        text1: "Select a date first please",
      });
    }
    setTimeActivity(true);
    return setTimeModal(true);
  };

  const onTimeChange = (event: DateTimePickerEvent, date: any) => {
    if (event.type === "set" && date) {
      const selectedDateTime = new Date(date);

      const checkDate = new Date(date);
      const dateOnly = checkDate.toISOString().split("T")[0];

      const currentDateTime = new Date();

      if (dateOnly === dateHolder) {
        if (selectedDateTime.getTime() < currentDateTime.getTime()) {
          alert("Cannot select a past time for today");
          setTimeModal(false);
          setTimeActivity(false);
          return;
        }

        const timeDifferenceInMinutes =
          (selectedDateTime.getTime() - currentDateTime.getTime()) /
          (1000 * 60);
        if (timeDifferenceInMinutes < 30) {
          alert("Please select a time at least 30 minutes from now");
          setTimeModal(false);
          setTimeActivity(false);
          return;
        }
      }

      const timeOnly = selectedDateTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setEventData((prev) => ({ ...prev, time: timeOnly }));
    } else if (event.type === "dismissed") {
      setEventData((prev) => ({ ...prev, time: "" }));
    }

    setTimeModal(false);
    setTimeActivity(false);
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

      if (file.size > 10 * 1024 * 1024) {
        Toast.show({
          type: "error",
          text1: "File Too Large, Please select a video less than 10MB.",
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

      const data: any = new FormData();

      data.append("image", {
        uri: eventData.image,
        type: "image/png", //getMimeType(eventData.image),
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
        category: "",
      });

      Toast.show({
        type: "success",
        text1: response.data.message,
      });

      return router.push({
        pathname: "/create-event/event2",
        params: {
          videoUrl: response.data.data.eventAd,
          imageUrl: response.data.data.coverImage,
          title: response.data.data.eventTitle,
          description: response.data.data.description,
          startDate: response.data.data.date,
          time: response.data.data.startTime,
          cost: response.data.data.cost,
          currency: response.data.data.currency,
        },
      });
    } catch (error: any) {
      console.error("Error Creating event:", error.message);
      Toast.show({
        type: "error",
        text1: "Error Creating event:",
      });
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
                Create Event
              </Text>
            </View>
          </Animated.View>
        </View>
        <ScrollView
          className="flex-1 mb-20"
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full pl-4 pr-4">
            <Text
              className="text-2xl mt-2"
              style={{ fontFamily: "BarlowBold" }}
            >
              Event Title
            </Text>
            <InputField
              placeholder="Event Title"
              textWidth="100%"
              maxLength={60}
              borderColor={eventData.title ? "green" : "#555555"}
              borderSize={eventData.title ? "2" : ""}
              onChange={(title) =>
                setEventData((prev: any) => ({ ...prev, title: title }))
              }
            />
            <View className="">
            <Text className="text-left mt-1 text-sm text-gray-400">{eventData.title.length}/60</Text>
            </View>
            
          </View>

          <Animated.View className="p-4">
            <View>
              <Text
                className="text-2xl mt-2"
                style={{ fontFamily: "BarlowBold" }}
              >
                Event Description
              </Text>
            </View>
            <View className="w-full items-center mt-4">
              <TextArea
                placeholder={
                  eventData.description ? eventData.description : "Eventyzze"
                }
                value={eventData.description}
                onChangeText={(desc) =>
                  setEventData((prev: any) => ({ ...prev, description: desc }))
                }
                borderColor={eventData.description ? "green" : "#555555"}
                borderSize={eventData.description ? 2 : null}
              />
            </View>
          </Animated.View>

          <Animated.View className="justify-between items-center">
            <View className="flex-1 flex-row gap-10 pr-4 pl-4">
              <View className="w-[45%]">
                <Text
                  className="text-2xl"
                  style={{ fontFamily: "BarlowSemiBold" }}
                >
                  Date{" "}
                  {caledndarActivity ? (
                    <ActivityIndicator color="#FF8038" />
                  ) : (
                    ""
                  )}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setCalendarActivity(true);
                    setCalendarModal(true);
                  }}
                >
                  {/* <Text>Hi</Text> */}
                  <InputField
                    value={eventData.date}
                    placeholder={eventData.date ? eventData.date : "YYYY-MM-DD"}
                    textWidth="100%"
                    borderColor={eventData.date ? "green" : "#555555"}
                    borderSize={eventData.date ? "2" : ""}
                    disabled={true}
                  />
                </TouchableOpacity>
                <View className="bg-gray-300 mt-2 h-full flex-1 justify-center items-center">
                  {calendarModal && (
                    <DateTimePicker
                      value={new Date()}
                      mode="date"
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      minimumDate={new Date()}
                      onChange={onDateChange}
                    />
                  )}
                </View>
              </View>

              <View className="w-[45%]">
                <Text
                  className="text-2xl"
                  style={{ fontFamily: "BarlowSemiBold" }}
                >
                  Upload Ad <Text className="text-base">{"(<10mb)"}</Text>{" "}
                  {videoUpload ? <ActivityIndicator color="#FF8038" /> : ""}
                </Text>
                <TouchableOpacity
                  className="rounded-xl"
                  onPress={handleVideoUpload}
                >
                  <InputField
                    // value={eventData.ad}
                    placeholder={eventData.ad ? "Video Selected ✅" : "Video"}
                    textWidth="100%"
                    borderColor={eventData.ad ? "green" : "#555555"}
                    borderSize={eventData.ad ? "2" : ""}
                    keyboardType={"numeric"}
                    disabled={true}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          <Animated.View className="mb-5 mt-4 pl-3 pr-3 gap-10 justify-center items-center flex flex-row">
            <View className="w-[45%]">
              <Text
                className="text-2xl"
                style={{ fontFamily: "BarlowSemiBold" }}
              >
                Duration <Text className="text-base">(minutes)</Text>
              </Text>
              <InputField
                value={eventData.duration}
                placeholder={"eg 30"}
                textWidth="100%"
                borderColor={eventData.duration ? "green" : "#555555"}
                borderSize={eventData.duration ? "2" : ""}
                keyboardType={"numeric"}
                onChange={(duration) =>
                  setEventData((prev: any) => ({ ...prev, duration: duration }))
                }
              />
            </View>

            <View className="w-[45%]">
              <Text
                className="text-2xl"
                style={{ fontFamily: "BarlowSemiBold" }}
              >
                Time {timeActivity ? <ActivityIndicator color="#FF8038" /> : ""}
              </Text>
              <TouchableOpacity onPress={() => setimeSelectionModal()}>
                <InputField
                  value={eventData.time}
                  placeholder={"13:00"}
                  textWidth="100%"
                  borderColor={eventData.time ? "green" : "#555555"}
                  borderSize={eventData.time ? "2" : ""}
                  keyboardType={"numeric"}
                  disabled={true}
                />
              </TouchableOpacity>
              <View className="bg-gray-300 mt-2 h-full flex-1 justify-center items-center">
                {timeModal && (
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    minimumDate={new Date()}
                    onChange={onTimeChange}
                  />
                )}
              </View>
            </View>
          </Animated.View>

          <Animated.View className="pl-3 pr-3">
            <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
              Event Banner{" "}
              {eventBannerActivity ? <ActivityIndicator color="#FF8038" /> : ""}
            </Text>
            <TouchableOpacity onPress={pickImage}>
              <InputField
                placeholder={
                  eventData.image ? "Image Selected ✅" : "Image <10mb"
                }
                textWidth="100%"
                borderColor={eventData.image ? "green" : "#555555"}
                borderSize={eventData.image ? "2" : ""}
                disabled={true}
              />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View className="pl-3 pr-3 mt-4">
            <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
              Categories{" "}
              {eventCategoryIndicator ? (
                <ActivityIndicator color="#FF8038" />
              ) : (
                ""
              )}
            </Text>

            <TouchableOpacity
              onPress={() => {
                setCategoryModal(true);
                setEventCategoryIndicator(true);
              }}
            >
              <InputField
                placeholder="Select Category"
                textWidth="100%"
                value={eventData.category}
                borderColor={eventData.category ? "green" : "#555555"}
                borderSize={eventData.category ? "2" : ""}
                disabled={true}
              />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            <Modal
              visible={categoryModal}
              animationType="slide"
              // presentationStyle="fullScreen"
              transparent
              onDismiss={() => {
                setCategoryModal(false);
                setEventCategoryIndicator(false);
              }}
            >
              <View className="bg-white h-full mt-4 my-2 px-2 py-2">
                <View className="mb-4 pb-4 justify-between flex flex-row">
                  <Text
                    className="text-2xl w-[50%] font-bold"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                    Select a Category
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setCategoryModal(false);
                      setEventCategoryIndicator(false);
                    }}
                    className="w-[10%] shadow-2xl rounded-full justify-center items-center"
                  >
                    <Text className="text-center w-[100%]">
                      {<MaterialIcons name="close" size={25} color="#FF8038" />}
                    </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  className="h-[80%]"
                  showsVerticalScrollIndicator={true}
                >
                  {categories.map((item, index) => (
                    <View key={item.id || item.name}>
                      {renderCategories({ item })}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </Modal>
          </Animated.View>

          <Text
            className="text-2xl mt-6 pl-3"
            style={{ fontFamily: "BarlowSemiBold" }}
          >
            Ticket Cost
          </Text>
          <Animated.View className="mb-5 mt-4 gap-6 pl-6 pr-6 justify-center items-center flex flex-row">
            <View className="w-[40%]">
              <Text className="text-lg">Currency</Text>
              <TouchableOpacity onPress={() => setCurrencyModal(true)}>
                <InputField
                  // value={eventData.currency}
                  placeholder={eventData.currency ? eventData.currency : "NGN"}
                  textWidth="100%"
                  borderColor={eventData.currency ? "green" : "#555555"}
                  borderSize={eventData.currency ? "2" : ""}
                  disabled={true}
                  textAlign={"center"}
                />
              </TouchableOpacity>
              <Modal
                visible={currencyModal}
                animationType="slide"
                presentationStyle="fullScreen"
              >
                <View className="flex-1 bg-white">
                  <View className="p-4 flex flex-row justify-between border-b border-gray-300">
                    <Text className="text-xl font-bold">
                      Select Currency
                    </Text>
                  <TouchableOpacity onPress={() => setCurrencyModal(false)}>
                    <Text className="w-[70%] text-center">
                      {<MaterialIcons name="close" size={25} color="#FF8038" />}
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
                borderColor={eventData.amount ? "green" : "#555555"}
                borderSize={eventData.amount ? "2" : ""}
                keyboardType={"numeric"}
                onChange={(amount) =>
                  setEventData((prev: any) => ({ ...prev, amount: amount }))
                }
              />
            </View>
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

export default CreateEventScreen;
