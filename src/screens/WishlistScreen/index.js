import React, { memo } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import { COLORS } from '../../constants/colors';
import styles from './styles';
import { fetchData, incrementRequest } from '../../redux/counter/counter.actions';
import withLoading from '../../HOCs/withLoading';
import AppLoading from '../../components/AppLoading';
import ImageCropPicker from 'react-native-image-crop-picker';
import axiosClient from '../../utils/axiosClient';
import { DOMAIN } from '../../constants/env';

const WishlistScreen = () => {
  const count = useSelector(state => state.counter.count);
  const uploadImage = async file => {
    console.log('file', file);
    const formData = new FormData();
    formData.append('file', {
      uri: file?.path,
      type: file?.mime,
      name: file?.filename || file?.path?.split('/')?.reverse()?.[0],
    });
    formData.append('type', file.mime);
    try {
      const res = await axiosClient.post(DOMAIN.BASE_URL + '/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('res', res);
      return {
        filePath: res?.data,
      };
    } catch (error) {
      console.log(error);
      return { error };
    }
  };
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <AppText size={50} align="center">
        {count}
      </AppText>
      <AppButton
        title="Increase"
        style={{ backgroundColor: COLORS.APP_ORANGE }}
        onPress={() => {
          ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            uploadImage(image);
          });
        }}
      />
    </View>
  );
};

export default memo(withLoading(WishlistScreen, ['FETCH_DATA_REQUEST']));
