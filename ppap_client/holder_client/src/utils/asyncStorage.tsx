import AsyncStorage from "@react-native-async-storage/async-storage";

export const asyncSetItem = async (key, item) => {
  try {
    await AsyncStorage.setItem(key, item);
  } catch (e) {
    console.error(e);
  }
};

export const asyncGetItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(e);
  }
};

export const asyncClear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export const asyncRemoveItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
