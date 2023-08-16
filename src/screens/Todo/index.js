import { View, Text, StyleSheet, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import CustomButton from '../../components/CustomButton';

const TodoScreen = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = () => {
    setTodoList(p => [...p, text]);
    setText('');
  };

  return (
    <View style={styles.container}>
      {/* Tên ứng dụng */}
      <Text style={styles.title}>VinhKyIT's Todo List</Text>
      {/* Logo */}
      <Image
        style={styles.logo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      {/* Ô nhập liệu */}
      <TextInput
        value={text}
        onChangeText={text => {
          setText(text);
        }}
        placeholder="Nhập việc cần làm"
      />
      {/* Nút thêm dữ liệu */}
      <CustomButton
        title="Thêm công việc"
        onPress={handleSubmit}
        style={styles.button}
      />
      {/* Danh sách các công việc đã thêm */}
      {todoList.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  button: {
    marginVertical: 20,
  },
});

export default TodoScreen;
