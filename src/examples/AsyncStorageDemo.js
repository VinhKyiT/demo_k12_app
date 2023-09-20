import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { getData, removeData, storeData } from '../helpers/storage';

const AsyncStorageDemo = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState('');

  const handleSaveData = async () => {
    await storeData('KEY1', value);
  };

  const handleGetData = async () => {
    const dataFromStorage = await getData('KEY1');
    if (dataFromStorage) {
      setData(dataFromStorage);
    }
  };

  const handleDeleteData = async () => {
    await removeData('KEY1');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <TextInput placeholder="Nhập nội dung" value={value} onChangeText={setValue} />
        <CustomButton title="Lưu dữ liệu" onPress={handleSaveData} />
        <CustomButton title="Xoá dữ liệu" onPress={handleDeleteData} />
      </View>
      <View style={{ flex: 1 }}>
        <CustomButton onPress={handleGetData} title="Đọc dữ liệu" />
        <Text>{data}</Text>
      </View>
    </View>
  );
};

export default AsyncStorageDemo;
