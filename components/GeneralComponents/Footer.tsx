import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router, useFocusEffect, usePathname } from 'expo-router';
import Modal from './Modal';

export default function Footer() {
  const currentPath = usePathname();
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Add this useEffect to handle cleanup when component unmounts
    React.useEffect(() => {
      return () => {
        setIsModalVisible(false); // Reset modal state on unmount
      };
    }, []);
  
   // Use useFocusEffect instead of router.addListener
   useFocusEffect(
    useCallback(() => {
      setIsModalVisible(false);
      
      return () => {
        // Cleanup if needed
      };
    }, [])
  );
  
  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-around items-center bg-white py-4 border-t border-gray-200">
      <TouchableOpacity 
        className="items-center"
        onPress={() => router.push('/dashboard')}
      >
        <Icon 
          name="home" 
          size={24} 
          color={currentPath === '/dashboard' ? "#FF8038" : "#666"} 
        />
        <Text className={`text-xs mt-1 ${currentPath === '/dashboard' ? "text-[#FF8038]" : "text-gray-600"}`}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Icon name="heart-o" size={24} color="#666" />
        <Text className="text-xs mt-1 text-gray-600">Favorite</Text>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center" onPress={() => setIsModalVisible(true)}>
        <View className="bg-[#FF8038] w-12 h-12 rounded-full items-center justify-center">
          <Icon name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity className="items-center">
        <Icon name="bell-o" size={24} color="#666" />
        <Text className="text-xs mt-1 text-gray-600">Notifications</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        className="items-center"
        onPress={() => router.push('/profile')}
      >
        <Icon 
          name="user-o" 
          size={24} 
          color={currentPath === '/profile' ? "#FF8038" : "#666"} 
        />
        <Text className={`text-xs mt-1 ${currentPath === '/profile' ? "text-[#FF8038]" : "text-gray-600"}`}>
          Profile
        </Text>
      </TouchableOpacity>
        <Modal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Error"
        height="50%"
        width="100%"
        showHeader={true}
        showCloseIcon={true}
        titleColor="#FF0000"
        closeOnBackdropPress={true}>
        <Text className="text-center text-lg font-semibold">You are on a free subscription, only hosts can create and host events</Text>
        <Text className="text-center text-lg mt-10 font-semibold">Upgrade to a host to create and host events 😊</Text>
        <TouchableOpacity className="bg-[#FF8038] w-full rounded-full p-4 mt-10" onPress={() => router.push('/subscription')}>
          <Text className="text-center text-white text-lg font-semibold">Upgrade</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
} 