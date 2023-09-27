import React, { useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { IMAGES } from '~assets/images';
import AppImage from '~components/AppImage';
import { useAuth } from '~hooks/useAuth';
import NavigationServices from '~utils/NavigationServices';

const AppSplash = () => {
  const { getUserData, getLoginStatus } = useAuth();
  useEffect(() => {
    getUserData()
      .then(res => {})
      .finally(async () => {
        const isLoggedIn = await getLoginStatus();
        SplashScreen.hide();
        if (isLoggedIn) {
          NavigationServices.replace('DrawerNavigator');
        } else {
          NavigationServices.replace('LoginScreen');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUserData]);
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
