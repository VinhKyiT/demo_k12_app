import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ReceiverComponent = () => {
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener('customEvent', handleCustomEvent);

    return () => {
      eventListener.remove();
    };
  }, []);

  const handleCustomEvent = data => {
    console.log('data', data);
    setReceivedData(data?.welcome);
  };

  const sendDataBack = () => {
    DeviceEventEmitter.emit('customName2', Math.random());
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffd0' }}>
      <Text>Receiver Component</Text>
      <Text>Received Data: {receivedData}</Text>
      <TouchableOpacity onPress={sendDataBack}>
        <Text>Send Data Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReceiverComponent;
