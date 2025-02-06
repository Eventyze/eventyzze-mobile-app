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
  Platform
} from "react-native";
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import Button from "../../components/Button";
import Footer from "@/components/GeneralComponents/Footer";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
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
}
const CreateEventScreen = () => {
  const [calendarModal, setCalendarModal] = useState(false);
  const [caledndarActivity, setCalendarActivity] = useState(false);
  const [timeActivity, setTimeActivity] = useState(false);
  const [eventBannerActivity, setEventBannerActivity] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [videoUpload, setVideoUpload] = useState(false);
  const [currencyModal, setCurrencyModal] = useState(false);
  const [dateHolder, setDateHolder]= useState("")
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
  });
  const [loading, setLoading] = useState(false)

  const currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
    { code: "USD", name: "United States Dollar", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  ];

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      className={`flex-row items-center mt-4 my-2 py-2`}
      onPress={() =>
        { setEventData((prevData) => ({ ...prevData, currency: item.code })); setCurrencyModal(false); console.log(eventData)}
      }
    >
      <Text className={`text-2xl p-4 rounded-xl bg-[#FF8038]`}>
        {item.flag} - {item.code}
      </Text>
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

  const onDateChange = (event:DateTimePickerEvent, selectedDate:any) => {

    const currentDate = selectedDate;
    if (event.type === 'set' && selectedDate) {
      const date = new Date(currentDate);
      const dateOnly = date.toISOString().split('T')[0];  
      setEventData((prev) => ({ ...prev, date: dateOnly }));
      setDateHolder(dateOnly)
    }else if(event.type === "dismissed"){
      setEventData((prev) => ({ ...prev, date: "" }))
      setDateHolder("")
    }
    setCalendarModal(false);

    return setCalendarActivity(false)
  };

  const setimeSelectionModal = () => {
    if(!eventData.date){
      return Toast.show({
        type: "error",
        text1: "Select a date first please",
      });
    }
    setTimeActivity(true);
   return setTimeModal(true);
  }

  const onTimeChange = (event: DateTimePickerEvent, date: any) => {
    if (event.type === 'set' && date) {

      const selectedDateTime = new Date(date);

      
      const checkDate = new Date(date);
      const dateOnly = checkDate.toISOString().split('T')[0];
      
      const currentDateTime = new Date();

      if (dateOnly === dateHolder) {
        if (selectedDateTime.getTime() < currentDateTime.getTime()) {

          alert("Cannot select a past time for today");
          setTimeModal(false);
          setTimeActivity(false);
          return;
        }
        
        const timeDifferenceInMinutes = (selectedDateTime.getTime() - currentDateTime.getTime()) / (1000 * 60);
        if (timeDifferenceInMinutes < 30) {
          alert("Please select a time at least 30 minutes from now");
          setTimeModal(false);
          setTimeActivity(false);
          return;
        }
      }

      const timeOnly = selectedDateTime.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true 
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
          text1: 'File Too Large, Please select a video less than 10MB.',
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

  const handleContinue = async () => {
    setLoading(true)
    console.log(eventData);

    try{
    if (
      !eventData.ad ||
      !eventData.date ||
      !eventData.description ||
      !eventData.duration ||
      !eventData.time ||
      !eventData.title ||
      !eventData.image ||
      !eventData.amount ||
      !eventData.currency
    ) {
       Toast.show({
        type: "error",
        text1: "All fields are required",
      });
      return setLoading(false)
    }

    const data:any = new FormData()

    data.append('image', {
      uri: eventData.image,
      type: 'image/png', //getMimeType(eventData.image),
      name: `event-image.${eventData.image.split('.').pop()}`,
      size: undefined,
      lastModified: undefined,
    } as any)

    const videoUri = eventData.ad;
    const videoName = videoUri.split('/').pop();

    data.append('video', {
      uri: videoUri,
      type: 'video/mp4',
      name: videoName,
    });

    data.append('eventTitle', eventData.title)
    data.append('description', eventData.description)
    data.append('date', eventData.date)
    data.append('startTime', eventData.time)
    data.append('duration', eventData.duration)
    data.append('cost', eventData.amount)
    data.append('currency', eventData.currency)

    const response:any = await createEvent(data)

    console.log('res',response.data)

    if(response.status !== 201){
      setLoading(false)
     return Toast.show({
        type: 'error',
        text1: response.data?.message || 'Failed to create event',
      });
    }

    await storeLocalStorageData('event', response?.data?.data)

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
    })

    Toast.show({
      type: 'success',
      text1: response.data.message,
    });

    return router.push({
       pathname: '/create-event/event2',
      params: {
        videoUrl: response.data.data.eventAd,
        imageUrl: response.data.data.coverImage,
        title: response.data.data.eventTitle,
        description: response.data.data.description,
        startDate: response.data.data.date,
        time: response.data.data.startTime,
        cost: response.data.data.cost,
        currency: response.data.data.currency
      }
    })
  }catch(error:any){
    console.error('Error Creating event:', error.message);
    Toast.show({
      type: 'error',
      text1: 'Error Creating event:',
    });
  }finally{
    setLoading(false);
  }

  }

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
          <View className="w-full p-4">
            <Text
              className="text-2xl mt-2"
              style={{ fontFamily: "BarlowBold" }}
            >
              Event Title
            </Text>
            <InputField
              placeholder="Event Title"
              textWidth="100%"
              borderColor={eventData.title ? "green" : "#555555"}
              borderSize={eventData.title ? '2' : ''}
              onChange={(title) =>
                setEventData((prev: any) => ({ ...prev, title: title }))
              }
            />
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
                    borderSize={eventData.date ? '2' : ''}
                    disabled={true}
                  />
                </TouchableOpacity>
                  <View className="bg-gray-300 mt-2 h-full flex-1 justify-center items-center">
                    {calendarModal &&
                        <DateTimePicker
                          value={new Date()}
                          mode="date"
                          display={Platform.OS === "ios" ? "spinner" : "default"}
                          minimumDate={new Date()}
                          onChange={onDateChange}
                        />
                    }
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
                    borderSize={eventData.ad ? '2' : ''}
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
                borderSize={eventData.duration ? '2' : ''}
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
              <TouchableOpacity
                onPress={() => setimeSelectionModal()}
              >
                <InputField
                  value={eventData.time}
                  placeholder={"13:00"}
                  textWidth="100%"
                  borderColor={eventData.time ? "green" : "#555555"}
                  borderSize={eventData.time ? '2' : ''}
                  keyboardType={"numeric"}
                  disabled={true}
                />
              </TouchableOpacity>
                <View className="bg-gray-300 mt-2 h-full flex-1 justify-center items-center">
                    {timeModal &&
                        <DateTimePicker
                          value={new Date()}
                          mode="time"
                          display={Platform.OS === "ios" ? "spinner" : "default"}
                          minimumDate={new Date()}
                          onChange={onTimeChange}
                        />
                    }
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
                borderSize={eventData.image ? '2' : ''}
                disabled={true}
              />
            </TouchableOpacity>
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
                  borderSize={eventData.currency ? '2' : ''}
                  disabled={true}
                  textAlign={"center"}
               />
              </TouchableOpacity>
              <Modal
                visible={currencyModal}
                animationType="slide"
                presentationStyle="fullScreen"
              >
                <View className="flex-1 justify-center items-center">
                  <FlatList
                    data={currencies}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.code}
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
                borderSize={eventData.amount ? '2' : ''}
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
              action={handleContinue}
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
