import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
interface TimePickerProps {
    visible: boolean;
    onClose: ()=> void; // () => void
    onSelectTime: (obj:any) => void
    otherAction?: () => void
}
const TimePickerModal:React.FC<TimePickerProps> = ({ visible, onClose, onSelectTime, otherAction }) => {
  const generateTimeOptions = () => {
    let times = [];
    for (let i = 0; i < 24; i++) {
      let hour = i % 12 || 12; // Convert 0 to 12 for 12-hour format
      let period = i < 12 ? "AM" : "PM";
      times.push(`${hour} ${period}`);
    }
    return times;
  };

  const times = generateTimeOptions();

  return (
    <SafeAreaView className="">
    <StatusBar style="auto" />
    <Modal visible={visible} transparent animationType="slide">
      <View className="bg-red-900 mt-20 mb-8" style={{ flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Select Time</Text>
          <FlatList
            data={times}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderColor: "#FF8038",
                }}
                onPress={() => {
                  onSelectTime(item);
                  onClose();
                  otherAction ? otherAction() : ""
                }}
              >
                <Text style={{ fontSize: 18, padding: 6, justifyContent: "center", alignItems: "center", textAlign: 'center' }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity className="p-2 rounded-xl bg-[#FF8038] border mb-10" onPress={()=> {onClose(); otherAction ? otherAction() : null}} style={{ marginTop: 10 }}>
            <Text className="text-2xl" style={{ color: "black", textAlign: "center" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    </SafeAreaView>
  );
};


export default TimePickerModal