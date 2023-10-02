import React, { useRef } from 'react';
import { Animated, Easing, PanResponder, Text, TouchableOpacity, View } from 'react-native';

const Animations = () => {
  const aniValue1 = useRef(new Animated.Value(0)).current;
  const aniValue2 = useRef(new Animated.Value(0)).current;

  function moveToRandomPosition() {
    Animated.sequence([
      Animated.timing(aniValue1, {
        toValue: 200,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(aniValue2, {
        toValue: 200,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }

  return (
    <View style={{ margin: 16 }}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'red',
          transform: [
            {
              translateX: aniValue1,
            },
          ],
        }}
      />
      <Animated.View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginTop: 16,
          backgroundColor: 'red',
          transform: [
            {
              translateX: aniValue2,
            },
          ],
        }}
      />
      <TouchableOpacity onPress={moveToRandomPosition} style={{ paddingTop: 16 }}>
        <Text>Move to specified position with composing</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Animations;
