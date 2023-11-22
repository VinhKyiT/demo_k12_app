import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const AppButton = ({
  onPress,
  title = '',
  isLoading = false,
  style,
  titleStyle,
  disabled,
  loadingIndicatorProps,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.buttonContainer, style && style]}>
      {isLoading ? (
        <ActivityIndicator {...loadingIndicatorProps} />
      ) : (
        <Text style={titleStyle ? titleStyle : {}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;
