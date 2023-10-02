import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import { getData, removeData, storeData } from '../helpers/storage';
import { I18n, setLocale } from '~i18n';
import RNRestart from 'react-native-restart';
import { showModal } from '../components/AppModal';

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

  const changeLanguage = lang => {
    setLocale(lang);
    //   Alert.alert(I18n.t('alert.alertTitle'), I18n.t('alert.alertLanguageChanged'), [
    //     {
    //       text: 'OK',
    //       onPress: () => RNRestart.restart(),
    //       style: 'default',
    //     },
    //   ]);
    // };
    showModal({
      title: I18n.t('alert.alertTitle'),
      content: I18n.t('alert.alertLanguageChanged'),
      onConfirm: () => RNRestart.restart(),
    });
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
      <Text>{I18n.t('welcome')}</Text>
      <Text>{I18n.t('greet', { name: 'John' })}</Text>
      <CustomButton
        title="Switch to English"
        onPress={() => {
          changeLanguage('en');
        }}
      />
      <CustomButton
        title="Switch to Vietnamese"
        onPress={() => {
          changeLanguage('vi');
        }}
      />
    </View>
  );
};

export default AsyncStorageDemo;
