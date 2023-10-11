import React, { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import AppText from '../../components/AppText';

const AnimatableTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ReanimatedDemo = () => {
  // const aniValue2 = useRef(new Animated.Value(0)).current;
  const translateX = useSharedValue(0);

  const moveToRandomPosition = () => {
    translateX.value = withSpring(Math.floor(Math.random() * 300));
  };

  // function moveToRandomPosition2() {
  //   Animated.spring(aniValue2, {
  //     toValue: Math.floor(Math.random() * 300),
  //     stiffness: 500,
  //     damping: 20,
  //     mass: 1,
  //     useNativeDriver: true,
  //   }).start();
  // }

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('a');
  //   }, 50);
  //   return () => interval();
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ margin: 16 }}>
        <AnimatableTouchable
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'red',
            },
            rStyle,
          ]}
        />
        <TouchableOpacity onPress={moveToRandomPosition} style={{ paddingTop: 16 }}>
          <AppText>Move to random position have bounce</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReanimatedDemo;
