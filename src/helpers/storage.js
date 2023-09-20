import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu dữ liệu vào AsyncStorage
const storeData = async (key, value) => {
  try {
    if (typeof value === 'string') {
      await AsyncStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    console.log('Dữ liệu đã được lưu trữ thành công.');
  } catch (error) {
    console.error('Lỗi khi lưu trữ dữ liệu: ', error);
  }
};

// Lấy dữ liệu từ AsyncStorage
const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      console.log('Dữ liệu đã được lấy thành công:', value);
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
    console.log('Dữ liệu đã được xóa thành công.');
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu: ', error);
  }
};

export { storeData, getData, removeData };
