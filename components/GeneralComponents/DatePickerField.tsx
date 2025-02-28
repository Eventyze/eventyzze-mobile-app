import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";


const DatePickerField = ({ value, onChange, loading }: {value:any, onChange: any, loading: any}) => (
    <View>
      <Text className="text-2xl" style={{ fontFamily: "BarlowSemiBold" }}>
        Date {loading && <ActivityIndicator color="#FF8038" />}
      </Text>
      <TouchableOpacity
        onPress={() => onChange.showPicker()}
        className="w-full mt-4 h-[60px] border rounded-xl px-4 flex flex-row items-center"
        style={{
          borderColor: value ? "#22c55e" : "#555555",
          borderWidth: value ? 2 : 1,
        }}
      >
        <Text className={`text-base ${value ? "text-black" : "text-gray-500"}`}>
          {value ? value : "YYYY-MM-DD"}
        </Text>
      </TouchableOpacity>
      {onChange.isVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={new Date()}
          onChange={onChange.onSelect}
        />
      )}
    </View>
  );