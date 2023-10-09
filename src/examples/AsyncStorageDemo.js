import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import CustomButton from '../components/CustomButton';
import { getData, removeData, storeData } from '../helpers/storage';
import { I18n, setLocale } from '~i18n';
import RNRestart from 'react-native-restart';
import { showModal } from '../components/AppModal';
import BottomSheet from '@gorhom/bottom-sheet';
import AppText from '../components/AppText';

const AsyncStorageDemo = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState('');
  // ref
  const bottomSheetRef = useRef(null);

  const [bottomSheetState, setBottomSheetState] = useState(-1);

  // snap point
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
    setBottomSheetState(index);
  }, []);

  const handleToggleBottomSheet = () => {
    if (bottomSheetState < snapPoints.length - 1) {
      bottomSheetRef.current.snapToIndex(bottomSheetState + 1);
    } else {
      bottomSheetRef.current.close();
    }
  };

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
    bottomSheetRef.current.close();
    setTimeout(() => {
      showModal({
        title: I18n.t('alert.alertTitle'),
        content: I18n.t('alert.alertLanguageChanged'),
        onConfirm: () => RNRestart.restart(),
      });
    }, 100);
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
      {/* <CustomButton
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
      /> */}
      <CustomButton title="Change Language" onPress={handleToggleBottomSheet} />
      <BottomSheet
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ backgroundColor: 'red' }}
        onChange={handleSheetChanges}>
        <View>
          <TouchableOpacity
            onPress={() => {
              changeLanguage('en');
            }}
            activeOpacity={0.7}
            style={{ padding: 16 }}>
            <AppText>Tiếng Anh</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              changeLanguage('vi');
            }}
            activeOpacity={0.7}
            style={{ padding: 16 }}>
            <AppText>Tiếng Việt</AppText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default AsyncStorageDemo;
