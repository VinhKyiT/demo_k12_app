import React, { useCallback, useEffect } from 'react';
import { ImageBackground, View, Linking } from 'react-native';
import { IMAGES } from '~assets/images';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';
import SplashScreen from 'react-native-splash-screen';
import useDeepLink from '~hooks/useDeepLink';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useSelector } from 'react-redux';
import { getBiometricStateSelector, loginStateSelector } from '~redux/auth/auth.selectors';

const AppSplash = () => {
  const { handleDeeplinkUrlReceived } = useDeepLink();
  const isLoggedIn = useSelector(loginStateSelector);
  const isBioEnabled = useSelector(getBiometricStateSelector);
  const getIsShownOnboarding = async () => {
    const result = await LocalStorage.getData('IS_SHOWN_ONBOARDING');
    return result ? true : false;
  };
  const handleBiometrics = useCallback(async () => {
    console.log('handleBiometrics');
    const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });

    const isSupported = await rnBiometrics.isSensorAvailable();

    console.log('isSupported', isSupported);

    rnBiometrics
      .simplePrompt({ promptMessage: 'Confirm fingerprint' })
      .then(resultObject => {
        const { success } = resultObject;

        if (success) {
          console.log('successful biometrics provided');
          NavigationServices.replace(ROUTES.DRAWER);
        } else {
          console.log('user cancelled biometric prompt');
        }
      })
      .catch(() => {
        console.log('biometrics failed');
      });
  }, []);

  const handleSplashData = useCallback(async () => {
    const isShownOnboarding = await getIsShownOnboarding();

    if (isShownOnboarding) {
      if (isLoggedIn) {
        if (isBioEnabled) {
          handleBiometrics();
        } else {
          NavigationServices.replace(ROUTES.DRAWER);
        }
      } else {
        NavigationServices.replace(ROUTES.AUTH_SCREEN);
      }
    } else {
      NavigationServices.replace(ROUTES.ONBOARDING_SCREEN);
    }
  }, [handleBiometrics, isBioEnabled, isLoggedIn]);

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
