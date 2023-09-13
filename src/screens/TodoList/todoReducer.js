import {
  REMOVE_ITEM,
  SET_CURRENT_TASK,
  SET_TASKS_DONE,
  SET_TODOS,
  UNDO_SET_TASKS_DONE,
} from './todoActions';
import uuid from 'react-native-uuid';

// initialState
const initialTodoState = {
  todos: [],
  tasksDone: [],
  currentTask: '',
};

// ham reducer
const todoReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_TODOS: {
      return {
        ...state,
        todos: [...state.todos, { status: 'todo', title: payload, id: uuid.v4() }],
      };
    }
    case SET_TASKS_DONE: {
      const newTaskDone = state.todos?.find(item => item.id === payload);
      return {
        ...state,
        tasksDone: [...state.tasksDone, { ...newTaskDone, status: 'done' }],
        todos: state.todos?.filter(item => item.id !== payload),
      };
    }
    case UNDO_SET_TASKS_DONE: {
      const newTodo = state.tasksDone?.find(item => item.id === payload);
      return {
        ...state,
        todos: [...state.todos, { ...newTodo, status: 'todo' }],
        tasksDone: state.tasksDone?.filter(item => item.id !== payload),
      };
    }
    case SET_CURRENT_TASK: {
      return {
        ...state,
        currentTask: payload,
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        tasksDone: state.tasksDone.filter(item => item.id !== payload),
      };
    }
    default: {
      return state;
    }
  }
};

export { initialTodoState, todoReducer };
