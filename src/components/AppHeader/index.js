import { View, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import AppIcon from '~components/AppIcon';
import AppText from '../AppText';

const AppHeader = ({ leftIcon = {}, rightIcon = {}, centerTitle }) => {
  const {
    leftIconName,
    leftIconColor,
    onLeftIconPress,
    leftIconSize = 24,
    leftIconType,
  } = leftIcon;
  const {
    rightIconName,
    rightIconColor,
    onRightIconPress,
    rightIconSize = 24,
    rightIconType,
  } = rightIcon;
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onLeftIconPress} style={styles.iconContainer}>
        <AppIcon
          type={leftIconType}
          name={leftIconName}
          size={leftIconSize}
          color={leftIconColor}
        />
      </TouchableOpacity>
      <View style={styles.centerTitleContainer}>
        <AppText style={styles.centerTitle}>{centerTitle}</AppText>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onRightIconPress} style={styles.iconContainer}>
        <AppIcon
          type={rightIconType}
          name={rightIconName}
          size={rightIconSize}
          color={rightIconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppHeader;
