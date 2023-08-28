import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import UserItem from '../../components/UserItem';
import { FONTS } from '../../constants/fonts';
import { USER_INITIAL_PAGE_SIZE, USER_LOAD_MORE_PAGE_SIZE } from '../../constants/listConstants';

const BTVN_23 = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEndList, setIsEndList] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const typingTimerRef = useRef();
  const flatlistRef = useRef();

  const handleInputChange = useCallback(text => {
    setSearchTerm(text);
    if (text) {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
      }
      typingTimerRef.current = setTimeout(async () => {
        const result = await fetch(`https://dummyjson.com/users/search?q=${text}`);
        const resultJson = await result.json();
        setIsEndList(true);
        console.log(
          'resultJson?.users',
          resultJson?.total,
          `https://dummyjson.com/users?search&q=${text}`,
        );
        setData(resultJson?.users);
      }, 500);
    }
  }, []);

  const fetchData = async (offset = 0, limit = USER_INITIAL_PAGE_SIZE) => {
    try {
      const result = await fetch(`https://dummyjson.com/users?skip=${offset}&limit=${limit}`);
      const resultJson = await result.json();
      return resultJson?.users;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (searchTerm === '') {
      setIsFetching(true);
      fetchData()
        .then(res => {
          setData(res);
          setCurrentOffset(USER_INITIAL_PAGE_SIZE);
          setIsEndList(false);
        })
        .catch(err => console.log({ err }))
        .finally(() => setIsFetching(false));
    }
  }, [searchTerm]);

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
    console.log('isFetching || isEndList', isFetching, isEndList);
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
          Danh sách người dùng
        </Text>
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
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <TextInput
          value={searchTerm}
          onChangeText={handleInputChange}
          placeholder="Tìm kiếm"
          style={{
            backgroundColor: '#fff',
            width: '90%',
            padding: 16,
            borderRadius: 8,
            marginTop: 16,
            alignSelf: 'center',
          }}
        />
      </View>
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
        contentContainerStyle={{ padding: 16 }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default BTVN_23;
