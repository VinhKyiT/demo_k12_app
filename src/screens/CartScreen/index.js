import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { memo, useMemo, useCallback } from 'react';
import styles from './styles';
import AppHeader from '~components/AppHeader';
import NavigationServices from '~utils/NavigationServices';
import { COLORS } from '~constants/colors';
import AppText from '~components/AppText';
import AppIcon from '~components/AppIcon';
import FastImage from 'react-native-fast-image';
import { showModal } from '~components/AppModal';
import EmptyComponent from '../../components/EmptyComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getCartsSelector } from '~redux/cart/cart.selectors';
import { removeFromCart, updateCart } from '~redux/cart/cart.actions';

const CartScreen = () => {
  const listCart = useSelector(getCartsSelector);
  const dispatch = useDispatch();

  console.log('listCart', listCart);

  const headerLeftIconProps = useMemo(
    () => ({
      leftIconType: 'antdesign',
      leftIconName: 'left',
      leftIconColor: COLORS.BLACK,
      onLeftIconPress: () => {
        NavigationServices.goBack();
      },
    }),
    [],
  );

  const handleIncrease = useCallback(
    item => {
      dispatch(updateCart({ id: item?.id, quantity: 1 }));
    },
    [dispatch],
  );
  const handleDecrease = useCallback(
    item => {
      if (item.quantity === 1) {
        showModal({
          title: 'Thông báo',
          content: `Bạn có chắc muốn xoá ${item.name} khỏi giỏ hàng?`,
          hasCancel: true,
          cancelText: 'No',
          confirmText: 'Yes',
          onConfirm: () => dispatch(removeFromCart(item.id)),
          revertButtons: true,
        });
      } else {
        dispatch(updateCart({ id: item?.id, quantity: -1 }));
      }
    },
    [dispatch],
  );
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <View style={styles.itemContainer}>
          <FastImage source={item.image} style={styles.itemImage} />
          <View style={styles.itemBody}>
            <AppText
              variant="rounded"
              weight="semibold"
              size={17}
              style={styles.itemName}
              numberOfLines={1}>
              {item?.name}
            </AppText>
            <AppText variant="rounded" weight="semibold" color={COLORS.BUTTON_ORANGE}>
              {(item?.price * item?.quantity).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </AppText>
          </View>
          <View style={styles.itemQuantity}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleDecrease(item)}>
              <AppIcon type="feather" name="minus" size={15} color={COLORS.WHITE} />
            </TouchableOpacity>
            <AppText
              size={13}
              variant="rounded"
              weight="semibold"
              color={COLORS.WHITE}
              style={{ marginHorizontal: 4 }}>
              {item?.quantity}
            </AppText>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleIncrease(item)}>
              <AppIcon type="feather" name="plus" size={15} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [handleDecrease, handleIncrease],
  );

  const listHeaderComponent = useCallback(() => {
    return (
      <View style={styles.listHeaderContainer}>
        <AppIcon size={20} type="material-community" name="gesture-swipe-left" />
        <AppText size={10}>swipe on an item to delete</AppText>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <AppHeader centerTitle={'Cart'} leftIcon={headerLeftIconProps} />
      <FlatList
        ListEmptyComponent={
          <EmptyComponent
            icon={{
              type: 'feather',
              name: 'shopping-cart',
              size: 160,
              color: COLORS.ICON_LIGHT_GRAY,
            }}
            title="No products yet"
            description="Hit the orange button down below to Create an order"
          />
        }
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.listContentStyle}
        data={listCart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default memo(CartScreen);
