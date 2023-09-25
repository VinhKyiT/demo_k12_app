import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import AsyncStorageDemo from '../examples/AsyncStorageDemo';
import TabNavigator from './TabNavigator';
import { useAuth } from '../hooks/useAuth';

function CustomDrawerContent(props) {
  const { handleLogout } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false }}>
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="AsyncStorageDemo" component={AsyncStorageDemo} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
