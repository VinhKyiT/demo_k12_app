import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useRef } from 'react';

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

const FlatListDemo = () => {
  const flatListRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: true,
      });
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={DS_LOP}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center' }}>
            <Text>Danh sách rỗng</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: '500' }}>
              Danh sách lớp App K12 HCM
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ alignItems: 'center', marginVertical: 16 }}>
            <Text>Đã hết</Text>
          </View>
        )}
        contentContainerStyle={{}}
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
              <Text>Tuổi: </Text>
              <Text>{item.age}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default FlatListDemo;
