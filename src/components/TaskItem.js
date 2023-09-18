import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const TaskItem = ({ item, onItemClick, onItemTickBoxClick, onDeleteButtonClick }) => {
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
        justifyContent: 'space-between',
        marginBottom: 16,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => onItemTickBoxClick(item?.id)}
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
      </View>
      {item.status === 'done' ? (
        <TouchableOpacity onPress={() => onDeleteButtonClick?.(item?.id)}>
          <Feather name="trash-2" size={24} color={'#ff0000'} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};
export default TaskItem;
