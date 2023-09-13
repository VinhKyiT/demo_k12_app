import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { CounterContext } from '.';

const ChildCounter = () => {
  const { state, handleIncrease, handleDecrease } = useContext(CounterContext);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleDecrease}>
        <Text style={{ fontSize: 40 }}>-</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 40, marginHorizontal: 16 }}>{state}</Text>
      <TouchableOpacity onPress={handleIncrease}>
        <Text style={{ fontSize: 40 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChildCounter;
