import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import AppText from '../AppText';
import styles from './styles';

const FoodItem = ({ item, onItemPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
        <View style={styles.itemWrapper}>
          <FastImage
            source={item.image}
            style={styles.itemImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <AppText numberOfLines={2} style={styles.itemNameText}>
            {item.name}
          </AppText>
          <AppText style={styles.itemPriceText}>
            {item.price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(FoodItem);
