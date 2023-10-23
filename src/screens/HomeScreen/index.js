import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import AppHeader from '~components/AppHeader';
import AppIcon from '~components/AppIcon';
import AppText from '~components/AppText';
import FoodItem from '~components/FoodItem';
import { COLORS } from '~constants/colors';
import { ROUTES } from '~constants/routes';
import { foodData, menuData } from '~mock';
import NavigationServices from '~utils/NavigationServices';
import styles from './styles';

const HomeScreen = () => {
  const [selectingCategory, setSelectingCategory] = useState(menuData[0].id);
  const leftIconProps = useMemo(
    () => ({
      leftIconType: 'feather',
      leftIconName: 'menu',
      leftIconColor: COLORS.BLACK,
      onLeftIconPress: () => {
        NavigationServices.openDrawer();
      },
    }),
    [],
  );

  const rightIconProps = useMemo(
    () => ({
      rightIconType: 'feather',
      rightIconName: 'shopping-cart',
      rightIconColor: COLORS.ICON_GRAY,
      onRightIconPress: () => console.log('Right icon press'),
    }),
    [],
  );

  const onFoodCategoryItemPress = id => {
    setSelectingCategory(id);
  };

  const handleItemPress = useCallback(item => {
    NavigationServices.navigate(ROUTES.PRODUCT_DETAIL_SCREEN, { productDetail: item });
  }, []);

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <FoodItem item={item} onItemPress={() => handleItemPress(item)} />
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader leftIcon={leftIconProps} rightIcon={rightIconProps} />
      <View style={styles.sloganContainer}>
        <AppText style={styles.sloganText}>{'Delicious \nfood for you'}</AppText>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          NavigationServices.navigate(ROUTES.SEARCH_SCREEN);
        }}
        style={styles.searchContainer}>
        <AppIcon type="ionicon" name="search" color={COLORS.BLACK} size={18} />
        <AppText style={styles.searchText}>Search</AppText>
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.foodCategoryScrollView}
        contentContainerStyle={styles.foodCategoryContainer}>
        {menuData.map(item => {
          return (
            <TouchableOpacity
              onPress={() => onFoodCategoryItemPress(item.id)}
              key={item.id}
              style={styles.foodCategoryItem}>
              <AppText
                style={[
                  styles.foodCategoryText,
                  selectingCategory === item?.id && { color: COLORS.TAB_BAR_ACTIVE },
                ]}>
                {item.name}
              </AppText>
              <View style={selectingCategory === item?.id ? styles.indicator : {}} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.seeMoreContainer}>
        <TouchableOpacity>
          <AppText style={styles.seeMoreText}>See more</AppText>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ flexGrow: 0 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 50,
          paddingBottom: 16,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={foodData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default memo(HomeScreen);
