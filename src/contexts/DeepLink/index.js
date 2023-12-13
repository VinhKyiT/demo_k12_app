import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { ROUTES } from '~constants/routes';
import NavigationServices from '~utils/NavigationServices';

export const DeepLinkContext = createContext();

const DeepLinkProvider = ({ children }) => {
  const [deeplingHandling, setDeeplingHandling] = useState('');

  const handleDeeplinkUrlReceived = useCallback(({ url }) => {
    setDeeplingHandling(url);
    const newUrl = url.split('://');
    const urlPath =
      newUrl?.[0] === 'https' ? newUrl[1].split('/')[1] + '/' + newUrl[1].split('/')[2] : newUrl[1];
    if (urlPath.includes('product')) {
      const productId = urlPath.split('/')?.[1];
      console.log('productId', productId);
      if (productId) {
        NavigationServices.navigate(ROUTES.PRODUCT_DETAIL_SCREEN, { productId });
      }
    }
  }, []);

  useEffect(() => {
    const listener = Linking.addEventListener('url', handleDeeplinkUrlReceived);
    return () => listener.remove();
  }, [handleDeeplinkUrlReceived]);

  return (
    <DeepLinkContext.Provider value={{ deeplingHandling, handleDeeplinkUrlReceived }}>
      {children}
    </DeepLinkContext.Provider>
  );
};
export default DeepLinkProvider;
