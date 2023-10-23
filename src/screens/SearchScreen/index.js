import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import styles from './styles';
import AppIcon from '~components/AppIcon';
import AppInput from '~components/AppInput';
import { foodData } from '~mock';
import FoodItem from '~components/FoodItem';
import AppText from '~components/AppText';
import { COLORS } from '~constants/colors';
import NavigationServices from '~utils/NavigationServices';
import { ROUTES } from '~constants/routes';

const SearchScreen = () => {
  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={[styles.itemWrapper]}>
        <View
          style={[
            styles.itemContainer,
            index % 2 !== 0 ? { marginTop: 96, marginLeft: 16 } : { marginTop: 48, marginLeft: 32 },
          ]}>
          <FoodItem
            item={item}
            index={index}
            onItemPress={() => {
              NavigationServices.navigate(ROUTES.PRODUCT_DETAIL_SCREEN, { productDetail: item });
            }}
          />
        </View>
      </View>
    );
  }, []);

  const listHeaderItem = useCallback(() => {
    const dataLength = foodData.length;
    return (
      <View style={styles.listHeaderContainer}>
        <AppText size={28} weight="bold" variant="rounded" color={COLORS.BLACK}>
          {`Found ${dataLength} items`}
        </AppText>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => NavigationServices.goBack()}>
          <AppIcon type="antdesign" name="left" />
        </TouchableOpacity>
        <AppInput
          placeholder="Search for foods"
          containerStyle={styles.headerInputContainer}
          inputStyle={styles.headerInput}
        />
      </View>
      <FlatList
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        data={foodData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        columnWrapperStyle={styles.listWrapper}
        scrollEventThrottle={16}
        ListHeaderComponent={listHeaderItem}
      />
    </View>
  );
};
useCallback;

export default memo(SearchScreen);
