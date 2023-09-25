import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProductItem from '~components/ProductItem';
import { DOMAIN } from '~constants/env';
import { FONTS } from '~constants/fonts';
import { USER_INITIAL_PAGE_SIZE, USER_LOAD_MORE_PAGE_SIZE } from '~constants/listConstants';
import { useAuth } from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import NavigationServices from '../utils/NavigationServices';

const initialState = {
  isRefresh: false,
  data: [],
  isFetching: true,
};

const SET_DATA = 'SET_DATA';
const LOAD_MORE = 'LOAD_MORE';
const SET_REFRESHING = 'SET_REFRESHING';
const SET_FETCHING = 'SET_FETCHING';

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_DATA: {
      return { ...state, data: payload || [] };
    }
    case LOAD_MORE: {
      return {
        ...state,
        data: [...state.data, ...payload],
      };
    }
    case SET_REFRESHING: {
      return {
        ...state,
        isRefresh: !!payload,
      };
    }
    case SET_FETCHING: {
      return {
        ...state,
        isFetching: !!payload,
      };
    }
    default:
      return state;
  }
};

const FlatListDemo = () => {
  const [isEndList, setIsEndList] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, isRefresh, isFetching } = state;
  const flatlistRef = useRef();
  const { handleAddToCart, removeAllCart } = useCart();
  const { setLogin } = useAuth();

  const fetchData = async (offset = 0, limit = USER_INITIAL_PAGE_SIZE) => {
    try {
      const result = await fetch(`${DOMAIN.BASE_URL}/products?offset=${offset}&limit=${limit}`);
      const resultJson = await result.json();
      return resultJson;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    dispatch({ type: SET_FETCHING, payload: true });
    fetchData()
      .then(res => {
        dispatch({ type: SET_DATA, payload: res });
        // setData(res);
        setCurrentOffset(USER_INITIAL_PAGE_SIZE);
      })
      .catch(err => console.log({ err }))
      .finally(() => dispatch({ type: SET_FETCHING, payload: false }));
  }, []);

  const handleRefresh = () => {
    if (isRefresh) {
      return;
    }
    // setIsRefreshing(true);
    dispatch({ type: SET_REFRESHING, payload: true });
    fetchData()
      .then(res => {
        // setData(res);
        dispatch({ type: SET_DATA, payload: res });
        setIsEndList(false);
      })
      .catch(err => console.log({ err }))
      .finally(() => dispatch({ type: SET_REFRESHING, payload: false }));
  };

  const handleEndReached = async () => {
    if (isFetching || isEndList) {
      return;
    }
    try {
      dispatch({ type: SET_FETCHING, payload: true });
      console.log('currentOffset', currentOffset);
      const result = await fetchData(currentOffset, USER_LOAD_MORE_PAGE_SIZE);
      if (result?.length < USER_LOAD_MORE_PAGE_SIZE) {
        setIsEndList(true);
      }
      // setData(prev => [...prev, ...result]);
      dispatch({ type: LOAD_MORE, payload: result });
      dispatch({ type: SET_FETCHING, payload: false });
      setCurrentOffset(currentOffset + USER_LOAD_MORE_PAGE_SIZE);
    } catch (error) {
      console.log({ error });
      dispatch({ type: SET_FETCHING, payload: false });
    }
  };

  const listEmptyComponent = useCallback(() => {
    if (isFetching) {
      return <ActivityIndicator size={'large'} />;
    }
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Danh sách rỗng</Text>
      </View>
    );
  }, [isFetching]);

  const listHeaderComponent = useCallback(
    () => (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 16,
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={() => {
            NavigationServices.openDrawer();
          }}>
          <AntDesign name="menuunfold" color={'red'} size={24} />
        </TouchableOpacity>
        <Text style={{ color: 'black', fontSize: 20, fontFamily: FONTS.BOLD }}>
          Danh sách lớp App K12 HCM
        </Text>
        <TouchableOpacity
          onPress={() => {
            NavigationServices.navigate('CartScreen');
          }}>
          <AntDesign name="shoppingcart" color={'green'} size={30} />
        </TouchableOpacity>
      </View>
    ),
    [],
  );

  const listFooterComponent = useCallback(() => {
    if (isFetching && data?.length > 0) {
      return <ActivityIndicator size={'large'} color={'green'} />;
    }
    return (
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text>Đã hết</Text>
      </View>
    );
  }, [isFetching, data]);

  const renderItem = useCallback(
    ({ item, index }) => (
      <ProductItem item={item} index={index} onAddToCart={() => handleAddToCart(item)} />
    ),
    [handleAddToCart],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isRefresh} onRefresh={handleRefresh} />}
        onEndReached={handleEndReached}
        initialNumToRender={20}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default FlatListDemo;
