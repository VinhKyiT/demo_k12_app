import React, { useRef } from 'react';
import { Animated, Easing, PanResponder, TouchableOpacity, View } from 'react-native';
import AppText from '../../components/AppText';

const Animations = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const aniValue = useRef(new Animated.Value(0)).current;

  const aniValue2 = useRef(new Animated.Value(0)).current;

  const aniValue3 = useRef(new Animated.Value(0)).current;

  function moveToRandomPosition3() {
    Animated.timing(aniValue3, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }

  function moveToRandomPosition2() {
    Animated.spring(aniValue2, {
      toValue: Math.floor(Math.random() * 300),
      stiffness: 500,
      damping: 20,
      mass: 1,
      useNativeDriver: true,
    }).start();
  }

  function moveToRandomPosition() {
    Animated.timing(aniValue, {
      toValue: Math.floor(Math.random() * 300), // random 1 số lớn hơn 0 và bé hơn 300
      duration: 1000, //Thời gian thực thi
      delay: 500, // Thời gian delay trước khi thực thi
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  const moveToRandomPosition4 = () => {
    Animated.sequence([
      Animated.timing(aniValue, {
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
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const translateX = aniValue3.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [0, 150, 100, 200],
  });

  const scale = aniValue3.interpolate({
    inputRange: [0, 0.2, 0.8, 1],
    outputRange: [1, 0.6, 1.5, 1],
  });

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'red',
          },
          pan.getLayout(),
        ]}
        {...panResponder.panHandlers}
      />
      <View style={{ margin: 16, backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'green',
            transform: [
              {
                translateX: aniValue,
              },
            ],
          }}
        />
        <TouchableOpacity onPress={moveToRandomPosition} style={{ paddingTop: 16 }}>
          <AppText>Move to random position</AppText>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 16 }}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'red',
            transform: [
              {
                translateX: aniValue2,
              },
            ],
          }}
        />
        <TouchableOpacity onPress={moveToRandomPosition2} style={{ paddingTop: 16 }}>
          <AppText>Move to random position have bounce</AppText>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 16 }}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: 'red',
            transform: [
              {
                translateX,
              },
              {
                scale,
              },
            ],
          }}
        />
        <TouchableOpacity onPress={moveToRandomPosition3} style={{ paddingTop: 16 }}>
          <AppText>Move to random position but with interpolation</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={moveToRandomPosition4} style={{ paddingTop: 16 }}>
          <AppText>Move to specified position with composing</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Animations;
