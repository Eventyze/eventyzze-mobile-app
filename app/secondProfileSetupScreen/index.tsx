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
import countriesData from '../../data/countries_states.json';

interface CountryItem {
  name: string;
  code: string;
  flag?: string;
}

interface StateItem {
  name: string;
  code: string;
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
            // keyExtractor={(item: any) => item.value}
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

  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isStateModalVisible, setIsStateModalVisible] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateSearchQuery, setStateSearchQuery] = useState("");
  const phoneInputRef = useRef<any>(null);
  const debouncedCountrySearch = useDebouncedValue(searchQuery, 300);
  const debouncedStateSearch = useDebouncedValue(stateSearchQuery, 300);


  useEffect(() => {
    setCountries(
      countriesData.map((country:any) => ({
        name: country.name,
        code: country.code,
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
    const countryStates = countriesData.find(country => country.name === item.name)?.states || [];
    setStates(countryStates.map(state => ({ name: state.name, code: state.code })));
  }, [])



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
        country: formData.country.name as string,
        state: formData.state.name as string,
        address: formData.address as string,
        stateCode: formData.state.code as string,
        countryCode: formData.country.code as string,
      },
    });
  };

  const handleCountrySelect = () => {
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

  const filteredCountries = useMemo(() => {
    return countries.filter(item =>
      item.name.toLowerCase().includes(debouncedCountrySearch.toLowerCase())
    );
  }, [countries, debouncedCountrySearch]);

  const filteredStates = useMemo(() => {
    return states.filter(item =>
      item.name.toLowerCase().includes(debouncedStateSearch.toLowerCase())
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
                      initialCountry={"ng"}
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
                Select your country
              </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleCountrySelect();
                    }}
                    className="mt-2 border border-gray-300 rounded-xl p-6 bg-white"
                  >
                      <Text
                        className={
                          formData.country ? "text-black" : "text-gray-400"
                        }
                      >
                        {formData.country
                          ? formData.country?.name
                          : "Tap to select country"}
                      </Text>
                  </TouchableOpacity>
            </View>
            <View className="w-full mt-4">
                  <Text
                    className="text-2xl"
                    style={{ fontFamily: "BarlowBold" }}
                  >
                SSelect your state
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
                      {formData.state?.name || "Tap to select state"}
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
          setIsCountryModalVisible(false);
        }}
        data={filteredCountries}
        onSelect={handleCountryChange}
        searchPlaceholder="Search countries..."
        title="Select Country"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        isLoading={false}
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
        isLoading={false}
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
