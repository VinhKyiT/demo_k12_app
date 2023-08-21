import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const DS_LOP = [
  { id: '1', name: 'Vĩnh Kỳ', age: 20 },
  { id: '2', name: 'La Quốc Lương', age: 21 },
  { id: '3', name: 'Lê Ngọc Dũng', age: 22 },
  { id: '4', name: 'Thanh Tùng', age: 23 },
  { id: '5', name: 'Quốc Thanh', age: 24 },
  { id: '6', name: 'Đình Thọ', age: 25 },
  { id: '7', name: 'Lâm Phương', age: 26 },
  { id: '8', name: 'Hanh', age: 27 },
  { id: '9', name: 'Trung Phát', age: 28 },
  { id: '10', name: 'Minh Thuận', age: 29 },
  { id: '11', name: 'Quang Thực', age: 30 },
  // ...
];

const DS_LOP2 = [
  { id: '1', name: 'Bùi Phạm Vĩnh Kỳ', age: 20 },
  { id: '2', name: 'La Quốc Lương', age: 21 },
  { id: '3', name: 'Lê Ngọc Dũng', age: 22 },
  { id: '4', name: 'Thanh Tùng', age: 23 },
  { id: '5', name: 'Quốc Thanh', age: 24 },
  { id: '6', name: 'Đình Thọ', age: 25 },
  { id: '7', name: 'Lâm Phương', age: 26 },
  { id: '8', name: 'Hanh', age: 27 },
  { id: '9', name: 'Trung Phát', age: 28 },
  { id: '10', name: 'Minh Thuận', age: 29 },
  { id: '11', name: 'Quang Thực', age: 30 },
  // ...
];

const FlatListDemo = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUser = async () => {
    try {
      const result = await fetch('https://api.escuelajs.co/api/v1/users');
      const resultJson = await result.json();
      return resultJson;
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    setIsFetching(true);
    fetchUser()
      .then(res => setData(res))
      .catch(err => console.log({ err }))
      .finally(() => setIsFetching(false));
  }, []);

  const handleRefresh = () => {
    if (isRefreshing) {
      return;
    }
    console.log('handleRefresh');
    setIsRefreshing(true);
    fetchUser()
      .then(res => setData(res))
      .catch(err => console.log({ err }))
      .finally(() => setIsRefreshing(false));
  };

  console.log('isFetching', isFetching);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => {
          if (isFetching) {
            return <ActivityIndicator size={'large'} />;
          }
          return (
            <View style={{ alignItems: 'center' }}>
              <Text>Danh sách rỗng</Text>
            </View>
          );
        }}
        ListHeaderComponent={() => (
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>
              Danh sách lớp App K12 HCM
            </Text>
          </View>
        )}
        ListFooterComponent={() => {
          if (isFetching) {
            return null;
          }
          return (
            <View style={{ alignItems: 'center', marginVertical: 16 }}>
              <Text>Đã hết</Text>
            </View>
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 16,
              borderColor: 'black',
              borderWidth: 1,
              borderRadius: 16,
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Tên: </Text>
              <Text>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
              <Text>Email: </Text>
              <Text>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FlatListDemo;
