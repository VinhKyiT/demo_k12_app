import { View, Text, SafeAreaView, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import ListItem from './ListItem';

const SwipeToDelete = () => {
  const titles = ['Cua lại vợ bầu', 'Em chưa 18', 'Doraemon', 'Conan'];
  const renderItem = useCallback(({ item }) => {
    return <ListItem item={item} />;
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ddd' }}>
      <FlatList
        renderItem={renderItem}
        data={titles}
        keyExtractor={(item, index) => item + index.toString()}
      />
    </SafeAreaView>
  );
};

export default SwipeToDelete;
