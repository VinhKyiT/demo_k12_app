import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HistoryScreen</Text>
    </View>
  );
};

export default memo(HistoryScreen);
