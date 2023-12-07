import { INCREMENT_COUNTER } from './counter.constants';

const initialState = {
  count: 0,
};

const counterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case INCREMENT_COUNTER.SUCCESS: {
      return {
        ...state,
        count: state.count + payload,
      };
    }
    default:
      return state;
  }
};

export default counterReducer;
