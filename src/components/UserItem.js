import { View, Text, StyleSheet, Image } from 'react-native';
import React, { memo } from 'react';
import { FONTS } from '../constants/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const UserItem = ({ item, index }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image }} style={styles.thumbnail} />
      </View>
      <View style={styles.itemContent}>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="user" size={20} color={'#333'} />
          </View>
          <Text style={styles.text}>{item?.lastName + ' ' + item?.firstName}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="envelope" size={20} color={'#333'} />
          </View>
          <Text style={styles.text}>{item?.email}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="phone" size={20} color={'#333'} />
          </View>
          <Text style={styles.text}>{item?.phone}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="map-marker" size={20} color={'#333'} />
          </View>
          <Text style={styles.text}>{item?.address?.address + ', ' + item?.address?.city}</Text>
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
  iconWrapper: {
    width: 24,
    height: 24,
  },
});

export default memo(UserItem);
