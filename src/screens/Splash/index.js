import React, { useCallback, useEffect } from 'react';
import { ImageBackground, View, Linking } from 'react-native';
import { IMAGES } from '~assets/images';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';
import SplashScreen from 'react-native-splash-screen';
import useDeepLink from '~hooks/useDeepLink';

const AppSplash = () => {
  const { handleDeeplinkUrlReceived } = useDeepLink();
  const getIsShownOnboarding = async () => {
    const result = await LocalStorage.getData('IS_SHOWN_ONBOARDING');
    return result ? true : false;
  };

  const getIsLoggedInStatus = async () => {
    const loginStatus = await LocalStorage.getData('IS_LOGGED_IN');
    return !!loginStatus;
  };

  const handleSplashData = useCallback(async () => {
    const isShownOnboarding = await getIsShownOnboarding();
    const isLoggedIn = await getIsLoggedInStatus();

    if (isShownOnboarding) {
      if (isLoggedIn) {
        NavigationServices.replace(ROUTES.DRAWER);
      } else {
        NavigationServices.replace(ROUTES.AUTH_SCREEN);
      }
    } else {
      NavigationServices.replace(ROUTES.ONBOARDING_SCREEN);
    }
  }, []);

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
