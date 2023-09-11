import { View, Text, TouchableOpacity } from 'react-native';
import React, { useReducer } from 'react';

// Gia tri khoi tao - initialState
const initialState = 0;

// reducer -> ham
const reducer = (state, action) => {
  console.log('action', action);
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

// action -> hanh dong
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// dispatch -> la mot ham de kich hoat hanh dong

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('state', state);

  const handleIncrease = () => {
    dispatch({ type: INCREMENT, payload: 3 });
  };
  const handleDecrease = () => {
    dispatch({ type: DECREMENT });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={handleDecrease}>
          <Text style={{ fontSize: 40 }}>-</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 40, marginHorizontal: 16 }}>{state}</Text>
        <TouchableOpacity onPress={handleIncrease}>
          <Text style={{ fontSize: 40 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Counter;
