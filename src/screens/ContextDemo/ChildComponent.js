import React, { useContext } from 'react';
import SecondChild from './SecondChild';
import { TextInput, View } from 'react-native';
import { MyContext } from './ParentComponent';

function ChildComponent() {
  const { data, handleChangeText } = useContext(MyContext);
  return (
    <View>
      <TextInput value={data} onChangeText={handleChangeText} placeholder="Hãy nhập nội dung" />
      <SecondChild />
    </View>
  );
}

export default ChildComponent;
