import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import countriesData from '../../data/countryDialCode.json';

const { width } = Dimensions.get('window');

interface PhoneInputProps {
    value: string;
    onChangePhoneNumber: (phoneNumber:any)=> void,
    placeholder: string;
    initialCountryCode: string;
}

interface CountryData {
        name: string;
        flag: string;
        code: string;
        dial_code: string;
}

const PhoneInputCustom =({ 
  value, 
  onChangePhoneNumber, 
  placeholder = "Enter your phone number", 
  initialCountryCode = "NG" 
}: PhoneInputProps ) => {
  const [phoneNumber, setPhoneNumber] = useState(value || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryData>(
    {
        "name": "Nigeria",
        "flag": "🇳🇬",
        "code": "NG",
        "dial_code": "+234"
      },
  );

  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>([]);
  
  useEffect(() => {
    const defaultCountry = countriesData.find(country => country.code === initialCountryCode.toUpperCase());
    if (defaultCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [initialCountryCode]);
  
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCountries(countriesData);
    } else {
      const filtered = countriesData.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dial_code.includes(searchQuery) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  }, [searchQuery]);
  
  const handlePhoneNumberChange = (text:any) => {

    const numericText = text.replace(/[^0-9]/g, '');
    const finalNumber = numericText.replace(/^0/, '');
    setPhoneNumber(numericText);
    if (onChangePhoneNumber) {
      onChangePhoneNumber(selectedCountry?.dial_code + finalNumber);
    }
  };
  
  const selectCountry = (country: CountryData) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery('');
    
    if (onChangePhoneNumber) {
      onChangePhoneNumber(country.dial_code + phoneNumber);
    }
  };
  
  const renderCountryItem = ({ item }: {item: CountryData}) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => selectCountry(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <View style={styles.countryDetails}>
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={styles.countryDialCode}>{item.dial_code}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => {
            setModalVisible(true);
            setFilteredCountries(countriesData);
          }}
        >
          <Text style={styles.flagText}>{selectedCountry?.flag}</Text>
          <Text style={styles.dialCodeText}>{selectedCountry?.dial_code}</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.phoneInput}
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          placeholder={placeholder}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
      </View>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <SafeAreaView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setSearchQuery('');
                }}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search countries..."
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              )}
            </View>
            
            <FlatList
              data={filteredCountries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.countryList}
            />
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C9C9C9',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    backgroundColor: '#F8F8F8',
  },
  flagText: {
    fontSize: 20,
    marginRight: 4,
  },
  dialCodeText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  countryList: {
    paddingBottom: 20,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countryFlag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryDetails: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    color: '#333',
  },
  countryDialCode: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default PhoneInputCustom;