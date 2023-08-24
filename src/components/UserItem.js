import { View, Text, StyleSheet, Image } from 'react-native';
import React, { memo } from 'react';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer}>
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
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
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
});

export default memo(UserItem);
