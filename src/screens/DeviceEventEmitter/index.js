import React from 'react';
import { SafeAreaView } from 'react-native';
import ReceiverComponent from './ReceiverComponent';
import SenderComponent from './SenderComponent';

const DeviceEventEmitterDemo = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SenderComponent />
      <ReceiverComponent />
    </SafeAreaView>
  );
};

export default DeviceEventEmitterDemo;
