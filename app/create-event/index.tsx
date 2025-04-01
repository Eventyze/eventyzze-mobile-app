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
  const [timeModal, setTimeModal] = useState(false);
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

  const handleEventCreationNext = async () => {
    if (loading) return;
    setLoading(true);
    try{
      if (
        !eventData.date ||
        !eventData.description ||
        !eventData.duration ||
        !eventData.time ||
        !eventData.title ||
        !eventData.category
      ) {
        Toast.show({
          type: "error",
          text1: "All fields are required",
        });
        return setLoading(false);
      }

      await Promise.all([
      router.push({
        pathname: "/create-event/event2",
        params: {
          date: eventData.date,
          description: eventData.description,
          duration: eventData.duration,
          time: eventData.time,
          title: eventData.title,
          category: eventData.category,
        },
      }),
      new Promise(resolve => setTimeout(resolve, 500))
      ]) 
    }catch(error:any){
      Toast.show({
        type: "error",
        text1: error.message,
      })
    }finally{
      setLoading(false)
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
              borderColor={eventData.title ? "#22c55e" : "#555555"}
              borderSize={eventData.title ? "2" : ""}
              onChange={(title) =>
                setEventData((prev: any) => ({ ...prev, title: title }))
              }
            />
            <View className="">
              <Text className="text-left mt-1 text-sm text-gray-400">
                {eventData.title.length}/60
              </Text>
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
                borderColor={eventData.description ? "#22c55e" : "#555555"}
                borderSize={eventData.description ? 2 : null}
              />
            </View>
          </Animated.View>

          <Animated.View className="justify-between items-center">
            <View className="flex-1 flex-row w-full p-4">
              <View className="w-full">
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
                  className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
                  style={{
                    borderColor: eventData.date ? "#22c55e" : "#555555",
                    borderWidth: eventData.date ? 2 : 1,
                  }}
                >
                  <Text
                    className={`text-base ${
                      eventData.date ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {eventData.date ? eventData.date : "YYYY-MM-DD"}
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
                    {Platform.OS === "ios" && <Text className="mb-4">Click date below to select date</Text>}
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

            </View>
          </Animated.View>

          <Animated.View className="mb-5 pl-3 pr-3 justify-center items-center flex flex-row">
          <View className="w-full">
              <Text
                className="text-2xl"
                style={{ fontFamily: "BarlowSemiBold" }}
              >
                Time {timeActivity ? <ActivityIndicator color="#FF8038" /> : ""}
              </Text>
              <TouchableOpacity onPress={() => setimeSelectionModal()}
               className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
               style={{
                borderColor: eventData.time ? "#22c55e" : "#555555",
                borderWidth: eventData.time ? 2 : 1,
              }}
                >
                  <Text
                    className={`text-base ${
                      eventData.time ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {eventData.time ? eventData.time : "eg: 8:00 PM"}
                  </Text>
              </TouchableOpacity>
              <View className="h-full mt-2 flex-1 justify-center items-center">
                {timeModal && (
                     <Modal
                visible={timeModal}
                animationType="slide"
                transparent
              >
                  <View className="bg-white h-full text-[#FF8038] justify-center items-center flex-1">
                  {Platform.OS === "ios" && <Text className="mb-4">Click time below to select time</Text>}
                  <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display="default"
                    minimumDate={new Date()}
                    onChange={onTimeChange}
                  />
                  </View>
                  </Modal>
                )}
              </View>
            </View>
          </Animated.View>

          <Animated.View className="mb-5 pl-3 pr-3 gap-10 justify-center items-center flex flex-row">
            <View className="w-full">
              <Text
                className="text-2xl"
                style={{ fontFamily: "BarlowSemiBold" }}
              >
                Duration <Text className="text-base">(minutes)</Text>
              </Text>
              <InputField
                value={eventData.duration}
                placeholder={"eg: 30"}
                textWidth="100%"
                borderColor={eventData.duration ? "#22c55e" : "#555555"}
                borderSize={eventData.duration ? "2" : ""}
                keyboardType={"numeric"}
                onChange={(duration) =>
                  setEventData((prev: any) => ({ ...prev, duration: duration }))
                }
              />
            </View>
          </Animated.View>

          <Animated.View className="pl-3 pr-3 mt-4">
            <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
              Event Category{" "}
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
              className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
                  style={{
                    borderColor: eventData.category ? "#22c55e" : "#555555",
                    borderWidth: eventData.category ? 2 : 1,
                  }}
            >
                 <Text
                    className={`text-base ${
                      eventData.category ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {eventData.category ? eventData.category : "Select Category"}
                  </Text>
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

          <View className="gap-4 px-4 mt-8 mb-8">
            <Button
              title={loading ? "Loading..." : "Next"}
              gradientPadding={1}
              gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
              buttonColour={"#FF8038"}
              buttonWidth={"full"}
              action={handleEventCreationNext}
              disabled={loading}
            />
          </View>
        </ScrollView>
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default CreateEventScreen;
