import { View, BackHandler, TouchableOpacity } from 'react-native';
import React, { useRef, useEffect } from 'react';
import WebView from 'react-native-webview';
import AppIcon from '~components/AppIcon';
import NavigationServices from '~utils/NavigationServices';

const WebViewScreen = () => {
  const webViewRef = useRef();
  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      if (webViewRef?.current) {
        webViewRef?.current?.goBack();
        return true;
      }
      return false;
    });
    return () => listener.remove();
  }, []);

  const onAppBack = () => {
    NavigationServices.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView ref={webViewRef} source={{ uri: 'https://reactnative.dev/' }} style={{ flex: 1 }} />
      <TouchableOpacity
        onPress={onAppBack}
        style={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          left: 12,
          top: 12,
        }}>
        <AppIcon type="feather" name="chevron-left" />
      </TouchableOpacity>
    </View>
  );
};

export default WebViewScreen;
