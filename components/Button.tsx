import React from "react";
import { Text, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome";

interface ButtonProps {
  title: any;
  gradientPadding?: number;
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
  gradientColors?: [string, string, string];
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
  gradientPadding,
  borderRadius,
  buttonWidth,
  gradientColors,
  buttonColour,
  disabled,
  textSize
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
      <LinearGradient
        colors={gradientColors || ["#082EB4", "#51468F", "#FF8038"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: borderRadius ? borderRadius : 30,
          width: "100%",
          padding: gradientPadding ? gradientPadding : 4,
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
      </LinearGradient>
    </Pressable>
  );
};

export default Button;
