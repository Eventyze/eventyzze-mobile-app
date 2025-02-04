import React from 'react';
import { TextInput, TextInputProps, StyleSheet, ViewStyle, View } from 'react-native';

interface InputFieldProps {
    placeholder: string;
    onpress?: () => void;
    width?: any;
    onChange?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
    textWidth?: any;
    borderColor?:any;
    keyboardType?:any
}

const styles = StyleSheet.create({
  input: {
    // width: '30%',
    height: 50,
    paddingLeft: 16,
    paddingRight: 50,
    paddingVertical: 12,
    // borderWidth: 1,
    // borderRadius: 8,
  },
});

export const InputField:React.FC<InputFieldProps> = ({textWidth, secureTextEntry = false, value, placeholder, onChange, width, borderColor, keyboardType,  onpress}: InputFieldProps) => {

    return(
        <View className='flex-row w-full items-center border rounded-xl px-2 py-1 mt-4'
        style={{width: textWidth ? textWidth : '100%', borderColor: borderColor ? borderColor : "#C9C9C9"}}
        >
          <TextInput className='text-black ml-2'
          style={[styles.input, {fontFamily: "BarlowMedium", width: textWidth ? textWidth : '87%'}]}
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ? keyboardType : "default"}
          />
        </View>
    )

}






          {/* <MaterialIcons 
          name="search"
          size={24}
          color="#fff"
          /> */}