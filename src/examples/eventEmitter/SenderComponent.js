import React from 'react';
import { DeviceEventEmitter, Text, TouchableOpacity, View } from 'react-native';

const SenderComponent = () => {
  const sendCustomEvent = () => {
    DeviceEventEmitter.emit('customEvent', 'Xin chào, tôi đến từ SenderComponent!');
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Sender Component</Text>
      <TouchableOpacity onPress={sendCustomEvent}>
        <Text>Send Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SenderComponent;
