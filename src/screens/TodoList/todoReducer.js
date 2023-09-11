import { SET_CURRENT_TASK, SET_TASKS_DONE, SET_TODOS } from './todoActions';

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
        todos: [...state.todos, { status: 'todo', title: payload }],
      };
    }
    case SET_TASKS_DONE: {
      const newTodo = state.todos[payload];
      state.todos.splice(payload, 1);
      return {
        ...state,
        tasksDone: [...state.tasksDone, { title: newTodo?.title, status: 'done' }],
      };
    }
    case SET_CURRENT_TASK: {
      return {
        ...state,
        currentTask: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialTodoState, todoReducer };
