import React from 'react';
import { TextInput, View } from 'react-native';
import AppText from '../AppText';
import styles from './styles';

const AppInput = ({ title, titleStyle, containerStyle, ...props }) => {
  return (
    <View style={[styles.inputContainer, containerStyle && containerStyle]}>
      {!!title && <AppText style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</AppText>}
      <TextInput style={styles.inputStyle} {...props} />
    </View>
  );
};

export default AppInput;
