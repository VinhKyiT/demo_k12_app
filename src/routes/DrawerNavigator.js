import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppImage from '../components/AppImage';
import AppText from '../components/AppText';
import { useAuth } from '../hooks/useAuth';
import CartScreen from '../screens/Cart';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const { navigation } = props;
  const { handleLogout, user } = useAuth();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={{ width: '100%', height: 100, backgroundColor: '#668EBD' }}>
        <View>
          {/* Avatar */}
          <AppImage />
          {/* Ten */}
          <AppText style={{ color: 'white' }}>Ten</AppText>
        </View>
        {/* Email */}
        <AppText style={{ color: 'white' }}>Email</AppText>
      </View>
      <DrawerItemList {...props} />
      <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(128, 128, 128, 0.3)' }} />
      <DrawerItem
        label={'Logout'}
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" color={color} size={size} />
        )}
        onPress={() => {
          navigation.closeDrawer();
          handleLogout();
        }}
      />
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
        name="TabNavigator"
        component={TabNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          drawerLabel: 'Giỏ hàng',
        }}
        name="CartScreen"
        component={CartScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
