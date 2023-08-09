import React from 'react';
import { View } from 'react-native';

const FlexWrapDemo = () => {
  return (
    <View style={{ flex: 1, flexWrap: 'wrap' }}>
      <View
        style={{
          width: 50,
          height: 200,
          backgroundColor: 'red',
        }}
      />
      <View style={{ width: 50, height: 200, backgroundColor: 'green' }} />
      <View style={{ width: 50, height: 200, backgroundColor: 'yellow' }} />
      <View style={{ width: 50, height: 200, backgroundColor: 'black' }} />
      <View style={{ width: 50, height: 200, backgroundColor: 'blue' }} />
    </View>
  );
};

export default FlexWrapDemo;
