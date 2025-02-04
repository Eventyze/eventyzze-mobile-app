import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface TextAreaProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  borderColor?: any;
}

const TextArea:React.FC<TextAreaProps> = ({placeholder, value, onChangeText, borderColor}) => {
  // const [text, setText] = useState("");

  // const handleChange = (input:string) => {
  //   if (input.length <= 500) {
  //     setText(input);
  //   }
  // };


  return (
    <View className="w-full">
      <View className="h-40 border rounded-lg"
      style={{borderColor: borderColor ? borderColor : "#C9C9C9"}}
      >
      <TextInput
        className="p-3 text-base text-black"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ? placeholder : "Type your message here..."}
        placeholderTextColor="#C9C9C9"
        multiline
        maxLength={500} // Ensures no input beyond 500 characters
      />
    </View>
      <Text className="text-left mt-1 text-sm text-gray-400">{value.length}/500</Text>
    </View>
  );
}

export default TextArea