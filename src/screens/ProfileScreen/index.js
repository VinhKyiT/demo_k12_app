import { View, Text } from 'react-native';
import React, { memo } from 'react';
import styles from './styles';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

export default memo(ProfileScreen);
