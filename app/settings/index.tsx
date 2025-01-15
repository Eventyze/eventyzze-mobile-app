import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Footer from '../../components/GeneralComponents/Footer';
import { clearLocalStorage } from '../../services/axiosSetup/storage';
import Toast from 'react-native-toast-message';

interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  iconColor?: string;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  iconColor = "#000",
  showArrow = true 
}) => (
  <TouchableOpacity 
    className="flex-row items-center px-4 py-3 mt-4"
    onPress={onPress}
  >
    <Icon name={icon} size={24} color={iconColor} />
    <View className="flex-1 ml-3">
      <Text className="text-base">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-gray-500">{subtitle}</Text>
      )}
    </View>
    {showArrow && <Icon name="chevron-forward" size={20} color="#666" />}
  </TouchableOpacity>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View className="px-4 mt-6 py-2 mb-4">
    <Text className="text-lg font-semibold"
    style={{
      fontFamily: 'BarlowExtraBold'
    }}
    >{title}</Text>
    {subtitle && <Text className="text-base text-gray-500"
    style={{
      fontFamily: 'BarlowRegular'
    }}
    >{subtitle}</Text>}
  </View>
);

export default function Settings() {

    const handleLogout = async () => {
      await clearLocalStorage();
       Toast.show({
        type: 'success',
        text1: 'Good bye, we hope to see you again soon!',
        visibilityTime: 3000,
      });
      router.push('/login');
    }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center mt-14 px-4 py-4 bg-white">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold">Settings</Text>
      </View>

      {/* Search Bar */}
      <View className="px-4 py-2 bg-white">
        <View className="flex-row items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Icon name="search" size={20} color="#666" />
          <TextInput
            placeholder="Search"
            className="flex-1 ml-2"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Settings List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <SectionHeader 
          title="Account" 
          subtitle="Update your account information" 
        />
        <View className="px-4">
        <View className="pt-2 pb-6 rounded-lg bg-[#dcdfea]">
        <SettingItem 
          icon="person-outline" 
          title="Account information" 
        />
        <SettingItem 
          icon="notifications-outline" 
          title="Notification" 
        />
        </View>
        </View>

        
        <SectionHeader 
          title="App settings and Permissions" 
          subtitle="Customize eventyzze to fit your preferences" 
        />

        <View className="px-4">
        <View className="pt-2 pb-6 rounded-lg bg-[#dcdfea]">
        <SettingItem 
          icon="moon-outline" 
          title="Display" 
        />
        <SettingItem 
          icon="phone-portrait-outline" 
          title="Device permissions" 
        />
        <SettingItem 
          icon="accessibility-outline" 
          title="Accessibility" 
          />
          </View>
        </View>

        <SectionHeader 
          title="Privacy" 
          subtitle="Customize your privacy for better experience" 
        />

        <View className="px-4">
        <View className="pt-2 pb-6 rounded-lg bg-[#dcdfea]">
        <SettingItem 
          icon="shield-outline" 
          title="Security" 
        />
        </View>
        </View>

        <SectionHeader 
          title="Data and Storage" 
          subtitle="Manage your device data and storage" 
        />

        <View className="px-4">
        <View className="pt-2 pb-6 rounded-lg bg-[#dcdfea]">
        <SettingItem 
          icon="trash-outline" 
          title="Clear cache" 
        />
        <SettingItem 
          icon="trash-bin-outline" 
          title="Delete account" 
          iconColor="#FF3B30"
        />
        </View>
        </View>

        {/* Logout Button */}
        <View className="px-4 py-4">
          <TouchableOpacity 
            className="bg-red-100 py-3 rounded-lg flex-row justify-center gap-4 items-center"
            onPress={async () => handleLogout()}
          >
            <Icon name="log-out-outline" size={24} color="#FF0000" className="w-6"/>
            <Text className="text-red-500 font-semibold">Log out</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom padding for footer */}
        <View className="h-20" />
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
} 