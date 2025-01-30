import React from 'react';
import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  ViewStyle,
  DimensionValue,
  ImageBackground
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ModalProps {
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
  imageSrc?: string | any
}

const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  title,
  titleColor = '#000',
  showHeader = true,
  height = '50%',
  width = '100%',
  showCloseIcon = true,
  closeOnBackdropPress = true,
}) => {
  const modalStyle: ViewStyle = {
    height,
    width,
  };

  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback 
        onPress={() => closeOnBackdropPress && onClose()}
      >
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View 
              className="bg-white rounded-t-3xl"
              style={modalStyle}
            >
              {showHeader && (
                <View className="p-4 border-b border-gray-200">
                  <View className="items-center mb-2">
                    <View className="w-16 h-1 bg-gray-300 rounded-full" />
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    {title && (
                      <Text 
                        className="text-lg font-semibold"
                        style={{ fontFamily: "BarlowBold", color: titleColor }}
                      >
                        {title}
                      </Text>
                    )}
                    
                    {showCloseIcon && (
                      <TouchableOpacity 
                        onPress={onClose}
                        className="p-2"
                      >
                        <Icon name="close" size={24} color="#000" />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              
              <View className="flex-1 p-4">
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;