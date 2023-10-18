import React from 'react';
import { TextInput, View } from 'react-native';
import AppText from '../AppText';
import styles from './styles';
import { COLORS } from '../../constants/colors';

const AppInput = ({ title, titleStyle, containerStyle, ...props }) => {
  return (
    <View style={[styles.inputContainer, containerStyle && containerStyle]}>
      {!!title && <AppText style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</AppText>}
      <TextInput placeholderTextColor={COLORS.LIGHT_GRAY} style={styles.inputStyle} {...props} />
    </View>
  );
};

export default AppInput;
