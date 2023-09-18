import { useContext } from 'react';
import { CartContext } from '~contexts/CartContext/CartContextProvider';

function useCart() {
  return useContext(CartContext);
}

export default useCart;
