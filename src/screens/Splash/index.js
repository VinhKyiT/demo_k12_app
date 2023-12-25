import React, { useCallback, useEffect } from 'react';
import { ImageBackground, View, Linking } from 'react-native';
import { IMAGES } from '~assets/images';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';
import SplashScreen from 'react-native-splash-screen';
import useDeepLink from '~hooks/useDeepLink';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~redux/auth/auth.actions';
import { getBiometricStateSelector, loginStateSelector } from '~redux/auth/auth.selectors';

const AppSplash = () => {
  const { handleDeeplinkUrlReceived } = useDeepLink();
  const isLoggedIn = useSelector(loginStateSelector);
  const isBiometricEnabled = useSelector(getBiometricStateSelector);
  const dispatch = useDispatch();
  const getIsShownOnboarding = async () => {
    const result = await LocalStorage.getData('IS_SHOWN_ONBOARDING');
    return result ? true : false;
  };

  const handleBiometrics = useCallback(async () => {
    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then(resultObj => {
        const { success } = resultObj;
        if (success) {
          NavigationServices.replace(ROUTES.DRAWER);
        } else {
          console.log('Navigate to pin login');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
        dispatch(logout());
      });
  }, [dispatch]);

  const handleSplashData = useCallback(async () => {
    const isShownOnboarding = await getIsShownOnboarding();

    if (isShownOnboarding) {
      if (isLoggedIn) {
        if (isBiometricEnabled) {
          handleBiometrics();
          return;
        }
        NavigationServices.replace(ROUTES.DRAWER);
      } else {
        NavigationServices.replace(ROUTES.AUTH_SCREEN);
      }
    } else {
      NavigationServices.replace(ROUTES.ONBOARDING_SCREEN);
    }
  }, [handleBiometrics, isBiometricEnabled, isLoggedIn]);

  useEffect(() => {
    handleSplashData().finally(() => {
      setTimeout(() => SplashScreen.hide(), 50);
    });
  }, [handleSplashData]);

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        const lastUrl = LocalStorage.getData('LAST_URL');
        if (lastUrl) {
          return;
        }
        console.log('initial url', url);
        LocalStorage.storeData('LAST_URL', url);
        handleDeeplinkUrlReceived({ url });
      })
      .catch(err => console.log(err));
  }, [handleDeeplinkUrlReceived]);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={IMAGES.SPLASH_SCREEN}
        style={{ flex: 1 }}
        imageStyle={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default AppSplash;
