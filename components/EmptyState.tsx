import React from "react";
import { View, Text } from "react-native";

interface EmptyStateProps {
  icon?: React.ReactNode;
  heading?: string;
  body?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, heading, body }) => {
  return (
    <View className="flex items-center justify-center px-5 py-10">
      {icon}
      <Text className="text-xl font-bold text-center mt-4">{heading}</Text>
      <Text className="text-gray-500 text-center mt-2">{body}</Text>
    </View>
  );
};

export default EmptyState;
