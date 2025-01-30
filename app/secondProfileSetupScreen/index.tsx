import React, { useState, useMemo, useEffect, useRef } from "react";
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
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";
import Animated from "react-native-reanimated";
import { InputField } from "../../components/GeneralComponents/InputField";
import Button from "../../components/Button";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import PhoneInput from "react-native-phone-input";
import { Country, State } from "country-state-city";
import type { ICountry } from "country-state-city";

interface CountryItem {
  label: string;
  value: string;
  flag: string;
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
  countryCode: string,
  stateCode: string
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
}: SearchModalProps) => {
  return (
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
            keyExtractor={(item: any) => item.value}
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
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default function SecondProfileSetupScreen() {
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

    const profileData = React.useMemo(() => ({
    userName: params.userName as string,
    bio: params.bio as string,
    profileImage: params.profileImage as string,
  }), [params]);

  const [isCountryModalLoading, setIsCountryModalLoading] = useState(false);
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [states, setStates] = useState<StateItem[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const phoneInputRef = useRef<any>(null);
  const [myCountryPicker, setMyCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("ng");
  const debouncedCountrySearch = useDebouncedValue(searchQuery, 300);
  const debouncedStateSearch = useDebouncedValue(stateSearchQuery, 300);

  const handlePhoneChange = (text: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: text,
    }));
  };

  const handleCountryChange = (item: CountryItem): void => {
    setFormData((prev) => ({
      ...prev,
      country: item,
      state: null,
    }));

    const countryStates: StateItem[] = State.getStatesOfCountry(item.value).map(
      (state) => ({
        label: state.name,
        value: state.isoCode,
      })
    );
    setStates(countryStates);
  };

  const handleStateChange = (item: StateItem): void => {
    setFormData((prev) => ({
      ...prev,
      state: item,
    }));

  }

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

  const handleCountryLoading = () => {
    return setIsCountryModalLoading(true);
  };
  const handleCountrySelect = () => {
    if (!countries.length) {
      fetchCountries();
    }
    setIsCountryModalVisible(true);
  };

  const handleStateLoading = () => {
    if (formData.country == null) {
      return Toast.show({
        type: "error",
        text1: "Please Select a country first",
      });
    }
    return setIsStateModalVisible(true);
  };

  const handleBack = () => {
    return router.back();
  };

  const fetchCountries = async () => {
    setIsLoadingCountries(true);
    setIsCountryModalLoading(true);

    try {
      const allCountries = Country.getAllCountries().map(
        (country: ICountry) => ({
          label: country.name,
          value: country.isoCode,
          flag: country.flag,
        })
      );
      setCountries(allCountries);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setIsLoadingCountries(false);
      setIsCountryModalLoading(false);
    }
  };

  const filteredCountries = useMemo(() => {
    return countries.filter((item) =>
      item.label.toLowerCase().includes(debouncedCountrySearch.toLowerCase())
    );
  }, [countries, debouncedCountrySearch]);

  const filteredStates = useMemo(() => {
    return states.filter((item) =>
      item.label.toLowerCase().includes(debouncedStateSearch.toLowerCase())
    );
  }, [states, debouncedStateSearch]);

  return (
    <SafeAreaView className="flex-1 mt-2 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex bg-white pb-4 shadow-gray-600 px-4 mt-20">
        <Animated.View className="flex-row gap-2 items-center">
          <View>
            <Text className="text-2xl" style={{ fontFamily: "BarlowBold" }}>
              Profile Setup
            </Text>
          </View>
          </Animated.View>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="pt-7 pb-6 px-4">
          <Animated.View className="flex-col justify-between items-start w-full">
            <View className="w-full">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
              Phone
              </Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    className="bg-white border border-[#C9C9C9] rounded-xl"
                  >
                    <PhoneInput
                      ref={phoneInputRef}
                      initialCountry={selectedCountry}
                      // initialValue="+2343178675309"
                      textProps={{
                        placeholder: "Enter a phone number...",
                        placeholderTextColor: "#999",
                      }}
                      style={styles.phoneInput}
                      flagStyle={styles.flag}
                      pickerItemStyle={styles.pickerItem}
                      cancelTextStyle={styles.cancelText}
                      confirmTextStyle={styles.confirmText}
                      onChangePhoneNumber={(text)=> handlePhoneChange(text)}
                      pickerBackgroundColor="#FF8038"
                    />
                  </TouchableOpacity>
            </View>
            <View className="w-full mt-4">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                Full Name
              </Text>
              <InputField 
                placeholder="eg: John Doe" 
                width="100%" 
                    value={formData.fullName}
                    onChange={(text) =>
                      setFormData((prev) => ({ ...prev, fullName: text }))
                    }
              />
            </View>
            <View className="w-full mt-4">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                Country
              </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleCountryLoading();
                      handleCountrySelect();
                    }}
                    disabled={isLoadingCountries}
                    className="mt-2 border border-gray-300 rounded-xl p-6 bg-white"
                  >
                    {isCountryModalLoading ? (
                      <View className="flex-row items-center">
                        <ActivityIndicator size="small" color="#FF8038" />
                        <Text className="ml-2 text-gray-400">
                          Loading countries...
                        </Text>
                      </View>
                    ) : (
                      <Text
                        className={
                          formData.country ? "text-black" : "text-gray-400"
                        }
                      >
                        {isCountryModalLoading
                          ? "Loading countries..."
                          : formData.country
                          ? formData.country?.label
                          : "Tap to select country"}
                      </Text>
                    )}
                  </TouchableOpacity>
            </View>
            <View className="w-full mt-4">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                State
              </Text>
                  <TouchableOpacity
                    onPress={() => handleStateLoading()}
                    className="mt-2 border border-gray-300 p-6 rounded-xl bg-white"
                    // disabled={!formData.country}
                  >
                    <Text
                      className={
                        formData.state ? "text-black" : "text-gray-400"
                      }
                    >
                      {formData.state?.label || "Tap to select state"}
                    </Text>
                  </TouchableOpacity>
            </View>
            <View className="w-full mt-4">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                Address
              </Text>
              <InputField 
                placeholder="eg: Plot 5 Ronald Road" 
                width="100%" 
                    value={formData.address}
                    onChange={(text) =>
                      setFormData((prev) => ({ ...prev, address: text }))
                    }
              />
            </View>
          </Animated.View>
        </View>
        
            <View className="flex-1 flex-row px-16 py-2 justify-center items-center mt-2 mb-4">
          <View className="gap-4 flex-1 flex-row justify-center items-center mt-2">
        <Button
            title="Back"
            gradientPadding={1}
            gradientColors={["#808080", "#808080", "#808080"]}
            buttonColour={"#808080"}
            buttonWidth={"[50px]"}
            action={handleBack}
          />
          <Button
            title="Next"
            gradientPadding={1}
            gradientColors={["#FF8038", "#FF8038", "#FF8038"]}
            buttonColour={"#FF8038"}
            buttonWidth={"[50px]"}
            action={handleNext}
          />
        </View>
        </View>
      </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <SearchModal
        visible={isCountryModalVisible}
        onClose={() => {
          setIsCountryModalLoading(false);
          setIsCountryModalVisible(false);
        }}
        data={filteredCountries}
        onSelect={handleCountryChange}
        searchPlaceholder="Search countries..."
        title="Select Country"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={isLoadingCountries}
      />

      <SearchModal
        visible={isStateModalVisible}
        onClose={() => setIsStateModalVisible(false)}
        data={filteredStates}
        onSelect={handleStateChange}
        searchPlaceholder="Search states..."
        title="Select State"
        searchValue={stateSearchQuery}
        onSearchChange={setStateSearchQuery}
        isLoading={isLoadingCountries}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  phoneInput: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  flag: {
    marginLeft: 10,
    width: 30,
    height: 20,
  },
  picker: {
    backgroundColor: "#fff",
    height: "80%",
    borderRadius: 10,
    padding: 10,
  },
  pickerItem: {
    height: 100,
    paddingVertical: 15,
    fontSize: 40,
    color: "red",
  },
  cancelText: {
    fontSize: 16,
    color: "blue",
  },
  confirmText: {
    fontSize: 16,
    color: "white",
  },
});
