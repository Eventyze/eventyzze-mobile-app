import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onLogout }) => {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-[90%] flex items-center justify-center h-[30%] rounded-2xl py-4 px-2">
          <Text className="text-2xl text-center font-bold mb-6">
            Do you wish to continue to log out?
          </Text>

          <View className="flex-row justify-between mt-6 gap-14 px-10">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3 rounded-lg bg-[#EDD3D3]"
            >
              <Text className="text-center text-[#CB3636] font-semibold text-lg">
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> {onLogout(); onClose()}}
              className="flex-1 py-3 rounded-lg bg-[#DFEDD3]"
            >
              <Text className="text-center text-[#319F43] font-semibold text-lg">
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default LogoutModal;
