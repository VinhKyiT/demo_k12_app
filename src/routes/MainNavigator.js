import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
// import screens
import SectionListDemo from '~examples/SectionListDemo';
import BTVN_23 from '~examples/baitap/BTVN_23';
import { useAuth } from '~hooks/useAuth';
import ParentComponent from '~screens/ContextDemo/ParentComponent';
import DebouncingScreen from '~screens/Debouncing';
import DetailScreen from '~screens/Detail';
import DeviceEventEmitterDemo from '~screens/DeviceEventEmitter';
import HomeScreen from '~screens/Home';
import LoginScreen from '~screens/LoginScreen';
import TaskDetailScreen from '~screens/TaskDetail';
import TextEditor from '~screens/TextEditor';
import TodoScreen from '~screens/Todo';
import { getData } from '../helpers/storage';
import CartScreen from '../screens/Cart';
import Counter from '../screens/Counter';
import SignupScreen from '../screens/SignupScreen';
import NavigationServices from '../utils/NavigationServices';
import DrawerNavigator from './DrawerNavigator';
import AppSplash from '~screens/Splash';

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
  const { setLogin } = useAuth();
  const getAccessToken = async () => {
    const tokenData = await getData('TOKEN');
    return tokenData;
  };
  useEffect(() => {
    getAccessToken()
      .then(res => {
        if (res?.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      })
      .finally(() => {
        // an splash screen
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <NavigationContainer ref={NavigationServices.navigationRef}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
        <>
          <Stack.Screen name="SplashScreen" component={AppSplash} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ContextDemo" component={ParentComponent} />
          <Stack.Screen name="TextEditor" component={TextEditor} />
          <Stack.Screen name="Counter" component={Counter} />
          <Stack.Screen name="Debouncing" component={DebouncingScreen} />
          <Stack.Screen name="DeviceEventEmitter" component={DeviceEventEmitterDemo} />
          <Stack.Screen name="Todo" component={TodoScreen} />
          <Stack.Screen name="BTVN_23" component={BTVN_23} />
          <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
          <Stack.Screen name="SectionListDemo" component={SectionListDemo} />
          <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
