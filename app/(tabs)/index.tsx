import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { InputField } from '../../components/GeneralComponents/InputField';
import Button from '../../components/Button';


export default function HomeScreen() {
  return (
   <View className='bg-white flex-1'>
    <View className='pt-16 pb-6 px-4 text-red-900'>
      <Animated.View
      className='flex-row justify-between items-center'
      >
        <View >
          <Text className='text-4xl'
          style={{fontFamily: "BarlowBold"}}
          >
            Create an Account
          </Text>
          <Text className='text-xl mt-4'>
          Create an account with Eventyzze and explore a
          world of endless entertainment 
          </Text>
          </View>
      </Animated.View>
    </View>
    <View className='w-full px-4 mt-10 mb-4'>
      <View className='w-full items-center gap-2'>
    <InputField placeholder={'Email'} />
    <InputField placeholder={'Password'} />
    <View className='w-full mt-4'>
    <Button title={'Create an Account'} gradientPadding={1} gradientColors={["#FF8038", "#FF8038", "#FF8038"]} buttonColour={'[#FF8038]'} buttonWidth={"full"} />
    </View>
    </View>
    </View>

    <View className="flex-row items-center justify-center px-4">
      <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
      <Text className="mx-2 text-[#C9C9C9] text-sm">or</Text>
      <View className="flex-1 h-[1px] bg-[#C9C9C9]" />
    </View>

    <View className='gap-4 px-4 mt-4'>
    <Button title={'Continue with Google'} gradientPadding={1} gradientColors={["#FF8038", "#FF8038", "#FF8038"]} buttonColour={'white'} buttonWidth={"full"} />
    <Button title={'Continue with Apple'} gradientPadding={1} gradientColors={["#FF8038", "#FF8038", "#FF8038"]} buttonColour={'white'} buttonWidth={"full"} />
    <Button title={'Continue with Facebook'} gradientPadding={1} gradientColors={["#FF8038", "#FF8038", "#FF8038"]} buttonColour={'white'} buttonWidth={"full"} />
    </View>

    <View className='mt-4 px-4 flex-grow justify-center items-center'>
      <Text className='text-center text-xl'
      style={{fontFamily: ""}}
      >
        Already have an account? Log in
      </Text>
    </View>
   </View>
  );
}
