/* eslint-disable react-hooks/rules-of-hooks */
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import AppText from '../components/AppText';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet';

const SWIPE_TO_DELETE_THRESHOLD = -70;

const ListItem = ({ item }) => {
  const translateX = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.translateX = translateX.value;
    },
    onActive: (e, ctx) => {
      console.log('active', e.translationX);
      translateX.value = e.translationX + ctx.translateX;
    },
    onEnd: (e, ctx) => {
      if (e.translationX + ctx.translateX <= SWIPE_TO_DELETE_THRESHOLD) {
        translateX.value = withSpring(SWIPE_TO_DELETE_THRESHOLD);
      } else {
        translateX.value = withSpring(0, {});
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            {
              width: SCREEN_WIDTH - 32,
              margin: 16,
              padding: 16,
              flexGrow: 1,
              borderRadius: 8,
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                height: 2,
                width: 2,
              },
              shadowRadius: 4,
              shadowOpacity: 0.3,
              zIndex: 1,
            },
            rStyle,
          ]}>
          <AppText>{item.name}</AppText>
        </Animated.View>
      </PanGestureHandler>
      <TouchableOpacity style={{ position: 'absolute', right: 35 }}>
        <Feather size={24} name="trash-2" color="red" />
      </TouchableOpacity>
    </View>
  );
};

const SwipeToDeleteDemo = () => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'VinhKyIT',
    },
    {
      id: '2',
      name: 'vinhky',
    },
    {
      id: '3',
      name: 'vkit',
    },
  ]);

  const renderItem = useCallback(({ item }) => {
    return <ListItem item={item} />;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }}>
      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default SwipeToDeleteDemo;
