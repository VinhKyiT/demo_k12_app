import React, { useReducer, createContext } from 'react';
import { View } from 'react-native';
import ChildCounter from './ChildCounter';
import { DECREMENT, INCREMENT } from './state/counterActions';
import { counterReducer, initialCounterState } from './state/counterReducer';

// tao context
export const CounterContext = createContext();

const Counter = () => {
  const [state, dispatch] = useReducer(counterReducer, initialCounterState);

  const handleIncrease = () => {
    dispatch({ type: INCREMENT });
  };
  const handleDecrease = () => {
    dispatch({ type: DECREMENT });
  };

  return (
    <CounterContext.Provider value={{ state, dispatch, handleIncrease, handleDecrease }}>
      <View style={{ flex: 1 }}>
        <ChildCounter />
      </View>
    </CounterContext.Provider>
  );
};

export default Counter;
