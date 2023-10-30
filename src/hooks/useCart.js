import { CartContext } from '~contexts/CartContext/CartContextProvider';
import { useContext } from 'react';

const useCart = () => {
  return useContext(CartContext);
};

export { useCart };
