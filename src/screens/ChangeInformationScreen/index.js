import React, { useCallback, useMemo, useRef, useState } from 'react';
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
import { getUserProfile, updateUserProfileRequest } from '../../redux/profile/profile.actions';
import { changeInfoSchema } from '../../utils/schemas/profileSchema';

const ChangeInformationScreen = () => {
  const [avatar, setAvatar] = useState('');
  const userInfo = useSelector(getUserInfoSelector);
  const dispatch = useDispatch();
  const formikRef = useRef();
  const initialValues = useMemo(
    () => ({
      avatar: userInfo?.avatar,
      email: userInfo?.email,
      name: userInfo?.name,
      oldPassword: '',
      newPassword: '',
      reEnterPassword: '',
    }),
    [userInfo?.avatar, userInfo?.email, userInfo?.name],
  );

  const openPicker = () => {
    ImagePicker.openPicker({ cropping: true, width: 400, height: 400 }).then(image => {
      uploadFile(image).then(res => {
        console.log(res);
        setAvatar(res);
        formikRef.current?.setFieldValue('avatar', res?.location);
      });
    });
  };

  const handleFormSubmit = useCallback(
    async ({ name, newPassword, oldPassword, reEnterPassword, avatar }) => {
      dispatch(
        updateUserProfileRequest({
          name,
          newPassword,
          oldPassword,
          reEnterPassword,
          userId: userInfo?.id,
          avatar,
        }),
      );
      // try {
      //   const res = await updateUserApi({
      //     userId: userInfo.id,
      //     payload: {
      //       name,
      //     },
      //   });
      //   console.log('res', res);
      //   if (res) {
      //     dispatch(getUserProfile(res));
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
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
        <Formik
          innerRef={formikRef}
          validationSchema={changeInfoSchema}
          initialValues={initialValues}
          onSubmit={handleFormSubmit}>
          {({
            values,
            handleChange,
            handleSubmit,
            dirty,
            errors,
            touched,
            handleBlur,
            setFieldTouched,
          }) => {
            console.log('values', values);
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
                    error={dirty && touched.email && errors.email}
                    onBlur={handleBlur('email')}
                    onFocus={() => {
                      setFieldTouched('email');
                    }}
                  />
                  <AppInput
                    title={'Name'}
                    placeholder={'Eg: Nguyen Van A'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    error={dirty && touched.name && errors.name}
                    onBlur={handleBlur('name')}
                    onFocus={() => {
                      setFieldTouched('name');
                    }}
                  />
                  <AppInput
                    title={'Old Password'}
                    placeholder={'Enter old password'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.oldPassword}
                    onChangeText={handleChange('oldPassword')}
                    error={dirty && touched.oldPassword && errors.oldPassword}
                    onBlur={handleBlur('oldPassword')}
                    onFocus={() => {
                      setFieldTouched('oldPassword');
                    }}
                    secureTextEntry
                  />
                  <AppInput
                    title={'New Password'}
                    placeholder={'Enter new password'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.newPassword}
                    onChangeText={handleChange('newPassword')}
                    error={dirty && touched.newPassword && errors.newPassword}
                    onBlur={handleBlur('newPassword')}
                    onFocus={() => {
                      setFieldTouched('newPassword');
                    }}
                    secureTextEntry
                  />
                  <AppInput
                    title={'Re-enter Password'}
                    placeholder={'Enter new password again'}
                    style={styles.inputStyle}
                    containerStyle={styles.inputContainer}
                    value={values.reEnterPassword}
                    onChangeText={handleChange('reEnterPassword')}
                    error={dirty && touched.reEnterPassword && errors.reEnterPassword}
                    onBlur={handleBlur('reEnterPassword')}
                    onFocus={() => {
                      setFieldTouched('reEnterPassword');
                    }}
                    secureTextEntry
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
