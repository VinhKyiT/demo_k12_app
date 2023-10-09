import { View, Text, FlatList, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IMAGES } from '../../assets/images';
import FastImage from 'react-native-fast-image';
import AppText from '../../components/AppText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 215;

const CarouselDemo = () => {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselRef = useRef();

  useEffect(() => {
    // Giả sử fetch API từ server
    setData([
      {
        id: '1',
        image: IMAGES.MEN,
      },
      {
        id: '2',
        image: IMAGES.WOMAN,
      },
      {
        id: '3',
        image: IMAGES.KID,
      },
      {
        id: '4',
        image: IMAGES.DECOR,
      },
    ]);
  }, []);

  const DotNode = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          top: CAROUSEL_HEIGHT - 16,
          alignSelf: 'center',
        }}>
        {Array.isArray(data) && data.length > 0
          ? data.map((item, index) => {
              return (
                <View
                  key={'DOT_' + index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: index === currentSlide ? 'red' : 'gray',
                    marginHorizontal: 4,
                  }}
                />
              );
            })
          : null}
      </View>
    );
  }, [data, currentSlide]);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={{ width: SCREEN_WIDTH, height: CAROUSEL_HEIGHT }}>
        <FastImage source={item.image} style={{ width: '100%', height: '100%' }} />
      </View>
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
        carouselRef.current.scrollToIndex({ index: 0 });
      } else {
        carouselRef.current.scrollToIndex({ index: currentSlide + 1 });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSlide, data?.length]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={carouselRef}
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        data={data}
        contentContainerStyle={{
          width: SCREEN_WIDTH * data?.length,
          height: CAROUSEL_HEIGHT,
        }}
        style={{ flexGrow: 0 }}
        // pagingEnabled
        snapToAlignment="start"
        snapToInterval={SCREEN_WIDTH}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <DotNode />
    </View>
  );
};

export default CarouselDemo;
