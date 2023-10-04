import { View, SafeAreaView, FlatList, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');
const CarouselView = ({ data, onPress }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef(null);
  const currentIndex = useRef(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const internal = setInterval(() => {
      if (data?.length > 0) {
        if (currentIndex.current === data?.length - 1) {
          scrollRef?.current?.scrollToIndex({
            animated: false,
            index: 0,
          });
          currentIndex.current = 0;
          setBannerIndex(0);
          return;
        }

        if (scrollRef?.current) {
          scrollRef?.current?.scrollToIndex({
            animated: true,
            index: currentIndex.current + 1,
          });
          currentIndex.current += 1;
        }
        setBannerIndex(currentIndex.current);
      }
    }, 3000);

    return () => {
      clearInterval(internal);
    };
  }, [currentIndex, scrollRef, data]);

  const renderItemCarousel = useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{ width: width, height: 207 }}
          onPress={() => {
            onPress(item);
          }}>
          <View style={styles.itemContent}>
            <FastImage style={styles.itemImage} source={{ uri: item?.image }} />
          </View>
        </TouchableOpacity>
      );
    },
    [onPress],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItemCarousel}
        bounces={false}
        decelerationRate={0}
        renderToHardwareTextureAndroid
        contentContainerStyle={styles.flatListContent}
        snapToInterval={width}
        snapToAlignment="start"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        scrollEventThrottle={16}
      />
      <View style={styles.dotsContainer}>
        {data?.map((item, index) => (
          <View
            key={`${item?.id}_${index}`}
            style={[styles.dot, index === bannerIndex && styles.activeDot]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(CarouselView);
