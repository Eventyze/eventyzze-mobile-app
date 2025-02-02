import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  DimensionValue,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import curve from '../../assets/general/curve.png';
import { StatusBar, Image } from 'react-native'

interface EventModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  titleColor?: string;
  showHeader?: boolean;
  height?: DimensionValue;
  width?: DimensionValue;
  showCloseIcon?: boolean;
  closeOnBackdropPress?: boolean;
  imageSrc?: string | any;
}

const EventModal: React.FC<EventModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
  titleColor = '#000',
  showHeader = false,
  height = '40%',
  width = '100%',
  showCloseIcon = true,
  closeOnBackdropPress,
  imageSrc,
}) => {
  const modalStyle: ViewStyle = {
    height,
    width,
  };

  

  return (
    <RNModal
      animationType="slide"
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
        {imageSrc ? (
          <ImageBackground source={imageSrc} className="justify-end"
                style={{ height: '100%' }}
                resizeMode="cover"
          >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback className='bg-green-800'>         
              <View className="pt-10  mt-20" style={modalStyle}>
              <ImageBackground source={curve} className="flex-1 pt-10 justify-end">
                {showHeader && (
                  <View className="p-1 border-b border-gray-200">

                    <View className="flex-row justify-between items-center px-4">
                <Image
                  source={require("../../assets/general/eventyzze-logo.png")}
                  className=""
                  style={{
                    width: 50,
                    height: 50,
                  }}
                />  

                      {showCloseIcon && (
                        <TouchableOpacity onPress={onClose} className="p-2">
                          <Icon name="close" size={24} color="red" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
                <View className="flex-1 p-4">{children}</View>
                 </ImageBackground>
              </View> 
            </TouchableWithoutFeedback>
          </ImageBackground>
        ) : (
          <View className="flex-1 justify-end bg-black/50">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-t-3xl" style={modalStyle}>
                {showHeader && (
                  <View className="p-4 border-b border-gray-200">
                    <View className="items-center mb-2">
                      <View className="w-16 h-1 bg-gray-300 rounded-full" />
                    </View>

                    <View className="flex-row justify-between items-center">
                      {title && (
                        <Text
                          className="text-lg font-semibold"
                          style={{ fontFamily: 'BarlowBold', color: titleColor }}
                        >
                          {title}
                        </Text>
                      )}

                      {showCloseIcon && (
                        <TouchableOpacity onPress={onClose} className="p-2">
                          <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}

                <View className="flex-1 p-4">{children}</View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
    </RNModal>
  );
};

export default EventModal;
