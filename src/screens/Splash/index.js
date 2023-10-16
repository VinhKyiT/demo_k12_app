import React, { useCallback, useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { IMAGES } from '~assets/images';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';

const AppSplash = () => {
  const getIsShownOnboarding = async () => {
    const result = await LocalStorage.getData('IS_SHOWN_ONBOARDING');
    return result ? true : false;
  };

  const handleSplashData = useCallback(async () => {
    const isShownOnboarding = await getIsShownOnboarding();
    setTimeout(() => {
      if (isShownOnboarding) {
        NavigationServices.replace(ROUTES.AUTH_SCREEN);
      } else {
        NavigationServices.replace(ROUTES.ONBOARDING_SCREEN);
      }
    }, 300);
  }, []);

  useEffect(() => {
    handleSplashData();
  }, [handleSplashData]);
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
