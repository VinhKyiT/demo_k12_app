import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppIcon from '../../components/AppIcon';
import { COLORS } from '../../constants/colors';
import AppText from '../../components/AppText';
import NetInfo from '@react-native-community/netinfo';

const ConnectionCheckerScreen = () => {
  const [isConnect, setIsConnect] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (state.isConnected !== isConnect) {
        setIsConnect(state.isConnected);
      }
    });
    return () => unsubscribe();
  }, [isConnect]);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <AppIcon
          type="feather"
          name={isConnect ? 'wifi' : 'wifi-off'}
          size={160}
          color={isConnect ? COLORS.GREEN : COLORS.ICON_LIGHT_GRAY}
        />
        <AppText weight="semibold" size={28} align="center" style={{ marginVertical: 8 }}>
          No internet Connection
        </AppText>
        <AppText size={17} align="center" color={COLORS.TEXT_GRAY}>
          Your internet connection is currently not available please check or try again.
        </AppText>
      </View>
    </View>
  );
};

export default ConnectionCheckerScreen;
