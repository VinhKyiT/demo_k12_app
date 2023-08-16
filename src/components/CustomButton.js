import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, title = '', isLoading = false, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 40,
          paddingVertical: 20,
          backgroundColor: '#D9D9D9',
          borderRadius: 16,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style && style,
      ]}>
      {isLoading ? <ActivityIndicator /> : <Text>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;
