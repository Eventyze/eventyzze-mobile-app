import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Modal as RNModal } from 'react-native';
import { useUser } from '@/context/UserContext';
import { logoutClear } from '@/services/axiosSetup/storage';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose }) => {

  const [logoutLoad, setLogoutLoad] = useState(false);

  const { logoutUser } = useUser()

  const handleLogout = async () => {

    setLogoutLoad(true);

    await logoutClear();

    logoutUser();

    onClose()

    Toast.show({
      type: 'success',
      text1: 'Good bye, we hope to see you again soon!',
      visibilityTime: 3000,
    });
    router.push('/login');
  }


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
              onPress={()=> {setLogoutLoad(false); onClose()}}
              className={`flex-1 py-3 rounded-lg bg-[#EDD3D3] ${logoutLoad ? 'opacity-50' : ''}`}
              disabled={logoutLoad}
            >
              <Text className="text-center text-[#CB3636] font-semibold text-lg">
                No
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> handleLogout()}
              className="flex-1 py-3 rounded-lg bg-[#DFEDD3]"
            >
              <Text className="text-center flex-1 justify-center items-center text-[#319F43] font-semibold text-lg">
              { logoutLoad ? <ActivityIndicator color="#FF8038" /> : 'Yes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default LogoutModal;
