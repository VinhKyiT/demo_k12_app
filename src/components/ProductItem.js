import { View, Text, StyleSheet, Image } from 'react-native';
import React, { memo } from 'react';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';

const ProductItem = ({ item, onAddToCart }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.images?.[0] }} style={styles.thumbnail} />
        </View>
        <View style={styles.itemContent}>
          <View style={styles.row}>
            <FontAwesome
              name="info-circle"
              size={16}
              color={'green'}
              style={styles.iconContainer}
            />
            <Text style={styles.text}>{item.id}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="product-hunt" size={16} color={'red'} style={styles.iconContainer} />
            <Text style={styles.text}>{item.title}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="dollar" size={16} color={'blue'} style={styles.iconContainer} />
            <Text style={styles.text}>{item.price}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="comment" size={16} color={'orange'} style={styles.iconContainer} />
            <Text style={styles.text}>{item.description}</Text>
          </View>
        </View>
      </View>
      <View>
        <CustomButton
          title="Thêm vào giỏ hàng"
          titleStyle={styles.buttonTitle}
          style={styles.buttonContainer}
          onPress={onAddToCart}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 2,
  },
  imageContainer: {
    marginRight: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  itemContent: {
    flexGrow: 1,
    flex: 1,
  },
  text: {
    fontFamily: FONTS.REGULAR,
    color: '#333',
    marginLeft: 8,
    lineHeight: 18,
  },
  iconContainer: {
    width: 24,
    textAlign: 'center',
  },
  buttonTitle: {
    fontFamily: FONTS.BOLD,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#217dbf',
    marginTop: 8,
  },
});

export default memo(ProductItem);
