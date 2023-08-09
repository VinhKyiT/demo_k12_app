import React from 'react';
import { View } from 'react-native';

const FlexDimensionsBasics = () => {
  return (
    // Hãy thử xoá `flex: 1` của View cha.
    // Điều gì sẽ xảy ra nếu thay thế `flex: 1` thành `height: 300`?
    // View ở dưới sẽ chiếm 100% không gian của view cha
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <View style={{ flex: 1, backgroundColor: 'blue' }} />
      <View style={{ flex: 2, backgroundColor: 'green' }} />
    </View>
  );
};

export default FlexDimensionsBasics;
