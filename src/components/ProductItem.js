import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { memo } from 'react';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from './CustomButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductItem = ({ item, onAddToCart, onUpdateItemInCart, onRemoveFromCart }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemWrapper}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item?.images?.[0] }} style={styles.thumbnail} />
        </View>
        <View style={styles.itemContent}>
          <View style={styles.row}>
            <FontAwesome name="info-circle" size={16} color={'green'} />
            <Text style={styles.text}>{item.id}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="product-hunt" size={16} color={'red'} />
            <Text style={styles.text}>{item.title}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="dollar" size={16} color={'blue'} />
            <Text style={styles.text}>{item.price}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="comment" size={16} color={'orange'} />
            <Text style={styles.text}>{item.description}</Text>
          </View>
        </View>
      </View>
      {item?.quantity ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            disabled={item.quantity === 1}
            onPress={() => onUpdateItemInCart(item.id, -1)}>
            <Text style={{ fontSize: 26, color: item?.quantity === 1 ? '#bababa' : '#333' }}>
              -
            </Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 26, marginHorizontal: 16, color: '#333' }}>
            {item?.quantity}
          </Text>
          <TouchableOpacity onPress={() => onUpdateItemInCart(item.id, 1)}>
            <Text style={{ fontSize: 26, color: '#333' }}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }} onPress={onRemoveFromCart}>
            <AntDesign name="delete" color={'red'} size={26} />
          </TouchableOpacity>
        </View>
      ) : (
        <CustomButton
          title={'Thêm vào giỏ hàng'}
          onPress={onAddToCart}
          titleStyle={styles.buttonTitle}
          style={styles.buttonContainer}
        />
      )}
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
  itemWrapper: {
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
  buttonTitle: {
    color: '#fff',
    fontFamily: FONTS.SEMIBOLD,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: '#0490d6',
    marginTop: 12,
  },
});

export default memo(ProductItem);
