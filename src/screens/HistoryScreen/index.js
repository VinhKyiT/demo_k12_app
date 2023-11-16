import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';
import AppButton from '../../components/AppButton';
import ImagePicker from 'react-native-image-crop-picker';
import { uploadFile } from '../../services/shared/files.services';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <AppButton
        title="Select Image"
        onPress={() => {
          ImagePicker.openPicker({ cropping: false }).then(image => {
            uploadFile(image);
            console.log(image);
          });
        }}
      />
    </View>
  );
};

export default memo(HistoryScreen);
