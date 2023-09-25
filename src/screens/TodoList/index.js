import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  AppState,
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import TaskItem from '~components/TaskItem';
import { initialTodoState, todoReducer } from './todoReducer';
import {
  REINIT_DATA,
  REMOVE_ITEM,
  SET_CURRENT_TASK,
  SET_TASKS_DONE,
  SET_TODOS,
  UNDO_SET_TASKS_DONE,
} from './todoActions';
import { getData, storeData } from '../../helpers/storage';

const TodoListScreen = () => {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const navigation = useNavigation();

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = useCallback(async () => {
    if (appStateVisible.match(/inactive|background/)) {
      // Luu du lieu
      await storeData('TODO_LIST_DATA', state);
    }
  }, [appStateVisible, state]);

  useEffect(() => {
    handleAppStateChange();
  }, [handleAppStateChange]);

  useEffect(() => {
    (async () => {
      const storageData = await getData('TODO_LIST_DATA');
      dispatch({ type: REINIT_DATA, payload: storageData });
    })();
  }, []);

  const handleAddItem = () => {
    if (state.currentTask !== '') {
      dispatch({ type: SET_TODOS, payload: state.currentTask });
      dispatch({ type: SET_CURRENT_TASK, payload: '' });
      Keyboard.dismiss();
    }
  };

  const handleItemClick = item => {
    navigation.navigate('TaskDetail', { item });
  };

  const handleTodoItemTickBoxClick = id => {
    dispatch({ type: SET_TASKS_DONE, payload: id });
  };

  const handleTaskDoneItemTickBoxClick = id => {
    dispatch({ type: UNDO_SET_TASKS_DONE, payload: id });
  };

  const handleDeleteButtonClick = id => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#E8EAED' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: 'bold' }}>Today's tasks</Text>
          <View style={{ marginTop: 16 }}>
            {state?.todos?.map((item, index) => {
              return (
                <TaskItem
                  key={item?.title + index.toString()}
                  item={item}
                  onItemClick={handleItemClick}
                  onItemTickBoxClick={handleTodoItemTickBoxClick}
                />
              );
            })}
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: 'bold' }}>Tasks done</Text>
          <View style={{ marginTop: 16 }}>
            {state?.tasksDone?.map((item, index) => {
              return (
                <TaskItem
                  key={item?.title + index.toString()}
                  item={item}
                  onItemClick={handleItemClick}
                  onItemTickBoxClick={handleTaskDoneItemTickBoxClick}
                  onDeleteButtonClick={handleDeleteButtonClick}
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
          value={state?.currentTask}
          onChangeText={text => {
            dispatch({ type: SET_CURRENT_TASK, payload: text });
          }}
          placeholder="Write a task"
          onSubmitEditing={handleAddItem}
          returnKeyType="go"
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
