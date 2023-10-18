import Color from 'color';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { androidRipple } from './androidRipple';
import getIconStyle from './getIconStyle';
import getIconType from './getIconType';
import { COLORS } from '../../constants/colors';

const AppIcon = ({
  type = 'material',
  name,
  size = 24,
  color: colorProp,
  iconStyle,
  iconProps,
  underlayColor = 'transparent',
  reverse = false,
  raised = false,
  containerStyle,
  reverseColor: reverseColorProp,
  disabled = false,
  disabledStyle,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  Component = onPress || onLongPress || onPressIn || onPressOut ? Pressable : View,
  solid = false,
  brand = false,
  pressableProps,
  ...rest
}) => {
  const color = colorProp || COLORS.BLACK;
  const reverseColor = reverseColorProp || COLORS.WHITE;
  const IconComponent = getIconType(type);
  const iconSpecificStyle = getIconStyle(type, { solid, brand });

  const getBackgroundColor = React.useMemo(() => {
    if (reverse) {
      return color;
    }
    return raised ? COLORS.WHITE : 'transparent';
  }, [color, raised, reverse]);

  const buttonStyles = React.useMemo(
    () => ({
      borderRadius: size + 4,
      height: size * 2 + 4,
      width: size * 2 + 4,
    }),
    [size],
  );

  return (
    <View
      style={StyleSheet.flatten([
        !raised && styles.container,
        (reverse || raised) && styles.button,
        (reverse || raised) && buttonStyles,
        raised && styles.raised,
        iconStyle && iconStyle.borderRadius
          ? {
              borderRadius: iconStyle.borderRadius,
            }
          : {},
        containerStyle && containerStyle,
      ])}
      testID="ICON__CONTAINER">
      <Component
        testID="ICON__CONTAINER_ACTION"
        {...{
          android_ripple: androidRipple(
            Color(reverse ? color : underlayColor)
              .alpha(0.3)
              .rgb()
              .string(),
          ),
          onPress,
          onLongPress,
          onPressIn,
          onPressOut,
          disabled,
          accessibilityRole: 'button',
          ...pressableProps,
          ...rest,
        }}>
        <View
          style={StyleSheet.flatten([
            (reverse || raised) && buttonStyles,
            {
              backgroundColor: getBackgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
            },
            disabled && styles.disabled,
            disabled && disabledStyle,
          ])}
          testID="HIREC__ICON">
          <IconComponent
            testID="HIREC__ICON__Component"
            style={StyleSheet.flatten([{ backgroundColor: 'transparent' }, iconStyle && iconStyle])}
            size={size}
            name={name}
            color={reverse ? reverseColor : color}
            {...iconSpecificStyle}
            {...iconProps}
          />
        </View>
      </Component>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  button: {
    margin: 7,
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  disabled: {
    backgroundColor: '#D1D5D8',
  },
});

AppIcon.displayName = 'AppIcon';

export default AppIcon;
