import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/HomeScreen';
import { ROUTES } from '../constants/routes';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'green',
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: 'transparent', elevation: 0, borderTopWidth: 0 },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home Page',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name={ROUTES.HOME_SCREEN}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
