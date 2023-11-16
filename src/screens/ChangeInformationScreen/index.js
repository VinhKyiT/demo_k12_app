import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { IMAGES } from '../../assets/images';
import AppIcon from '../../components/AppIcon';
import { COLORS } from '../../constants/colors';
import { uploadFile } from '../../services/shared/files.services';
const ChangeInformationScreen = () => {
  const [avatar, setAvatar] = useState('');
  const openPicker = () => {
    ImagePicker.openPicker({ cropping: true, width: 400, height: 400 }).then(image => {
      uploadFile(image).then(res => {
        setAvatar(res);
      });
    });
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ marginTop: 50, width: 100, height: 100, overflow: 'hidden' }}>
        <FastImage
          source={avatar ? { uri: avatar.location } : IMAGES.MINI_LOGO}
          style={{ width: '100%', height: '100%', borderRadius: 999 }}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: COLORS.APP_ORANGE,
            padding: 4,
            borderRadius: 99,
          }}
          onPress={openPicker}>
          <AppIcon type="antdesign" name="camerao" size={16} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeInformationScreen;
