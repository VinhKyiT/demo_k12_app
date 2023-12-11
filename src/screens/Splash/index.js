import React, { useCallback, useEffect, useState } from 'react';
import { ImageBackground, Linking, View } from 'react-native';
import { IMAGES } from '~assets/images';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '../../constants/routes';
import LocalStorage from '../../helpers/storage';
import SplashScreen from 'react-native-splash-screen';
import { useIsFocused } from '@react-navigation/native';

const AppSplash = () => {
  const [processing, setProcessing] = useState(true);
  const isFocused = useIsFocused();
  const getIsShownOnboarding = async () => {
    const result = await LocalStorage.getData('IS_SHOWN_ONBOARDING');
    return result ? true : false;
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        setProcessing(false);
        if (url) {
          SplashScreen.hide();
        } else {
          handleSplashData().finally(() => {
            setTimeout(() => SplashScreen.hide(), 50);
          });
        }
      })
      .catch(err => console.log(err));
  }, [handleSplashData]);

  const getIsLoggedInStatus = async () => {
    const loginStatus = await LocalStorage.getData('IS_LOGGED_IN');
    return !!loginStatus;
  };

  const handleSplashData = useCallback(async () => {
    console.log('>>> handle Splash Data');
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
    if (isFocused && !processing) {
      handleSplashData().finally(() => {
        setTimeout(() => SplashScreen.hide(), 50);
      });
    }
  }, [handleSplashData, isFocused, processing]);
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
