import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppImage from '../components/AppImage';
import AppText from '../components/AppText';
import { useAuth } from '../hooks/useAuth';
import CartScreen from '../screens/Cart';
import TabNavigator from './TabNavigator';
import { FONTS } from '~constants/fonts';
import NavigationServices from '~utils/NavigationServices';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const { navigation } = props;
  const { handleLogout, user } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={{ width: '100%', backgroundColor: '#668EBD', padding: 8 }}>
        <View style={{ alignItems: 'flex-start' }}>
          {/* Avatar */}
          <AppImage
            source={{ uri: user?.avatar }}
            style={{ width: 70, height: 70, borderRadius: 999 }}
          />
          <View style={{ marginTop: 16 }}>
            {/* Ten */}
            <AppText style={{ color: 'white', fontFamily: FONTS.BOLD, fontSize: 16 }}>
              {user?.name}
            </AppText>
            {/* Email */}
            <AppText style={{ color: '#e8e8e8' }}>{user?.email}</AppText>
          </View>
        </View>
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
          NavigationServices.reset({
            index: 0,
            routes: [
              {
                name: 'LoginScreen',
              },
            ],
          });
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
