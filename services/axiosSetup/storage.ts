import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocalStorageData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
   return await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

export const getLocalStorageData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const clearLocalStorage = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}; 

export const logoutClear = async () => {
  try {
    return await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
}; 