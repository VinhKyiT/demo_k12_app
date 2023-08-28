import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import screens
import HomeScreen from '~screens/Home';
import DetailScreen from '~screens/Detail';
import TodoScreen from '~screens/Todo';
import TodoListScreen from '~screens/TodoList';
import TaskDetailScreen from '~screens/TaskDetail';
import FlatListDemo from '~examples/FlatListDemo';
import SectionListDemo from '~examples/SectionListDemo';
import BTVN_23 from '~examples/baitap/BTVN_23';
import DeviceEventEmitterDemo from '~screens/DeviceEventEmitter';
import DebouncingScreen from '~screens/Debouncing';
import ThrottlingScreen from '~screens/Throtlling';
import TextEditor from '~screens/TextEditor';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TextEditor" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TextEditor" component={TextEditor} />
        <Stack.Screen name="Debouncing" component={DebouncingScreen} />
        <Stack.Screen name="Throtlling" component={ThrottlingScreen} />
        <Stack.Screen name="DeviceEventEmitter" component={DeviceEventEmitterDemo} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="BTVN_23" component={BTVN_23} />
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
