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
}

const styles = StyleSheet.create({
  input: {
    // width: '30%',
    height: 50,
    paddingLeft: 16,
    paddingRight: 50,
    paddingVertical: 12,
    // borderWidth: 1,
    // borderColor: '#E5E5E5',
    // borderRadius: 8,
  },
});

export const InputField:React.FC<InputFieldProps> = ({textWidth, secureTextEntry = false, value, placeholder, onChange, width,  onpress}: InputFieldProps) => {

    return(
        <View className='flex-row w-full items-center border-[#C9C9C9] border rounded-xl px-2 py-1 mt-4'
        style={{width: textWidth ? textWidth : '100%'}}
        >
          <TextInput className='text-black ml-2'
          style={[styles.input, {fontFamily: "BarlowMedium", width: textWidth ? textWidth : '87%'}]}
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          />
        </View>
    )

}






          {/* <MaterialIcons 
          name="search"
          size={24}
          color="#fff"
          /> */}