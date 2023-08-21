import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

const TaskItem = ({ item, index, onItemClick, onItemTickBoxClick }) => {
  return (
    <TouchableOpacity
      onPress={() => onItemClick(item)}
      style={{
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}>
      <TouchableOpacity
        onPress={() => onItemTickBoxClick(index)}
        style={{
          width: 24,
          height: 24,
          backgroundColor: 'rgba(85, 188, 246, 0.4)',
          borderRadius: 5,
        }}>
        {item.status === 'done' ? (
          <Image source={require('../assets/images/icon_check.png')} />
        ) : null}
      </TouchableOpacity>
      <Text style={{ marginLeft: 8, color: '#1A1A1A' }}>{item?.title}</Text>
    </TouchableOpacity>
  );
};
export default TaskItem;
