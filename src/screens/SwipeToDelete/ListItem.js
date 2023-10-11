import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import AppText from '../../components/AppText';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -80;
const TRANSLATE_X_THRESHOLD = -60;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ListItem = ({ item }) => {
  const translateX = useSharedValue(0);
  const deleteBtnOpacity = useSharedValue(0);

  const pan = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      const translateValue = e.translationX + ctx.translateX;
      if (translateValue <= TRANSLATE_X_THRESHOLD) {
        deleteBtnOpacity.value = withTiming(1, { duration: 300 });
      } else if (translateValue >= 0) {
        deleteBtnOpacity.value = withTiming(0, { duration: 300 });
      }
      if (translateValue > SWIPE_THRESHOLD) {
        translateX.value = translateValue;
      } else {
        translateX.value = SWIPE_THRESHOLD;
      }
    },
    onEnd: (e, ctx) => {
      if (e.translationX + ctx.translateX > TRANSLATE_X_THRESHOLD) {
        translateX.value = withSpring(0);
      }
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      opacity: deleteBtnOpacity.value,
    };
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={pan}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH - 32,
              backgroundColor: '#fff',
              padding: 16,
              borderColor: '#000',
              borderWidth: 1,
              borderRadius: 16,
              alignSelf: 'center',
              marginTop: 16,
            },
            reanimatedStyle,
          ]}>
          <AppText>{item}</AppText>
        </Animated.View>
      </PanGestureHandler>
      <AnimatedTouchable
        style={[
          {
            position: 'absolute',
            height: '100%',
            justifyContent: 'center',
            right: 32,
            marginTop: 8,
            zIndex: -1,
          },
          buttonStyle,
        ]}>
        <Feather name="trash-2" color="red" size={24} />
      </AnimatedTouchable>
    </View>
  );
};

export default ListItem;
