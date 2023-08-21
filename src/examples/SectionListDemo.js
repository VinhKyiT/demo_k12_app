import { View, Text, FlatList, SectionList } from 'react-native';
import React, { useEffect, useRef } from 'react';

const DS_LOP = [
  { title: 'Giảng Viên', data: [{ id: '1', name: 'Vĩnh Kỳ', age: 20 }] },
  {
    title: 'Nhóm 1',
    data: [
      { id: '2', name: 'La Quốc Lương', age: 21 },
      { id: '3', name: 'Lê Ngọc Dũng', age: 22 },
    ],
  },
  {
    title: 'Nhóm 2',
    data: [
      { id: '4', name: 'Thanh Tùng', age: 23 },
      { id: '5', name: 'Quốc Thanh', age: 24 },
    ],
  },
  {
    title: 'Nhóm 3',
    data: [
      { id: '6', name: 'Đình Thọ', age: 25 },
      { id: '7', name: 'Lâm Phương', age: 26 },
    ],
  },
  {
    title: 'Nhóm 4',
    data: [
      { id: '8', name: 'Hanh', age: 27 },
      { id: '9', name: 'Trung Phát', age: 28 },
    ],
  },
  {
    title: 'Nhóm 5',
    data: [
      { id: '10', name: 'Minh Thuận', age: 29 },
      { id: '11', name: 'Quang Thực', age: 30 },
    ],
  },
];

const SectionListDemo = () => {
  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={DS_LOP}
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
        contentContainerStyle={{
          paddingHorizontal: 20,
        }}
        renderSectionHeader={({ section }) => (
          <Text
            style={{
              fontWeight: '500',
              fontSize: 20,
              marginTop: 16,
              marginBottom: 8,
            }}>
            {section.title}
          </Text>
        )}
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

export default SectionListDemo;
