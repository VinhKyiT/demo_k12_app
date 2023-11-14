import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigator from './TabNavigator';
import { ROUTES } from '../constants/routes';
import ConnectionCheckerScreen from '../screens/ConnectionCheckerScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/auth/auth.actions';
import NavigationServices from '../utils/NavigationServices';
import { SafeAreaView } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <SafeAreaView>
        <DrawerItemList {...props} />
        <DrawerItem
          label={'Logout'}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          )}
          onPress={() => {
            dispatch(logout());
            NavigationServices.reset({ routes: [{ name: ROUTES.AUTH_SCREEN }], index: 0 });
          }}
        />
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          drawerLabel: 'Trang chủ',
        }}
        name={ROUTES.TAB}
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          drawerLabel: 'Internet',
        }}
        name={ROUTES.CONNECTION_CHECKER_SCREEN}
        component={ConnectionCheckerScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
