import React, { useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import { IMAGES } from '../../assets/images';
import AppIcon from '../../components/AppIcon';
import { COLORS } from '../../constants/colors';
import { uploadFile } from '../../services/shared/files.services';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import styles from './styles';
import AppInput from '../../components/AppInput';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoSelector } from '../../redux/profile/profile.selectors';
import { updateUserApi } from '../../services/apis/user.apis';
import AppButton from '../../components/AppButton';
import { getUserProfile } from '../../redux/profile/profile.actions';

const ChangeInformationScreen = () => {
  const [avatar, setAvatar] = useState('');
  const userInfo = useSelector(getUserInfoSelector);
  const dispatch = useDispatch();
  const initialValues = useMemo(
    () => ({
      email: userInfo?.email,
      name: userInfo?.name,
      oldPassword: '',
      newPassword: '',
      reEnterPassword: '',
    }),
    [userInfo?.email, userInfo?.name],
  );

  const openPicker = () => {
    ImagePicker.openPicker({ cropping: true, width: 400, height: 400 }).then(image => {
      uploadFile(image).then(res => {
        setAvatar(res);
      });
    });
  };

  const handleFormSubmit = useCallback(
    async ({ name, newPassword, oldPassword, reEnterPassword }) => {
      try {
        const res = await updateUserApi({
          userId: userInfo.id,
          payload: {
            name,
          },
        });
        console.log('res', res);
        if (res) {
          dispatch(getUserProfile(res));
        }
      } catch (error) {
        console.log(error);
      }
    },
    [dispatch, userInfo.id],
  );

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.avatarWrapper}>
          <FastImage
            source={
              avatar
                ? { uri: avatar.location }
                : userInfo
                ? { uri: userInfo?.avatar }
                : IMAGES.MINI_LOGO
            }
            style={styles.avatar}
            resizeMode="cover"
          />
          <TouchableOpacity style={styles.cameraButton} onPress={openPicker}>
            <AppIcon type="antdesign" name="camerao" size={16} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
        <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
          {({ values, handleChange, handleSubmit }) => {
            return (
              <View style={styles.inputWrapper}>
                <View style={{ width: '100%' }}>
                  <AppInput
                    title={'Email'}
                    placeholder={'Eg: nguyenvana@gmail.com'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.email}
                    editable={false}
                  />
                  <AppInput
                    title={'Name'}
                    placeholder={'Eg: Nguyen Van A'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.name}
                    onChangeText={handleChange('name')}
                  />
                  <AppInput
                    title={'Old Password'}
                    placeholder={'Enter old password'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                  />
                  <AppInput
                    title={'New Password'}
                    placeholder={'Enter new password'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                  />
                  <AppInput
                    title={'Re-enter Password'}
                    placeholder={'Enter new password again'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.reEnterPassword}
                    onChangeText={handleChange('reEnterPassword')}
                  />
                </View>
                <AppButton
                  onPress={handleSubmit}
                  title="Update"
                  titleStyle={styles.buttonTitle}
                  style={styles.buttonContainer}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangeInformationScreen;
