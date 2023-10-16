import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const AppText = ({ children, ...rest }) => {
  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
