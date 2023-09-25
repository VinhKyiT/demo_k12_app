import React, { useCallback, useRef } from 'react';
import { FlatList, Text, View } from 'react-native';
import ProductItem from '~components/ProductItem';
import { FONTS } from '~constants/fonts';
import useCart from '~hooks/useCart';
import CustomButton from '../../components/CustomButton';
import NavigationServices from '../../utils/NavigationServices';

const CartScreen = () => {
  const flatlistRef = useRef();
  const { cartData, handleUpdateCartItem, handleRemoveFromCart } = useCart();

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Danh sách rỗng</Text>
        <CustomButton
          title="Về trang chủ"
          onPress={() => {
            console.log('back to DrawerNavigator');
            NavigationServices.navigate('TabNavigator');
          }}
        />
      </View>
    );
  }, []);

  const listHeaderComponent = useCallback(
    () => (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text style={{ color: 'black', fontSize: 20, fontFamily: FONTS.BOLD }}>Giỏ hàng</Text>
      </View>
    ),
    [],
  );

  const listFooterComponent = useCallback(() => {
    return (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text>Đã hết</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ProductItem
        item={item}
        index={index}
        onUpdateItemInCart={handleUpdateCartItem}
        onRemoveFromCart={() => handleRemoveFromCart(item.id)}
      />
    ),
    [handleRemoveFromCart, handleUpdateCartItem],
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatlistRef}
        data={cartData?.carts}
        keyExtractor={item => item.id}
        initialNumToRender={20}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CartScreen;
