import React, { useMemo } from 'react';
import { TextInput, View } from 'react-native';
import AppText from '../AppText';
import styles from './styles';
import { COLORS } from '../../constants/colors';

const AppInput = ({ title, titleStyle, containerStyle, inputStyle, error, ...props }) => {
  const finalInputStyle = useMemo(() => {
    const result = [styles.inputStyle];
    if (inputStyle) {
      result.push(inputStyle);
    }
    return result;
  }, [inputStyle]);

  return (
    <>
      <View style={[styles.inputContainer, containerStyle && containerStyle]}>
        {!!title && (
          <AppText style={[styles.titleStyle, titleStyle && titleStyle]}>{title}</AppText>
        )}
        <TextInput placeholderTextColor={COLORS.LIGHT_GRAY} style={finalInputStyle} {...props} />
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
