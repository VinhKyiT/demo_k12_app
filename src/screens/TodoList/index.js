import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TaskItem from '~components/TaskItem';
const TodoListScreen = () => {
  const [todos, setTodos] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const navigation = useNavigation();

  const handleAddItem = () => {
    if (currentTask !== '') {
      setTodos(prev => [...prev, { title: currentTask, status: 'todo' }]);
      setCurrentTask('');
      Keyboard.dismiss();
    }
  };

  const handleItemClick = item => {
    navigation.navigate('TaskDetail', { item });
  };

  const handleItemTickBoxClick = index => {
    const newTodo = todos[index];
    setTasksDone(prev => [...prev, { ...newTodo, status: 'done' }]);
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E8EAED' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: 'bold' }}>Today's tasks</Text>
          <View style={{ marginTop: 16 }}>
            {todos.map((item, index) => {
              return (
                <TaskItem
                  key={item?.title + index.toString()}
                  item={item}
                  index={index}
                  onItemClick={handleItemClick}
                  onItemTickBoxClick={handleItemTickBoxClick}
                />
              );
            })}
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: 'bold' }}>Tasks done</Text>
          <View style={{ marginTop: 16 }}>
            {tasksDone.map((item, index) => {
              return (
                <TaskItem
                  key={item?.title + index.toString()}
                  item={item}
                  index={index}
                  onItemClick={handleItemClick}
                  onItemTickBoxClick={handleItemTickBoxClick}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 40,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <TextInput
          value={currentTask}
          onChangeText={setCurrentTask}
          placeholder="Write a task"
          style={{
            backgroundColor: '#fff',
            width: '80%',
            height: 60,
            borderRadius: 30,
            padding: 16,
            elevation: 5,
          }}
        />
        <TouchableOpacity
          onPress={handleAddItem}
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 999,
            elevation: 5,
          }}>
          <Image
            source={require('~assets/images/icon_add.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default TodoListScreen;
