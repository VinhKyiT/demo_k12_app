import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu dữ liệu vào AsyncStorage
const storeData = async (key, value) => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Lỗi khi lưu trữ dữ liệu: ', error);
  }
};

// Lấy dữ liệu từ AsyncStorage
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      console.log('Không tìm thấy dữ liệu cho key:', key);
    }
  } catch (error) {
    console.error('Lỗi truy vấn dữ liệu: ', error);
  }
};

// Xóa dữ liệu từ AsyncStorage
const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu: ', error);
  }
};

const LocalStorage = { storeData, getData, removeData };

export default LocalStorage;
