import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '~assets/images';
import styles from './styles';
import AppText from '~components/AppText';
import AppInput from '~components/AppInput';
import AppButton from '~components/AppButton';
import { useSelector, useDispatch } from 'react-redux';
import { loginErrorSelector, loginStateSelector } from '~redux/auth/auth.selectors';
import axios from 'axios';
import { loginFailed, loginRequest, loginSuccess } from '~redux/auth/auth.actions';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '~constants/routes';
import { getUserProfile } from '../../redux/profile/profile.actions';
import { getLoadingSelector } from '../../redux/loading/loading.selectors';
import { LOGIN } from '../../redux/auth/auth.constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import { validationLoginSchema } from '../../utils/schemas/authSchemas';
import { showModal } from '../../components/AppModal';
import auth from '@react-native-firebase/auth';

const AuthScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = useCallback(
    res => {
      setUser(res);
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    if (user) {
      NavigationServices.replace(ROUTES.DRAWER);
    }
  }, [user]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loginStateSelector);
  const handleTabChange = tab => {
    setCurrentTab(tab);
  };

  const initialValue = {
    email: '',
    password: '',
  };

  const isLoggingIn = useSelector(state => getLoadingSelector(state, [LOGIN.REQUEST]));

  console.log('isLoggingIn', isLoggingIn);

  const onLoginPress = useCallback(async ({ email, password }) => {
    // dispatch(
    //   loginRequest({ email, password }, null, error => {
    //     showModal({ title: 'Error', content: error });
    //   }),
    // );
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      NavigationServices.reset({ routes: [{ name: ROUTES.DRAWER }], index: 0 });
    }
  }, [isLoggedIn]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={100}
      // extraHeight={100}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.topPart}>
          <FastImage source={IMAGES.MINI_LOGO} style={styles.logoImg} />
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => {
                handleTabChange(0);
              }}
              activeOpacity={0.8}
              style={[styles.tabItemContainer, currentTab === 0 && styles.activeTabIndicator]}>
              <AppText style={styles.tabTile}>Login</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleTabChange(1);
              }}
              activeOpacity={0.8}
              style={[styles.tabItemContainer, currentTab === 1 && styles.activeTabIndicator]}>
              <AppText style={styles.tabTile}>Sign-up</AppText>
            </TouchableOpacity>
          </View>
        </View>
        <Formik
          initialValues={initialValue}
          validationSchema={validationLoginSchema}
          onSubmit={onLoginPress}>
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
            handleReset,
            isValid,
          }) => {
            return (
              <View style={styles.bottomPart}>
                <View style={styles.inputWrapper}>
                  <AppInput
                    inputStyle={styles.inputStyle}
                    title="Email address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Eg: nguyenvana@gmail.com"
                    error={values.email && touched.email && errors.email}
                    onFocus={() => {
                      setFieldTouched('email');
                    }}
                  />
                  <AppInput
                    inputStyle={[styles.inputStyle]}
                    containerStyle={{ marginTop: 16 }}
                    title="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Enter Password"
                    secureTextEntry
                    error={values.password && touched.password && errors.password}
                    onFocus={() => {
                      setFieldTouched('password');
                    }}
                  />
                  <TouchableOpacity style={styles.forgotContainer} onPress={handleReset}>
                    <AppText style={styles.forgotText}>Forgot password?</AppText>
                  </TouchableOpacity>
                </View>
                <AppButton
                  isLoading={isLoggingIn}
                  onPress={handleSubmit}
                  title="Login"
                  disabled={!isValid}
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

export default React.memo(AuthScreen);
