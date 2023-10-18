import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';

const WishlistScreen = () => {
  return (
    <View style={styles.container}>
      <Text>WishlistScreen</Text>
    </View>
  );
};

export default memo(WishlistScreen);
