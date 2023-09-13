import { DECREMENT, INCREMENT } from './counterActions';

// Gia tri khoi tao - initialState
const initialCounterState = 0;

// reducer -> ham
const counterReducer = (state, action) => {
  switch (action.type) {
    case INCREMENT: {
      if (state === 10) {
        return state;
      } else {
        if (action?.payload) {
          return state + action?.payload;
        } else {
          return state + 1;
        }
      }
    }
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

export { counterReducer, initialCounterState };
