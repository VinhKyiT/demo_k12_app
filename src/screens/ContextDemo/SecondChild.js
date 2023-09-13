import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { MyContext } from './ParentComponent';

const SecondChild = () => {
  // sử dụng useContext để lấy giá trị của MyContext
  const { data } = useContext(MyContext);
  return (
    <View>
      <Text>Data from Context: {data}</Text>
    </View>
  );
};

export default React.memo(SecondChild);
