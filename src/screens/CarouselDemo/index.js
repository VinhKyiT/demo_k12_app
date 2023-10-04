import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { IMAGES } from '../../assets/images';
import FastImage from 'react-native-fast-image';
import Carousel from '../../components/Carousel';

const { width } = Dimensions.get('window');

const CarouselDemo = () => {
  const [data, setData] = useState([]);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View>
        <FastImage source={item.image} style={{ width: width, height: '100%' }} />
      </View>
    );
  }, []);

  const handleScroll = e => {
    const { nativeEvent } = e;
    console.log('SCREEN WIDTH:', width, '--- OFFSET:', nativeEvent.contentOffset.x);
    const imageIndex = Math.floor((nativeEvent.contentOffset.x + width / 2) / width);
    console.log('imageIndex', imageIndex);
  };

  useEffect(() => {
    // 1. Giả lập get data từ server
    const resData = [
      {
        id: '1',
        name: 'Product 1',
        image: IMAGES.MEN,
      },
      {
        id: '2',
        name: 'Product 2',
        image: IMAGES.WOMEN,
      },
      {
        id: '3',
        name: 'Product 3',
        image: IMAGES.KID,
      },
      {
        id: '4',
        name: 'Product 4',
        image: IMAGES.HOME_DECOR,
      },
    ];

    // 2. Set data sau khi đã có dữ liệu từ API
    setData(resData);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        data={[
          {
            id: 0,
            image: 'https://images.unsplash.com/photo-1607326957431-29d25d2b386f',
            title: 'Dahlia',
          }, // https://unsplash.com/photos/Jup6QMQdLnM
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1512238701577-f182d9ef8af7',
            title: 'Sunflower',
          }, // https://unsplash.com/photos/oO62CP-g1EA
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1627522460108-215683bdc9f6',
            title: 'Zinnia',
          }, // https://unsplash.com/photos/gKMmJEvcyA8
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1587814213271-7a6625b76c33',
            title: 'Tulip',
          }, // https://unsplash.com/photos/N7zBDF1r7PM
          {
            id: 4,
            image: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4',
            title: 'Chrysanthemum',
          }, // https://unsplash.com/photos/GsGZJMK0bJc
          {
            id: 5,
            image: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
            title: 'Hydrangea',
          }, // https://unsplash.com/photos/coIBOiWBPjk
        ]}
      />
    </View>
  );
};

export default CarouselDemo;
