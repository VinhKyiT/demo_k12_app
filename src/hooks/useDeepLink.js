const { DeepLinkContext } = require('~contexts/DeepLink');
import { useContext } from 'react';

const useDeepLink = () => {
  return useContext(DeepLinkContext);
};

export default useDeepLink;
