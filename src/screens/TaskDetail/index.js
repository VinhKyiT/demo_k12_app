import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const TaskDetailScreen = () => {
  const { params } = useRoute();
  const taskItem = params?.item;
  return (
    <View style={{ flex: 1, backgroundColor: '#E8EAED', paddingHorizontal: 20 }}>
      <Text style={{ color: '#1A1A1A', fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>
        Task detail
      </Text>
      <View style={{ alignItems: 'center', marginTop: 50 }}>
        <Text style={{ fontSize: 30, fontWeight: '500', color: '#000000' }}>
          Task: <Text style={{ color: '#1B91FF' }}>{taskItem?.title}</Text>
        </Text>
        <Text style={{ fontSize: 30, fontWeight: '500', color: '#000000' }}>
          Status:{' '}
          <Text style={{ color: taskItem?.status === 'done' ? '#18D714' : 'orange' }}>
            {taskItem?.status}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default TaskDetailScreen;
