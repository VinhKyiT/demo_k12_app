import React from 'react';
import { TextInput, View } from 'react-native';
import AppText from '../AppText';
import styles from './styles';
import { COLORS } from '../../constants/colors';

const AppInput = ({ title, titleStyle, containerStyle, inputStyle, error, ...props }) => {
  return (
    <>
      <View style={[styles.inputContainer, containerStyle && containerStyle]}>
        {!!title && (
          <AppText style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</AppText>
        )}
        <TextInput
          placeholderTextColor={COLORS.LIGHT_GRAY}
          style={[styles.inputStyle, inputStyle && inputStyle]}
          {...props}
        />
      </View>
      {!!error && (
        <AppText color={COLORS.APP_RED} size={12} style={styles.errorText} weight="semibold">
          {error}
        </AppText>
      )}
    </>
  );
};

export default AppInput;
