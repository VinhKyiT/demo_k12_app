/**
MainNavigator
--Drawer
----TabNavigator
-------Home
-------Wishlist
-------Profile
-------History
...
 */
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import screens
import AuthScreen from '~screens/AuthScreen';
import AppSplash from '~screens/Splash';
import { ROUTES } from '../constants/routes';
import OnboardingScreen from '../screens/OnboardingScreen';
import NavigationServices from '../utils/NavigationServices';
import DrawerNavigator from './DrawerNavigator';
import SearchScreen from '../screens/SearchScreen';
import ProductDetailScreen from '~screens/ProductDetailScreen';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MainNavigator() {
  return (
    <NavigationContainer ref={NavigationServices.navigationRef}>
      <Stack.Navigator
        initialRouteName={ROUTES.SPLASH_SCREEN}
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
          // cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
        <>
          <Stack.Screen name={ROUTES.SPLASH_SCREEN} component={AppSplash} />
          <Stack.Screen name={ROUTES.DRAWER} component={DrawerNavigator} />
          <Stack.Screen name={ROUTES.AUTH_SCREEN} component={AuthScreen} />
          <Stack.Screen name={ROUTES.ONBOARDING_SCREEN} component={OnboardingScreen} />
          <Stack.Screen name={ROUTES.SEARCH_SCREEN} component={SearchScreen} />
          <Stack.Screen name={ROUTES.PRODUCT_DETAIL_SCREEN} component={ProductDetailScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
