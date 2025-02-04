import React, { useState } from 'react';
import { View, Text, Modal, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import TextArea from "../../components/GeneralComponents/TextAreaComponent";
import Button from "../../components/Button";
import Footer from '@/components/GeneralComponents/Footer';
import DatePicker from 'react-native-modern-datepicker';
import {getFormatedDate, getToday} from 'react-native-modern-datepicker';

const CreateEventScreen = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState("");
  const [eventDuration, setEventDuration] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [calendar, setCalendar] = useState(false);
  const [date, setDate] = useState('')




  const today:any = new Date();

  const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD') 

  const handleDateChange = (selectedDate:string) => {
    setDate(selectedDate)
  }

  const handleDateClose = () => {
    return setCalendar(false)
  }

  const handleContinue = () => {
    console.log({
      eventTitle,
      eventDescription,
      eventDate,
      eventDuration,
      eventTime,
    });
router.push('/create-event/event2')
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
      <ScrollView className="flex-1 mb-20" keyboardShouldPersistTaps="handled">
      <View className="w-full p-4">
        <Text className="text-2xl mt-2" style={{ fontFamily: "BarlowBold" }}>Event Title</Text>
              <InputField
                placeholder="Event Title"
                textWidth="100%"
                borderColor={"#555555"}
              />
            </View>

            <Animated.View className="p-4">
            <View>
              <Text className="text-2xl mt-2" style={{ fontFamily: "BarlowBold" }}>
                Event Description
              </Text>
            </View>
            <View className="w-full items-center mt-4">
              <TextArea 
                placeholder={bio ? bio : "Eventyzze"} 
                value={bio}
                onChangeText={setBio}
                borderColor={"#555555"}
              />
            </View>
          </Animated.View>

    <Animated.View  className='justify-between items-center'>
        <View className='flex-1 flex-row gap-20 justify-between items-center pr-4 pl-4'>

      <View className="w-[40%]">
        <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>Date</Text>

        <TouchableOpacity onPress={() => setCalendar(true)} className='border border-[#555555] p-5 rounded-xl mb-5 mt-4'>
            <Text>{date ? date : "2025/09/12"}</Text>
        </TouchableOpacity>
        <Modal
        visible={calendar}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setCalendar(false)}
        >
        <View className='bg-gray-300 h-full flex-1 justify-center items-center'>
            <DatePicker
            mode='calendar' 
            selected={date}
            onDateChange={(selectedDate)=> handleDateChange(selectedDate)}
            minimumDate={startDate}
            style={{backgroundColor: '#55555'}}
            />
            <View className=''>
            <Button
            title="Close"
            gradientPadding={1}
            gradientColors={["#808080", "#808080", "#808080"]}
            buttonColour={"#808080"}
            buttonWidth={"[50px]"}
            action={handleDateClose}
          />
          </View>
          </View>
        </Modal>
      </View>

        <View className='w-[40%]'>
        <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>Upload Ad.</Text>
      <TouchableOpacity className="p-5 border border-[#555555] rounded-xl mb-5 mt-4">
      <Text className="" style={{ fontFamily: "Normal" }}>Select File</Text>
      </TouchableOpacity>
      </View>

      </View>
      </Animated.View >

      <Animated.View  className="mb-5  pl-4 pr-4 gap-20 justify-center items-center flex flex-row">

        <View className='w-[40%]'>
        <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>Duration <Text className='text-base'>(minutes)</Text></Text>
        <InputField
        value={eventDuration} 
        placeholder={'eg 30'}
        textWidth = "100%"
        borderColor={"#555555"}
        keyboardType={'numeric'}
        />
        </View>

      <View className="w-[40%]">
        <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>Time</Text>
        <InputField
        placeholder={'8.00 pm'} 
        borderColor={"#555555"}       
        />
      </View>
      </Animated.View >


      <View className="gap-4 px-4 mt-8 mb-8">
          <Button
            title="Next"
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"full"}
          />
        </View>
            </ScrollView>
    <Footer />
    </View>

    </SafeAreaView>
  );
};

export default CreateEventScreen;
