import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import FlatListDemo from '../examples/FlatListDemo';
import TodoListScreen from '../screens/TodoList';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorageDemo from '../examples/AsyncStorageDemo';
import ThrottlingScreen from '../screens/Throtlling';
import ModalExample from '~examples/ModalDemo';
import Animations from '../screens/Animations/Animations';
import TwitterProfile from '../screens/TwitterProfile';
import BottomSheetDemo from '../screens/BottomSheetDemo';
import CarouselDemo from '../screens/CarouselDemo';
import ReanimatedDemo from '../screens/Reanimated';
import DemoGestureHandler from '../screens/GestureHandler';
import SwipeToDelete from '../screens/SwipeToDelete';

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
        name="SwipeToDeleteScreen"
        component={SwipeToDelete}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Animations',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-numbered" color={color} size={size} />
          ),
        }}
        name="AnimationsScreen"
        component={Animations}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Storage',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="storage" color={color} size={size} />
          ),
        }}
        name="Storage"
        component={AsyncStorageDemo}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Throtlling',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="mouse-off" color={color} size={size} />
          ),
        }}
        name="Throtlling"
        component={ThrottlingScreen}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
