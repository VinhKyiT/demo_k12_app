import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { USER_INITIAL_PAGE_SIZE, USER_LOAD_MORE_PAGE_SIZE } from '../constants/listConstants';
import UserItem from '../components/UserItem';
import { FONTS } from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FlatListDemo = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndList, setIsEndList] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);

  const flatlistRef = useRef();

  const fetchData = async (offset = 0, limit = USER_INITIAL_PAGE_SIZE) => {
    try {
      const result = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`,
      );
      const resultJson = await result.json();
      return resultJson;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchData()
      .then(res => {
        setData(res);
        setCurrentOffset(USER_INITIAL_PAGE_SIZE);
      })
      .catch(err => console.log({ err }))
      .finally(() => setIsFetching(false));
  }, []);

  const handleRefresh = () => {
    if (isRefreshing) {
      return;
    }
    setIsRefreshing(true);
    fetchData()
      .then(res => {
        setData(res);
        setIsEndList(false);
      })
      .catch(err => console.log({ err }))
      .finally(() => setIsRefreshing(false));
  };

  const handleEndReached = async () => {
    if (isFetching || isEndList) {
      return;
    }
    try {
      setIsFetching(true);
      console.log('currentOffset', currentOffset);
      const result = await fetchData(currentOffset, USER_LOAD_MORE_PAGE_SIZE);
      if (result?.length < USER_LOAD_MORE_PAGE_SIZE) {
        setIsEndList(true);
      }
      setData(prev => [...prev, ...result]);
      setIsFetching(false);
      setCurrentOffset(currentOffset + USER_LOAD_MORE_PAGE_SIZE);
    } catch (error) {
      console.log({ error });
      setIsFetching(false);
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
      <View style={{ alignItems: 'center', marginVertical: 16 }}>
        <Text style={{ color: 'black', fontSize: 20, fontFamily: FONTS.BOLD }}>
          Danh sách lớp App K12 HCM
        </Text>
        <AntDesign name="team" color={'red'} size={30} />
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

  const renderItem = useCallback(({ item, index }) => <UserItem item={item} index={index} />, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatlistRef}
        data={data}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
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
    </View>
  );
};

export default FlatListDemo;
