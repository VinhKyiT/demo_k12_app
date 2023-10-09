import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IMAGES } from '../assets/images';
import FastImage from 'react-native-fast-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 215;

const CarouselDemo = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const flatlistRef = useRef();

  useEffect(() => {
    setData([
      {
        id: '1',
        image: IMAGES.MEN,
      },
      {
        id: '2',
        image: IMAGES.WOMEN,
      },
      {
        id: '3',
        image: IMAGES.KID,
      },
      {
        id: '4',
        image: IMAGES.HOME_DECOR,
      },
    ]);
  }, []);

  const DotNode = useCallback(() => {
    return (
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          top: CAROUSEL_HEIGHT - 16,
          alignSelf: 'center',
        }}>
        {Array.isArray(data) && data?.length > 0
          ? data.map((_, index) => {
              return (
                <View
                  key={'DOT_' + index}
                  style={{
                    marginHorizontal: 4,
                    width: 8,
                    height: 8,
                    borderRadius: 5,
                    backgroundColor: index === currentSlide ? 'green' : 'gray',
                  }}
                />
              );
            })
          : null}
      </View>
    );
  }, [currentSlide, data]);

  const renderItem = useCallback(({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} style={{ width: SCREEN_WIDTH, height: '100%' }}>
        <FastImage source={item.image} style={{ width: '100%', height: '100%' }} />
      </TouchableOpacity>
    );
  }, []);

  const handleScroll = useCallback(e => {
    if (!e) {
      return;
    }
    const { nativeEvent } = e;
    const currentOffset = nativeEvent.contentOffset.x;
    // console.log('SCREEN_WIDTH:' + SCREEN_WIDTH + ' -------- OFFSET:' + currentOffset);
    const currentIndex = Math.floor((currentOffset + SCREEN_WIDTH / 2) / SCREEN_WIDTH);
    setCurrentSlide(currentIndex);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentSlide === data?.length - 1) {
        flatlistRef.current.scrollToIndex({ index: 0 });
      } else {
        flatlistRef.current.scrollToIndex({ index: currentSlide + 1 });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSlide, data?.length]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatlistRef}
        horizontal
        snapToAlignment="start"
        snapToInterval={SCREEN_WIDTH}
        decelerationRate={'fast'}
        // pagingEnabled
        onScroll={handleScroll}
        contentContainerStyle={{ width: SCREEN_WIDTH * data.length, height: CAROUSEL_HEIGHT }}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <DotNode />
    </View>
  );
};

export default CarouselDemo;
