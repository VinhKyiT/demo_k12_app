import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS } from '../constants/fonts';

const AppText = ({ children, ...rest }) => {
  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontFamily: FONTS.REGULAR,
  },
});

export default AppText;
