import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';

const TodoScreen = () => {
  const [todoList, setTodoList] = useState([]);

  return (
    <View style={styles.container}>
      <Text>TodoScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TodoScreen;
