import { useContext } from 'react';
import { CartContext } from './CartContextProvider';

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
