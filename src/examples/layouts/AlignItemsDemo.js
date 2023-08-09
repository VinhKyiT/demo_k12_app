import { View, Text } from 'react-native';
import React from 'react';

const AlignItemsDemo = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'aliceblue',
        alignItems: 'flex-end',
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: 'red',
          alignSelf: 'center',
        }}
      />
      <View style={{ width: 50, height: 50, backgroundColor: 'green' }} />
      <View style={{ width: 100, height: 50, backgroundColor: 'yellow' }} />
    </View>
  );
};

export default AlignItemsDemo;
