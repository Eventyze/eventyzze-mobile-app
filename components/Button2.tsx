import React from "react";
import { Text, Pressable, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";

interface ButtonProps {
  title: any;
  borderRadius?: number;
  buttonColour?: string;
  buttonWidth?: any;
  action?: () => void;
  textColor?: string;
  isIcon?: boolean;
  isIcon2?: boolean;
  isIconName?: any;
  isIconSize?: number;
  isIconColor?: string;
  disabled?: boolean;
  textSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  isIcon2,
  textColor,
  isIconColor,
  isIconSize,
  action,
  isIconName,
  isIcon,
  borderRadius,
  buttonWidth,
  buttonColour,
  disabled,
  textSize,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={action}
      disabled={disabled}
      className={`justify-center rounded-3xl items-center`}
      style={{
        width: buttonWidth ? buttonWidth : "75%",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <View
        style={{
          borderRadius: borderRadius ? borderRadius : 30,
          width: "100%",
          padding: 1,
          backgroundColor: buttonColour ? buttonColour : "#082EB4", // Single color background
          opacity: disabled ? 0.8 : 1,
        }}
      >
        <View
          className={`p-4 gap-2 flex-row w-full justify-center items-center`}
          style={{
            borderRadius: 30,
            backgroundColor: buttonColour ? buttonColour : "#999999",
          }}
        >
          {isIcon && (
            <MaterialIcons
              name={isIconName ? isIconName : "facebook"}
              size={isIconSize ? isIconSize : 24}
              color={isIconColor ? isIconColor : "#fff"}
              style={{ opacity: disabled ? 0.6 : 1 }}
            />
          )}
          {isIcon2 && (
            <Icon
              name={isIconName ? isIconName : "facebook"}
              size={isIconSize ? isIconSize : 24}
              color={isIconColor ? isIconColor : "#fff"}
              style={{ opacity: disabled ? 0.6 : 1 }}
            />
          )}
          <Text
            className={`text-${textColor} ${textSize ? "text-[textSize]" : "text-xl"} font-extrabold`}
            style={{ opacity: disabled ? 0.6 : 1 }}
          >
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Button;
