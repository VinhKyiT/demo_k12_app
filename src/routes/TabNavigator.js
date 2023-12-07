import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import { ROUTES } from '../constants/routes';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.TAB_BAR_ACTIVE,
        tabBarInactiveTintColor: COLORS.TAB_BAR_INACTIVE,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'transparent', elevation: 0, borderTopWidth: 0 },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'cards-heart' : 'cards-heart-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name={ROUTES.WISHLIST}
        component={WishlistScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name={ROUTES.PROFILE}
        component={ProfileScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'clock' : 'clock-outline'}
              color={color}
              size={size}
            />
          ),
        }}
        name={ROUTES.HISTORY}
        component={HistoryScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
