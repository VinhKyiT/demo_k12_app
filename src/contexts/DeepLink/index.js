import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

const DeepLinkContext = createContext();

const DeepLinkProvider = ({ children }) => {
  const [deeplinkHandling, setDeeplinkHandling] = useState('');
  const handleDeepLinkUrlReceived = useCallback(url => {
    if (url) {
      setDeeplinkHandling(url);
      console.log('url', url);
    }
  }, []);

  const handleLinkForeground = useCallback(
    async ({ url }) => {
      handleDeepLinkUrlReceived(url);
    },
    [handleDeepLinkUrlReceived],
  );
  useEffect(() => {
    const subscription = Linking.addEventListener('url', handleLinkForeground);
    return () => {
      subscription.remove();
    };
  }, [handleLinkForeground]);
  return (
    <DeepLinkContext.Provider value={{ deeplinkHandling }}>{children}</DeepLinkContext.Provider>
  );
};
export default DeepLinkProvider;
