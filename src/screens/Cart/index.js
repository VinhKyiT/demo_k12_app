import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductItem from '~components/ProductItem';
import { FONTS } from '~constants/fonts';
import useCart from '~contexts/CartContext/useCart';

const CartScreen = () => {
  const { cartData } = useCart();

  console.log('cartData', cartData);

  const navigation = useNavigation();

  const flatlistRef = useRef();

  const listEmptyComponent = useCallback(() => {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Danh sách rỗng</Text>
      </View>
    );
  }, []);

  const listHeaderComponent = useCallback(
    () => (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text style={{ color: 'black', fontSize: 20, fontFamily: FONTS.BOLD }}>
          Danh sách lớp App K12 HCM
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <AntDesign name="shoppingcart" color={'red'} size={30} />
        </TouchableOpacity>
      </View>
    ),
    [navigation],
  );

  const listFooterComponent = useCallback(() => {
    return (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text>Đã hết</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => <ProductItem item={item} index={index} />,
    [],
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
