import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SearchScreen</Text>
    </View>
  );
};

export default memo(SearchScreen);
