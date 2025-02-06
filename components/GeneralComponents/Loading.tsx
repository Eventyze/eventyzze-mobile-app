import React from "react";
import { Modal, ActivityIndicator, View } from "react-native";

interface LoadingProps {
  isOpen?: boolean;
  isClose?: boolean;
  isTransparent?:boolean;
}
//${isTransparent === true ? 'bg-white/50' : ""}
const Loading: React.FC<LoadingProps> = ({ isOpen, isTransparent }) => {
  return (
    <>
      <Modal
        visible={isOpen}
        animationType="slide"
        transparent={isTransparent ? isTransparent : true}
      >
        <View className={`flex-1 ${isTransparent === true ? 'bg-white/50' : "bg-white/90"} justify-center items-center`}>
          <ActivityIndicator size={100} color={"#FF8038"}/>
        </View>
      </Modal>
    </>
  );
};

export default Loading
