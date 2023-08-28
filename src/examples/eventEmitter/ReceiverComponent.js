import React, { useEffect, useState } from 'react';
import { DeviceEventEmitter, Text, View } from 'react-native';

const ReceiverComponent = () => {
  const [receivedData, setReceivedData] = useState('');

  useEffect(() => {
    const eventListener = DeviceEventEmitter.addListener('customEvent', handleCustomEvent);

    return () => {
      eventListener.remove();
    };
  }, []);

  const handleCustomEvent = data => {
    setReceivedData(data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffd0' }}>
      <Text>Receiver Component</Text>
      <Text>Received Data: {receivedData}</Text>
    </View>
  );
};

export default ReceiverComponent;
