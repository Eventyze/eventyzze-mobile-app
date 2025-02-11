import React from 'react';
import { TextInput, TextInputProps, StyleSheet, ViewStyle, View, ActivityIndicator } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

interface InputFieldProps {
    placeholder: string;
    onpress?: () => void;
    width?: any;
    onChange?: (text: string) => void;
    value?: string;
    secureTextEntry?: boolean;
    textWidth?: any;
    borderColor?:any;
    keyboardType?:any;
    disabled?:boolean;
    textAlign?:any;
    borderSize?:any;
    isActivity?: boolean;
    isOkay?:boolean;
    isNotOkay?: boolean;
}

const styles = StyleSheet.create({
  input: {
    // width: '30%',
    height: 50,
    paddingLeft: 16,
    paddingRight: 40,
    paddingVertical: 12,
    // borderWidth: 1,
    // borderRadius: 8,
  },
});

export const InputField:React.FC<InputFieldProps> = ({textWidth, borderSize, disabled, secureTextEntry = false, value, textAlign, placeholder, onChange, width, borderColor, keyboardType, isActivity, isOkay, isNotOkay}: InputFieldProps) => {

    return(
        <View className={`flex-row w-full items-center ${borderSize ? `border-${borderSize}` : 'border'} rounded-xl px-2 py-1 mt-4`}
        style={{width: textWidth ? textWidth : '100%', borderColor: borderColor ? borderColor : "#C9C9C9"}}
        >
          <TextInput className='text-black'
          style={[styles.input, {fontFamily: "BarlowMedium", width: textWidth ? textWidth : '87%', textAlign: textAlign ? textAlign : ""}]}
          onChangeText={onChange}
          placeholder={placeholder}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ? keyboardType : "default"}
          editable={!disabled}
          />
          {isActivity && <ActivityIndicator size={30} color={"#FF8038"}/>}
          {isNotOkay && <Ionicons name="close" size={24} color="red" /> }
          {isOkay && <Ionicons name="checkmark-sharp" size={24} color="green" />}
        </View>
    )

}