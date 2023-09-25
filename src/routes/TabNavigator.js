import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoListScreen from '../screens/TodoList';
import AsyncStorageDemo from '../examples/AsyncStorageDemo';
import DeviceEventEmitterDemo from '../screens/DeviceEventEmitter';
import TodoScreen from '../screens/Todo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'TodoList',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="TodoList"
        component={TodoListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Storage',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="AsyncStorageDemo"
        component={AsyncStorageDemo}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'EventEmitter',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="DeviceEventEmitter"
        component={DeviceEventEmitterDemo}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Todo',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        name="Todo"
        component={TodoScreen}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;
