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
import CameraScreen from '~screens/CameraScreen';
import CodeScannerScreen from '~screens/CodeScannerScreen';
import RenderHTMLScreen from '~screens/RenderHTML';
import WebViewScreen from '~screens/WebViewScreen';
import GeoLocationScreen from '~screens/GeoLocation';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
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
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
          drawerLabel: 'Camera',
        }}
        name={ROUTES.CAMERA}
        component={CameraScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
          ),
          drawerLabel: 'QR Scanner',
        }}
        name={ROUTES.CODE_SCANNER}
        component={CodeScannerScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="language-html5" color={color} size={size} />
          ),
          drawerLabel: 'Render HTML',
        }}
        name={ROUTES.RENDER_HTML}
        component={RenderHTMLScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="web" color={color} size={size} />
          ),
          drawerLabel: 'WebView',
        }}
        name={ROUTES.WEB_VIEW}
        component={WebViewScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
          drawerLabel: 'Geo Location',
        }}
        name={ROUTES.GEOLOCATION}
        component={GeoLocationScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
