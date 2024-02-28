import { Formik } from 'formik';
import queryString from 'query-string';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGES } from '~assets/images';
import AppButton from '~components/AppButton';
import AppInput from '~components/AppInput';
import AppText from '~components/AppText';
import { ROUTES } from '~constants/routes';
import { loginRequest, loginSuccess } from '~redux/auth/auth.actions';
import { loginErrorSelector, loginStateSelector } from '~redux/auth/auth.selectors';
import { getProfileApi } from '~services/apis/auth.apis';
import NavigationServices from '~utils/NavigationServices';
import { LOGIN } from '../../redux/auth/auth.constants';
import { getLoadingSelector } from '../../redux/loading/loading.selectors';
import { getUserProfile } from '../../redux/profile/profile.actions';
import { validationLoginSchema } from '../../utils/schemas/loginSchema';
import styles from './styles';
const AuthScreen = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const loginError = useSelector(loginErrorSelector);
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
    Linking.openURL('myloginagentapp://login');
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
