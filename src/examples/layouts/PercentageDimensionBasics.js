import React from 'react';
import { View } from 'react-native';

const PercentageDimensionsBasics = () => {
  // Hãy thử xoá `height: '100%'` của View cha.
  return (
    <View style={{ height: '90%', backgroundColor: 'green' }}>
      <View
        style={{
          height: '15%',
          backgroundColor: 'rgba(204, 43, 172, 1)',
        }}
      />
      <View
        style={{
          width: '66%',
          height: '35%',
          backgroundColor: 'skyblue',
        }}
      />
      <View
        style={{
          width: '33%',
          height: '50%',
          backgroundColor: 'steelblue',
        }}
      />
    </View>
  );
};

export default PercentageDimensionsBasics;
