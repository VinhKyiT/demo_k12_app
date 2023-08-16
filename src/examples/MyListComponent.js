import React from 'react';
import { View, Text } from 'react-native';

const MyListComponent = ({ data = [] }) => {
  return (
    <View>
      {data.map(item => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

export default MyListComponent;
