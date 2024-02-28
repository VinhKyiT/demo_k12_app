import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getHomeCategoriesRequest } from '../../redux/home/home.actions';
import { getHomeCategoriesSelector } from '../../redux/home/home.selectors';
import AppLoading from '../../components/AppLoading';
import withLoading from '../../HOCs/withLoading';
import { GET_HOME_CATEGORIES } from '../../redux/home/home.constants';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const HomeScreen = () => {
  const [selectingCategory, setSelectingCategory] = useState(menuData[0].id);
  const [isAdShouldShow, setIsAdShouldShow] = useState(true);
  const [canCloseBannerAd, setCanCloseBannerAd] = useState(false);
  const dispatch = useDispatch();
  const categoriesData = useSelector(getHomeCategoriesSelector);

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
      onRightIconPress: () => NavigationServices.navigate(ROUTES.CART_SCREEN),
    }),
    [],
  );

  const onFoodCategoryItemPress = id => {
    setSelectingCategory(id);
  };

  const handleItemPress = useCallback(item => {
    NavigationServices.navigate(ROUTES.PRODUCT_DETAIL_SCREEN, { productId: item.id });
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={styles.itemContainer}>
          <FoodItem item={item} onItemPress={() => handleItemPress(item)} />
        </View>
      );
    },
    [handleItemPress],
  );

  useEffect(() => {
    dispatch(getHomeCategoriesRequest());
  }, [dispatch]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <AppHeader leftIcon={leftIconProps} rightIcon={rightIconProps} />
        <View style={styles.sloganContainer}>
          <AppText style={styles.sloganText}>{'Delicious \nfood and drink\nfor you'}</AppText>
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
          {categoriesData.data.map(item => {
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
      </ScrollView>
      {!!isAdShouldShow && (
        <View>
          <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            onAdLoaded={() => {
              setCanCloseBannerAd(true);
            }}
          />
          {!!canCloseBannerAd && (
            <TouchableOpacity
              style={{ position: 'absolute', top: 0, right: 0 }}
              onPress={() => {
                setIsAdShouldShow(false);
              }}>
              <AppIcon type="antdesign" name="closesquare" size={24} color={COLORS.GRAY} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default memo(withLoading(HomeScreen, [GET_HOME_CATEGORIES.REQUEST]));
