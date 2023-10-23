import React, { useMemo } from 'react';
import { Text } from 'react-native';
import styles from './styles';
import { COLORS } from '~constants/colors';
import { FONTS } from '~constants/fonts';

const AppText = ({
  children,
  size = 14,
  color = COLORS.BLACK,
  weight = 'regular',
  variant = 'text',
  ...rest
}) => {
  const containerStyle = useMemo(() => {
    const resultStyle = [];
    const fontWeight = weight.toUpperCase();
    const fontVariant = variant.toUpperCase();
    const styleByProps = {
      fontSize: size,
      fontFamily: FONTS[fontVariant][fontWeight],
      color,
    };
    resultStyle.push(styles.text);
    resultStyle.push(styleByProps);
    return resultStyle;
  }, []);
  return (
    <Text style={containerStyle} {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
