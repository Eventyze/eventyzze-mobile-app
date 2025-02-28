import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CustomDatePicker = ({ value, onChange, placeholder = "YYYY-MM-DD" }:{value: string; onChange: (date:string)=> void; placeholder: string}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handlePress = () => {
    setShowPicker(true);
  };

  const handleDateChange = (selectedDate:any) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity 
        onPress={handlePress}
        className="w-full h-12 border rounded-lg px-4 flex flex-row items-center"
        style={{
          borderColor: value ? '#22c55e' : '#555555',
          borderWidth: value ? 2 : 1,
        }}
      >
        <Text 
          className={`text-base ${value ? 'text-black' : 'text-gray-500'}`}
        >
          {value ? value : placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default CustomDatePicker;