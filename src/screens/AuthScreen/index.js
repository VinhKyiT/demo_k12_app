import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, Linking } from 'react-native';
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
import { validationLoginSchema } from '../../utils/schemas/loginSchema';
import queryString from 'query-string';
import { getProfileApi } from '~services/apis/auth.apis';
import { showModal } from '../../components/AppModal';
const AuthScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(loginStateSelector);
  const formRef = useRef();

  const handleTabChange = tab => {
    setCurrentTab(tab);
  };

  const isLoggingIn = useSelector(state => getLoadingSelector(state, [LOGIN.REQUEST]));

  const onLoginPress = useCallback(
    async ({ email, password }) => {
      console.log('on login press');
      dispatch(loginRequest({ email, password }));
    },
    [dispatch],
  );

  const onLoginWithAgentAppPress = () => {
    Linking.openURL('myloginagentapp://login')
      .then()
      .catch(err => {
        const errorAgentAppNotInstalled = err.message.includes('Could not open URL');
        if (errorAgentAppNotInstalled) {
          showModal({
            title: 'Error',
            content: 'Please install login agent app to use this feature',
          });
        }
      });
  };

  useEffect(() => {
    const listener = Linking.addEventListener('url', async ({ url }) => {
      console.log('url', url);
      const result = queryString.parseUrl(url);
      if (result?.query?.access_token) {
        const profile = await getProfileApi({
          headers: {
            Authorization: `Bearer ${result?.query?.access_token}`,
          },
        });
        if (profile?.id) {
          dispatch(getUserProfile(profile));
          dispatch(
            loginSuccess({
              accessToken: result?.query?.access_token,
              refreshToken: result?.query?.refresh_token,
            }),
          );
        }
      }
    });
    return () => listener.remove();
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      NavigationServices.reset({ routes: [{ name: ROUTES.DRAWER }], index: 0 });
    }
  }, [isLoggedIn]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={100}
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
        <View style={styles.bottomPart}>
          <Formik
            innerRef={formRef}
            initialValues={{ email: '', password: '' }}
            onSubmit={onLoginPress}
            validationSchema={validationLoginSchema}>
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              handleBlur,
              handleReset,
              touched,
              setFieldTouched,
              dirty,
            }) => {
              return (
                <View style={styles.inputWrapper}>
                  <AppInput
                    style={styles.inputStyle}
                    title="Email address"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="Eg: nguyenvana@gmail.com"
                    error={dirty && touched.email && errors.email}
                    onBlur={handleBlur('email')}
                    onFocus={() => {
                      setFieldTouched('email');
                    }}
                  />
                  <AppInput
                    style={[styles.inputStyle]}
                    containerStyle={{ marginTop: 16 }}
                    title="Password"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="Enter Password"
                    secureTextEntry
                    onBlur={handleBlur('password')}
                    error={dirty && touched.password && errors.password}
                    onFocus={() => {
                      setFieldTouched('password');
                    }}
                  />
                  <TouchableOpacity style={styles.forgotContainer} onPress={handleReset}>
                    <AppText style={styles.forgotText}>Forgot password?</AppText>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
          <AppButton
            onPress={onLoginWithAgentAppPress}
            title="Login with My App"
            titleStyle={styles.buttonTitle}
            style={styles.buttonContainer}
          />
          <AppButton
            isLoading={isLoggingIn}
            onPress={() => {
              formRef.current?.handleSubmit();
            }}
            title="Login"
            titleStyle={styles.buttonTitle}
            style={styles.buttonContainer}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default React.memo(AuthScreen);
