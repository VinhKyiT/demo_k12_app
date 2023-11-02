import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabNavigator from './TabNavigator';
import { ROUTES } from '../constants/routes';
import ConnectionCheckerScreen from '../screens/ConnectionCheckerScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <DrawerItemList {...props} />
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
