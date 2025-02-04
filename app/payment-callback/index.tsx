import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import React from "react";

const PaymentCallback = () => {
  const router = useRouter();
  const { transaction_id, status } = useLocalSearchParams();

  useEffect(() => {
    if (transaction_id) {
      verifyPayment(transaction_id);
    }
  }, [transaction_id]);

  const verifyPayment = async (transactionId: string | any) => {
    try {
      const response = await axios.get(`https://your-backend.com/api/payments/verify/${transactionId}`);
      
      if (response.data.status === "successful") {
        // Redirect user to success screen
        router.push("/payment/success");
      } else {
        // Redirect to failure screen
        router.push("/payment/failure");
      }
    } catch (error) {
      console.error("Payment verification failed", error);
      router.push("/payment/failure");
    }
  };

  return (
    <View>
      <Text>Verifying Payment...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default PaymentCallback;
