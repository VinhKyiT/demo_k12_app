import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import screens
import HomeScreen from '../screens/Home';
import DetailScreen from '../screens/Detail';
import TodoScreen from '../screens/Todo';
import TodoListScreen from '../screens/TodoList';
import TaskDetailScreen from '../screens/TaskDetail';
import FlatListDemo from '../examples/FlatListDemo';
import SectionListDemo from '../examples/SectionListDemo';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FlatListDemo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="TodoList" component={TodoListScreen} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
        <Stack.Screen name="FlatListDemo" component={FlatListDemo} />
        <Stack.Screen name="SectionListDemo" component={SectionListDemo} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
