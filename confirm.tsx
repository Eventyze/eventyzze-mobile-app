import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TextInput,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-input";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import countriesData from "../../data/countries_states.json";

interface CountryItem {
  label: string;
  value: string;
  flag?: string;
}

interface StateItem {
  label: string;
  value: string;
}

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: any) => void;
  searchPlaceholder: string;
  title: string;
  searchValue: string;
  onSearchChange: (text: string) => void;
  isLoading: boolean;
}

interface FormData {
  phoneNumber: string;
  fullName: string;
  country: CountryItem | null;
  state: StateItem | null;
  address: string;
  countryCode: string;
  stateCode: string;
}

const useDebouncedValue = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchModal = ({
  visible,
  onClose,
  data,
  onSelect,
  searchPlaceholder,
  title,
  searchValue,
  onSearchChange,
  isLoading,
}: SearchModalProps) => (
  <Modal
    visible={visible}
    animationType="slide"
    presentationStyle="fullScreen"
    onRequestClose={onClose}
  >
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-4 border-b border-gray-200">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold">{title}</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput
          className="bg-gray-100 px-4 py-2 rounded-lg"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChangeText={onSearchChange}
          autoFocus={true}
        />
      </View>
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF8038" />
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }: { item: any }) => (
            <TouchableOpacity
              className="px-4 py-4 border-b border-gray-100"
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text className="text-base">
                {item.flag ? `${item.flag} ` : ""}
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  </Modal>
);

const SecondProfileSetupScreen = () => {
  const [formData, setFormData] = useState<FormData>({
    phoneNumber: "",
    fullName: "",
    country: null,
    state: null,
    address: "",
    countryCode: "",
    stateCode: ""
  });

  const params = useLocalSearchParams();

  const profileData = useMemo(() => ({
    userName: params.userName as string,
    bio: params.bio as string,
    profileImage: params.profileImage as string,
  }), [params]);

  const [isCountryModalLoading, setIsCountryModalLoading] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const phoneInputRef = useRef<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("ng");
  const debouncedCountrySearch = useDebouncedValue(searchQuery, 300);
  const debouncedStateSearch = useDebouncedValue(stateSearchQuery, 300);

  useEffect(() => {
    setCountries(
      countriesData.map((country:any) => ({
        label: country.name,
        value: country.code,
        flag: country.flag
      }))
    );
  }, []);

  const handlePhoneChange = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: text,
    }));
  };

  const handleCountryChange = useCallback((item: CountryItem) => {
    setFormData(prev => ({
      ...prev,
      country: item,
      state: null
    }));
    const countryStates = countriesData.find(country => country.code === item.value)?.states || [];
    setStates(countryStates.map(state => ({ label: state.name, value: state.code })));
  }, []);

  const handleStateChange = (item: StateItem) => {
    setFormData(prev => ({ ...prev, state: item }));
  };

  const handleNext = () => {
    if (!formData.phoneNumber.trim()) {
      return Toast.show({
        type: "error",
        text1: "Please enter your phone number",
      });
    }

    if (!formData.fullName.trim()) {
      return Toast.show({
        type: "error",
        text1: "Please enter your full name",
      });
    }

    if (formData.fullName.trim().split(" ").length !== 2) {
      return Toast.show({
        type: "error",
        text1: "Please use at least two names",
      });
    }

    if (!formData.country) {
      return Toast.show({
        type: "error",
        text1: "Please select your country",
      });
    }

    if (!formData.state) {
      return Toast.show({
        type: "error",
        text1: "Please select your state",
      });
    }

    if (!formData.address.trim()) {
      return Toast.show({
        type: "error",
        text1: "Please enter your address",
      });
    }

    router.push({
      pathname: "/preferenceSelection",
      params: {
        userName: params.userName as string,
        bio: params.bio as string,
        profileImage: params.profileImage as string,
        phone: formData.phoneNumber as string,
        fullName: formData.fullName as string,
        country: formData.country.label as string,
        state: formData.state.label as string,
        address: formData.address as string,
        stateCode: formData.state.value as string,
        countryCode: formData.country.value as string,
      },
    });
  };

  const handleCountryLoading = () => setIsCountryModalLoading(true);
  const handleCountrySelect = () => setIsCountryModalVisible(true);

  const handleStateLoading = () => {
    if (formData.country == null) {
      return Toast.show({
        type: "error",
        text1: "Please Select a country first",
      });
    }
    setIsStateModalVisible(true);
  };

  const handleBack = () => router.back();

  const filteredCountries = useMemo(() => {
    return countries.filter(item =>
      item.label.toLowerCase().includes(debouncedCountrySearch.toLowerCase())
    );
  }, [countries, debouncedCountrySearch]);

  const filteredStates = useMemo(() => {
    return states.filter(item =>
      item.label.toLowerCase().includes(debouncedStateSearch.toLowerCase())
    );
  }, [states, debouncedStateSearch]);

  return (
    <SafeAreaView className="flex-1 mt-2 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView className="p-4 space-y-4">
          <Text className="text-2xl font-semibold">
            Welcome to the second step!
          </Text>
          <Text className="text-base text-gray-500">
            Please complete the following details
          </Text>
          <InputField
            label="Full Name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          />
          <PhoneInput
            ref={phoneInputRef}
            value={formData.phoneNumber}
            onChangePhoneNumber={handlePhoneChange}
            initialCountry={selectedCountry}
            textInputProps={{
              style: {
                height: 45,
                borderColor: "#ccc",
                borderWidth: 1,
                borderRadius: 5,
                paddingLeft: 20,
              },
            }}
          />
          <TouchableOpacity onPress={handleCountrySelect}>
            <Text>Select your country</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStateLoading}>
            <Text>Select your state</Text>
          </TouchableOpacity>
          <InputField
            label="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
          />
          <Button onPress={handleNext} title="Next" />
        </ScrollView>
      </KeyboardAvoidingView>

      <SearchModal
        visible={isCountryModalVisible}
        onClose={() => setIsCountryModalVisible(false)}
        data={filteredCountries}
        onSelect={handleCountryChange}
        searchPlaceholder="Search for a country"
        title="Select a country"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isCountryModalLoading}
      />
      <SearchModal
        visible={isStateModalVisible}
        onClose={() => setIsStateModalVisible(false)}
        data={filteredStates}
        onSelect={handleStateChange}
        searchPlaceholder="Search for a state"
        title="Select a state"
        searchValue={stateSearchQuery}
        onSearchChange={setStateSearchQuery}
        isLoading={false}
      />
    </SafeAreaView>
  );
};

export default SecondProfileSetupScreen;
