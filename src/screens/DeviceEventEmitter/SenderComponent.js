import { DeviceEventEmitter, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const SenderComponent = () => {
  const [dataReceived, setDataReceived] = useState('');
  const sendCustomEvent = () => {
    DeviceEventEmitter.emit('customEvent', {
      welcome: 'Xin chào, tôi đến từ SenderComponent! 2',
    });
  };

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('customName2', data => {
      setDataReceived(data);
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text>Sender Component</Text>
      <Text>Dữ liệu đã được nhận về: {dataReceived}</Text>
      <TouchableOpacity onPress={sendCustomEvent}>
        <Text>Send Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SenderComponent;
